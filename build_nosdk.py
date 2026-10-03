#!/usr/bin/env python3
"""Build My little Lisa Pet shop WITHOUT the Android SDK (for sandboxes where dl.google.com is blocked).

Usage:  python3 build_nosdk.py 9.68 92
Needs:  python3 + `cryptography` (pip install --break-system-packages cryptography), node (for node --check).

How it works: resources (res/, resources.arsc), classes.dex and the binary AndroidManifest.xml never change
between releases -- only assets/ does. So we take the previous APKs in apk/ (regular + _TEST) as the base,
  1. drop the old signature (META-INF/*) and the old assets/, add the current assets/ (TEST: patched game.js),
  2. patch versionCode / versionName inside the binary AndroidManifest.xml,
  3. zipalign (STORED entries on 4-byte boundaries, .so on 4096),
  4. sign with APK Signature Scheme v2 using key.pem / cert.pem (minSdk is 24, so v2 alone is valid;
     the same certificate as before, so it installs as an UPDATE and keeps the save data).
Only use this when build_linux.sh (real aapt2/apksigner) can't run. If res/ or AndroidManifest.xml
(other than the version) ever change, this script is NOT enough -- use build_linux.sh / build_windows.ps1.
"""
import hashlib, io, os, re, struct, subprocess, sys, zipfile, glob

from cryptography import x509
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding

HERE = os.path.dirname(os.path.abspath(__file__))
os.chdir(HERE)


# ---------------------------------------------------------------- binary manifest (AXML) patch
def patch_axml(data, vc, vn):
    data = bytearray(data)
    # string pool chunk right after the 8-byte file header
    sp = 8
    typ, hsz, csz = struct.unpack_from('<HHI', data, sp)
    assert typ == 0x0001, 'no string pool'
    count, style_count, flags, str_start, style_start = struct.unpack_from('<IIIII', data, sp + 8)
    utf8 = bool(flags & 0x100)
    offs = struct.unpack_from('<%dI' % count, data, sp + hsz)

    def str_at(i):
        o = sp + str_start + offs[i]
        if utf8:
            n = data[o]; o += 1
            if n & 0x80: o += 1
            ln = data[o]; o += 1
            if ln & 0x80: ln = ((ln & 0x7f) << 8) | data[o]; o += 1
            return o, ln, bytes(data[o:o + ln]).decode('utf-8')
        ln = struct.unpack_from('<H', data, o)[0]; o += 2
        if ln & 0x8000: ln = ((ln & 0x7fff) << 16) | struct.unpack_from('<H', data, o)[0]; o += 2
        return o, ln, bytes(data[o:o + ln * 2]).decode('utf-16le')

    names = {str_at(i)[2]: i for i in range(count)}
    i_vc, i_vn = names['versionCode'], names['versionName']
    # walk chunks, find <manifest> start element
    p = sp + csz
    done = set()
    while p < len(data):
        typ, hsz, csz = struct.unpack_from('<HHI', data, p)
        if typ == 0x0102:  # START_ELEMENT
            ext = p + hsz
            attr_start, attr_size, attr_count = struct.unpack_from('<HHH', data, ext + 8)
            for k in range(attr_count):
                a = ext + attr_start + k * attr_size
                ns, name, raw = struct.unpack_from('<iii', data, a)
                vsize, _, dtype, val = struct.unpack_from('<HBBI', data, a + 12)
                if name == i_vc:
                    struct.pack_into('<I', data, a + 16, vc); done.add('vc')
                elif name == i_vn:
                    o, ln, old = str_at(raw)
                    if len(vn) != len(old):
                        raise SystemExit('versionName length changed (%r -> %r): use build_linux.sh' % (old, vn))
                    enc = vn.encode('utf-8') if utf8 else vn.encode('utf-16le')
                    data[o:o + len(enc)] = enc; done.add('vn')
            if done >= {'vc', 'vn'}: break
        p += csz
    assert done >= {'vc', 'vn'}, 'version attributes not found'
    return bytes(data)


# ---------------------------------------------------------------- aligned zip writer
def write_aligned_zip(entries, out_path):
    """entries: list of (name, bytes, compress_type)."""
    buf = io.BytesIO()
    zf = zipfile.ZipFile(buf, 'w')
    for name, content, ctype in entries:
        zi = zipfile.ZipInfo(name, date_time=(2008, 1, 1, 0, 0, 0))
        zi.compress_type = ctype
        zi.create_system = 0
        if ctype == zipfile.ZIP_STORED:
            align = 4096 if name.endswith('.so') else 4
            hdr_end = buf.tell() + 30 + len(name.encode('utf-8'))
            pad = (-(hdr_end + 4)) % align  # 4 = our extra field header (id + size)
            zi.extra = struct.pack('<HH', 0xD935, pad) + b'\0' * pad
        zf.writestr(zi, content, compress_type=ctype, compresslevel=9 if ctype else None)
    zf.close()
    return buf.getvalue()


# ---------------------------------------------------------------- APK Signature Scheme v2
def lp(b): return struct.pack('<I', len(b)) + b


def find_eocd(apk):
    i = apk.rfind(b'PK\x05\x06')
    assert i >= 0
    cd_size, cd_off = struct.unpack_from('<II', apk, i + 12)
    return i, cd_off, cd_size


def v2_digest(apk, cd_off, eocd_off):
    s1 = apk[:cd_off]; s3 = apk[cd_off:eocd_off]; s4 = bytearray(apk[eocd_off:])
    struct.pack_into('<I', s4, 16, cd_off)  # CD offset field -> start of signing block (= cd_off pre-insert)
    chunks = []
    for sec in (s1, s3, bytes(s4)):
        for o in range(0, len(sec), 1 << 20):
            c = sec[o:o + (1 << 20)]
            chunks.append(hashlib.sha256(b'\xa5' + struct.pack('<I', len(c)) + c).digest())
    return hashlib.sha256(b'\x5a' + struct.pack('<I', len(chunks)) + b''.join(chunks)).digest()


def sign_v2(apk, key, cert_der):
    eocd_off, cd_off, _ = find_eocd(apk)
    ALG = 0x0103  # RSASSA-PKCS1-v1_5 with SHA2-256
    dig = v2_digest(apk, cd_off, eocd_off)
    signed_data = lp(lp(struct.pack('<I', ALG) + lp(dig))) + lp(lp(cert_der)) + lp(b'')
    sig = key.sign(signed_data, padding.PKCS1v15(), hashes.SHA256())
    pub = key.public_key().public_bytes(serialization.Encoding.DER, serialization.PublicFormat.SubjectPublicKeyInfo)
    signer = lp(signed_data) + lp(lp(struct.pack('<I', ALG) + lp(sig))) + lp(pub)
    v2 = lp(lp(signer))
    pair = struct.pack('<QI', len(v2) + 4, 0x7109871a) + v2
    size = len(pair) + 8 + 16
    block = struct.pack('<Q', size) + pair + struct.pack('<Q', size) + b'APK Sig Block 42'
    eocd = bytearray(apk[eocd_off:])
    struct.pack_into('<I', eocd, 16, cd_off + len(block))
    return apk[:cd_off] + block + apk[cd_off:eocd_off] + bytes(eocd)


# ---------------------------------------------------------------- build
def build(variant, vn, vc, key, cert_der):
    suf = '_TEST' if variant == 'test' else ''
    bases = sorted(glob.glob('apk/MyLittleLisaPetShop_v*%s.apk' % suf), key=os.path.getmtime)
    bases = [b for b in bases if (b.endswith('_TEST.apk')) == (variant == 'test') and ('_v%s%s.apk' % (vn, suf)) not in b]
    assert bases, 'no base APK in apk/'
    base = bases[-1]
    print('[%s] base: %s' % (variant, base))
    src = zipfile.ZipFile(base)
    entries = []
    for zi in src.infolist():
        n = zi.filename
        if n.startswith('META-INF/') or n.startswith('assets/'): continue
        d = src.read(zi)
        if n == 'AndroidManifest.xml': d = patch_axml(d, vc, vn)
        entries.append((n, d, zi.compress_type))
    # current assets (sorted, forward slashes)
    for root, _, files in os.walk('assets'):
        for f in sorted(files):
            p = os.path.join(root, f); n = p.replace(os.sep, '/')
            d = open(p, 'rb').read()
            if variant == 'test' and n == 'assets/game.js':
                s = d.decode('utf-8')
                s2 = s.replace('coins: 400, xp: 0, level: 1,', 'coins: 999999, xp: 0, level: 30,').replace('rep: 20, letters', 'rep: 240, letters')
                assert s2 != s, 'TEST patch did not apply to game.js'
                d = s2.encode('utf-8')
            if n == 'assets/data.js':  # the JS side knows its own version (one-time update care etc.)
                d = re.sub(r"const APP_VER = '[^']*'", "const APP_VER = '%s'" % vn, d.decode('utf-8')).encode('utf-8')
            if n.endswith('.js'):
                tmp = '/tmp/_chk_%s.js' % os.getpid(); open(tmp, 'wb').write(d)
                subprocess.run(['node', '--check', tmp], check=True)
            ctype = zipfile.ZIP_STORED if re.search(r'\.(jpg|png|webp)$', n) else zipfile.ZIP_DEFLATED
            entries.append((n, d, ctype))
    # manifest first, like aapt2
    entries.sort(key=lambda e: 0 if e[0] == 'AndroidManifest.xml' else 1)
    apk = write_aligned_zip(entries, None)
    apk = sign_v2(apk, key, cert_der)
    out = 'apk/MyLittleLisaPetShop_v%s%s.apk' % (vn, suf)
    open(out, 'wb').write(apk)
    print('[%s] wrote %s (%d bytes)' % (variant, out, len(apk)))
    return out


def main():
    vn, vc = sys.argv[1], int(sys.argv[2])
    key = serialization.load_pem_private_key(open('key.pem', 'rb').read(), None)
    cert = x509.load_pem_x509_certificate(open('cert.pem', 'rb').read())
    fp = cert.fingerprint(hashes.SHA256()).hex()
    assert fp.startswith('6dc029d1'), 'WRONG CERT %s -- never sign with another key' % fp
    cert_der = cert.public_bytes(serialization.Encoding.DER)
    for v in ('v', 'test'): build(v, vn, vc, key, cert_der)
    # keep the in-repo manifest text in sync
    m = open('AndroidManifest.xml', encoding='utf-8').read()
    m = re.sub(r'versionCode="\d+"', 'versionCode="%d"' % vc, m); m = re.sub(r'versionName="[^"]*"', 'versionName="%s"' % vn, m)
    open('AndroidManifest.xml', 'w', encoding='utf-8').write(m)
    dj = open('assets/data.js', encoding='utf-8').read(); open('assets/data.js', 'w', encoding='utf-8').write(re.sub(r"const APP_VER = '[^']*'", "const APP_VER = '%s'" % vn, dj))


if __name__ == '__main__':
    main()
