#!/usr/bin/env python3
"""Build My little Lisa PET TOWN (package com.seungjin.pettown) with apktool (no Android SDK needed, only java + python3 + node).

Usage:  python3 build_town.py 1.0 1
- apktool_src/ = decoded app (manifest, res with the house icon, smali with ports 47810/47811 + 'PETTOWN?' discovery)
- assets/      = the game; copied in fresh every build
Makes apk/MyLittleLisaPetTown_v<ver>.apk and _TEST.apk (package com.seungjin.pettown.test, 999999 coins, Lv30).
Signed (v2) with key.pem / cert.pem -- never make a new key, or updates stop installing over the old app.
"""
import os, re, shutil, subprocess, sys, zipfile, tempfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_nosdk import write_aligned_zip, sign_v2
from cryptography import x509
from cryptography.hazmat.primitives import hashes, serialization
HERE = os.path.dirname(os.path.abspath(__file__)); os.chdir(HERE)

def build(variant, vn, vc, key, cert_der):
    test = variant == 'test'
    tmp = tempfile.mkdtemp(prefix='town_')
    src = os.path.join(tmp, 'src'); shutil.copytree('apktool_src', src)
    shutil.copytree('assets', os.path.join(src, 'assets'))
    m = open(os.path.join(src, 'AndroidManifest.xml'), encoding='utf-8').read()
    if test:
        m = m.replace('package="com.seungjin.pettown"', 'package="com.seungjin.pettown.test"')
        for f in ('values', 'values-ko', 'values-ru'):
            p = os.path.join(src, 'res', f, 'strings.xml'); s = open(p, encoding='utf-8').read()
            open(p, 'w', encoding='utf-8').write(s.replace('PET TOWN<', 'PET TOWN TEST<'))
    open(os.path.join(src, 'AndroidManifest.xml'), 'w', encoding='utf-8').write(m)
    y = open(os.path.join(src, 'apktool.yml'), encoding='utf-8').read()
    y = re.sub(r'versionCode: .*', "versionCode: %d" % vc, y); y = re.sub(r'versionName: .*', "versionName: %s" % vn, y)
    y = re.sub(r'apkFileName: .*', 'apkFileName: town.apk', y)
    open(os.path.join(src, 'apktool.yml'), 'w', encoding='utf-8').write(y)
    for root, _, files in os.walk(os.path.join(src, 'assets')):
        for f in files:
            p = os.path.join(root, f)
            if f == 'game.js' and test:  # TEST: max level 30, max reputation (👑 500), 99,999,999 coins
                s = open(p, encoding='utf-8').read()
                s2 = s.replace('coins: 1000, xp: 0, level: 1,', 'coins: 99999999, xp: 0, level: 100,').replace('rep: 20, letters', 'rep: 500, repBest: 5, letters')
                assert s2.count('coins: 99999999') == 1 and 'rep: 500' in s2, 'TEST patch did not apply'; open(p, 'w', encoding='utf-8').write(s2)
            if f == 'town.js' and test:  # TEST: every town unlock open (best population 999)
                s = open(p, encoding='utf-8').read()
                s2 = s.replace("      s.town.best = Math.max(s.town.best || 0, pop(s));\n    }", "      s.town.best = 999;\n    }", 1)
                assert s2 != s, 'TEST town patch did not apply'; open(p, 'w', encoding='utf-8').write(s2)
            if f == 'data.js':
                s = open(p, encoding='utf-8').read(); open(p, 'w', encoding='utf-8').write(re.sub(r"const APP_VER = '[^']*'", "const APP_VER = '%s'" % vn, s))
            if f.endswith('.js'): subprocess.run(['node', '--check', p], check=True)
    un = os.path.join(tmp, 'u.apk')
    subprocess.run(['java', '-jar', 'apktool.jar', 'b', src, '-o', un], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    z = zipfile.ZipFile(un); entries = []
    for zi in z.infolist():
        n = zi.filename.replace('\\', '/')
        if n.startswith('META-INF/'): continue
        ct = zipfile.ZIP_STORED if (n == 'resources.arsc' or re.search(r'\.(png|jpg|webp)$', n)) else zipfile.ZIP_DEFLATED
        entries.append((n, z.read(zi), ct))
    entries.sort(key=lambda e: 0 if e[0] == 'AndroidManifest.xml' else 1)
    apk = sign_v2(write_aligned_zip(entries, None), key, cert_der)
    out = 'apk/MyLittleLisaPetTown_v%s%s.apk' % (vn, '_TEST' if test else '')
    os.makedirs('apk', exist_ok=True); open(out, 'wb').write(apk); shutil.rmtree(tmp)
    print('wrote', out, len(apk)); return out

def main():
    vn, vc = sys.argv[1], int(sys.argv[2])
    key = serialization.load_pem_private_key(open('key.pem', 'rb').read(), None)
    cert = x509.load_pem_x509_certificate(open('cert.pem', 'rb').read())
    assert cert.fingerprint(hashes.SHA256()).hex().startswith('6dc029d1'), 'WRONG CERT'
    cd = cert.public_bytes(serialization.Encoding.DER)
    for v in ('v', 'test'): build(v, vn, vc, key, cd)
    dj = open('assets/data.js', encoding='utf-8').read(); open('assets/data.js', 'w', encoding='utf-8').write(re.sub(r"const APP_VER = '[^']*'", "const APP_VER = '%s'" % vn, dj))

if __name__ == '__main__': main()
