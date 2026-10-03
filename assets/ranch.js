// ================= v1.27: the ranch (목장) — cows & pigs =================
// A big lot the player places (S.lay.ranch). Starts with a calf pair and a piglet pair (♂♀). Cows eat hay (seed store),
// pigs eat crops from the farm storage. Fed adults give milk / meat every morning; fed adult pairs have babies while there is room
// (room grows with the ranch level). Milk & meat go into the same storage as the farm crate / café fridge (s.farm.produce).
// Ranch hands (hired in the ranch panel) feed, fetch hay, take crops for the pigs and collect the produce.
const RANCH_LOT = { w: 12, d: 10 };
const RANCH_COST = 25000, RANCH_LV_REQ = 8;
const RANCH_LV = [null, { cap: 3, cost: 0 }, { cap: 5, cost: 18000 }, { cap: 8, cost: 42000 }, { cap: 12, cost: 90000 }]; // cap = animals of EACH kind
const RANCH_GROW = 3, RANCH_BREED = .5; // days until adult, chance per day that a fed adult pair has a baby
const RANCH_GOODS = { milk: { icon: '🥛', sell: 30 }, meat: { icon: '🥩', sell: 55 } };
const RANCH_HAND = { hire: 2500, wage: 150 };
Object.assign(TOWN_DEF, { ranch: { cat: 'big', w: RANCH_LOT.w, d: RANCH_LOT.d, cost: RANCH_COST, act: 'buildranch', ic: '🐄' } });
TOWN_BIG.push('ranch');
FARM_GOODS.push({ id: 'hay', cost: 14, sellPrice: 0, icon: '🌿', ulv: 1, feed: 1 });

const RANCH = (() => {
  const L = () => (typeof LAY === 'function' ? LAY('ranch') : null);
  const day = s => (s.clock ? s.clock.day : 1);
  const adult = (s, a) => day(s) - a.born >= RANCH_GROW;
  const built = s => !!(s.ranch && s.lay && s.lay.ranch);
  const prod = s => FARM.ensure(s).produce;
  const hayFee = () => Math.round(14 * 1.15);
  const NAMES = { ko: { cow: ['음메', '얼룩이', '우유', '초코', '밀키', '누렁이', '방울', '크림'], pig: ['꿀꿀이', '분홍이', '토실이', '동글이', '복돌이', '핑키', '뚱이', '보리'] }, ru: { cow: ['Бурёнка', 'Милка', 'Зорька', 'Ромашка'], pig: ['Хрюша', 'Пятачок', 'Розочка', 'Пончик'] } };
  const nameOf = (s, k) => { const L0 = NAMES[s.lang] || NAMES.ko, list = L0[k]; return list[Math.floor(Math.random() * list.length)]; };
  function mk(s, k, sex) { const r = s.ranch; return { id: 'r' + (r.seq++), k, sex, born: day(s), fed: -1, name: nameOf(s, k) }; }
  function ensure(s) {
    const r = s.ranch; if (!r) return null;
    if (!r.cows) r.cows = []; if (!r.pigs) r.pigs = []; if (!r.staff) r.staff = []; if (r.milk == null) r.milk = 0; if (r.meat == null) r.meat = 0; if (!r.seq) r.seq = 1; if (!r.lv) r.lv = 1;
    if (r.lastDay == null) r.lastDay = day(s);
    if (r.hay == null) r.hay = 6; if (!r.pf) r.pf = {}; if (!r.drops) r.drops = []; // v1.28: hay feed box, pig feed box, milk / meat lying in the pens
    if (r.milk || r.meat) { for (let i = 0; i < r.milk; i++) r.drops.push({ id: r.seq++, k: 'milk' }); for (let i = 0; i < r.meat; i++) r.drops.push({ id: r.seq++, k: 'meat' }); r.milk = r.meat = 0; }
    return r;
  }
  // v1.28: the animals eat by themselves from their feed boxes: cows from the hay box, pigs from the pig-feed box
  const pfTotal = r => Object.values(r.pf || {}).reduce((a, n) => a + (n > 0 ? n : 0), 0);
  function pigFood(s) { const p = prod(s); const c = CROPS.filter(x => (p[x.id] || 0) > 0).sort((a, b) => a.sellPrice - b.sellPrice)[0]; return c ? c.id : null; }
  // lim: how many animals of each kind eat this call (the timer feeds them one by one so you can watch them walk to the trough)
  function eat(s, lim) {
    const r = ensure(s), d = day(s); let n = 0, nc = 0, np = 0; lim = lim || 99;
    for (const a of r.cows) { if (nc >= lim) break; if (a.fed === d || !(r.hay > 0)) continue; r.hay--; a.fed = d; n++; nc++; }
    for (const a of r.pigs) { if (np >= lim) break; if (a.fed === d) continue; np++; const k = Object.keys(r.pf).find(q => r.pf[q] > 0); if (!k) break; r.pf[k]--; if (!r.pf[k]) delete r.pf[k]; a.fed = d; n++; }
    return n;
  }
  // why no babies yet? → one short reason per kind for the ranch panel
  function breedInfo(s, k) {
    const r = ensure(s), d = day(s), list = k === 'cow' ? r.cows : r.pigs, cap = RANCH_LV[r.lv].cap;
    if (list.length >= cap) return { st: 'full' };
    const ad = list.filter(a => d - a.born >= RANCH_GROW), hasM = ad.some(a => a.sex === 'm'), hasF = ad.some(a => a.sex === 'f');
    if (!hasM || !hasF) { const kids = list.filter(a => d - a.born < RANCH_GROW); if (!kids.length) return { st: 'pair' }; return { st: 'grow', n: Math.min(...kids.map(a => RANCH_GROW - (d - a.born))) }; }
    const fedM = ad.some(a => a.sex === 'm' && a.fed === d), fedF = ad.some(a => a.sex === 'f' && a.fed === d);
    if (!fedM || !fedF) return { st: 'hungry' };
    return { st: 'ok' };
  }
  function pickAll(s) { const r = ensure(s), p = prod(s), n = r.drops.length; for (const q of r.drops) p[q.k] = (p[q.k] || 0) + 1; r.drops = []; return n; }
  function pickOne(s, id) { const r = ensure(s), q = r.drops.find(x => x.id === id); if (!q) return null; const p = prod(s); p[q.k] = (p[q.k] || 0) + 1; r.drops = r.drops.filter(x => x !== q); return q.k; }
  function stockPigBox(s, n) { const r = ensure(s), p = prod(s); let m = 0; while (m < n) { const c = pigFood(s); if (!c) break; p[c]--; r.pf[c] = (r.pf[c] || 0) + 1; m++; } return m; }
  // every new morning: produce + babies (from animals fed the day before), wages
  function morning(s) {
    const r = ensure(s), d = day(s); if (d === r.lastDay) return; const prev = r.lastDay; r.lastDay = d;
    for (const a of r.cows) if (a.fed === prev && prev - a.born >= RANCH_GROW) { const n = 1 + (Math.random() < .4 ? 1 : 0); for (let i = 0; i < n && r.drops.length < 40; i++) r.drops.push({ id: r.seq++, k: 'milk', u: Math.random(), v: Math.random() }); }
    for (const a of r.pigs) if (a.fed === prev && prev - a.born >= RANCH_GROW && Math.random() < .55 && r.drops.length < 40) r.drops.push({ id: r.seq++, k: 'meat', u: Math.random(), v: Math.random() });
    const cap = RANCH_LV[r.lv].cap;
    for (const [k, list] of [['cow', r.cows], ['pig', r.pigs]]) {
      if (list.length >= cap) continue;
      const m = list.some(a => a.sex === 'm' && a.fed === prev && prev - a.born >= RANCH_GROW), f = list.filter(a => a.sex === 'f' && a.fed === prev && prev - a.born >= RANCH_GROW).length;
      // v1.30: a fed adult pair that missed twice in a row is guaranteed a baby the next morning
      if (!r.miss) r.miss = {}; const sure = m && f && (r.miss[k] | 0) >= 2; let born = 0;
      for (let i = 0; i < f && list.length < cap; i++) if (m && (sure || Math.random() < RANCH_BREED)) { born++; const b = mk(s, k, Math.random() < .5 ? 'm' : 'f'); b.born = d; list.push(b); r.births = (r.births | 0) + 1; if (typeof G !== 'undefined' && G.evPublic) G.evPublic(s, { k: 'ranchbaby', rk: k, name: b.name }); }
      if (m && f) r.miss[k] = born ? 0 : (r.miss[k] | 0) + 1;
    }
    const wage = r.staff.length * RANCH_HAND.wage; if (wage) s.coins = Math.max(0, s.coins - wage);
  }
  // ranch hands: every few seconds each hand does the most useful thing (feed hungry animals, then collect produce)
  function tick(s, dt) {
    if (!built(s)) return; const r = ensure(s); morning(s);
    r.eatT = (r.eatT || 0) - dt; if (r.eatT <= 0) { r.eatT = 3; eat(s, 1); }
    const open = s.clock && s.clock.ph !== 'closed', d = day(s);
    r.staff.forEach((m, i) => {
      m.t = (m.t || 0) - dt; if (m.t > 0 || !open) return; m.t = Math.max(3, 9 - m.lv * 1.2); m.why = null;
      const hayNeed = r.cows.length * 2, pigNeed = r.pigs.length * 2;
      let why = null;
      if (r.hay < hayNeed) { if (s.coins >= hayFee() * 10) { s.coins -= hayFee() * 10; r.hay += 10; m.act = 'hay'; m.done = (m.done | 0) + 1; return; } why = 'hay'; }
      if (pfTotal(r) < pigNeed) { const n = stockPigBox(s, pigNeed - pfTotal(r) + 2); if (n) { m.act = 'pig'; m.done = (m.done | 0) + 1; return; } why = why || 'crop'; }
      if (r.drops.length) { const q = r.drops[0]; pickOne(s, q.id); m.act = 'collect'; m.tk = q.k; m.done = (m.done | 0) + 1; return; }
      m.act = 'idle'; m.why = why;
    });
  }
  function apply(s, a, by) {
    if (a.t === 'buildranch') {
      if (s.ranch) return { err: 'gone' }; if ((s.level || 1) < RANCH_LV_REQ) return { err: 'ranchNeedLv', p: { n: RANCH_LV_REQ } };
      if (s.coins < RANCH_COST) return { err: 'notEnough' }; s.coins -= RANCH_COST;
      s.ranch = { lv: 1, cows: [], pigs: [], milk: 0, meat: 0, seq: 1, staff: [], lastDay: day(s) };
      const r = s.ranch; r.cows.push(mk(s, 'cow', 'm'), mk(s, 'cow', 'f')); r.pigs.push(mk(s, 'pig', 'm'), mk(s, 'pig', 'f'));
      return { ok: 1, fx: 'coin', msg: 'ranchBuilt' };
    }
    if (!['rfeed', 'rcollect', 'rsell', 'rup', 'rhire', 'rfire', 'rstaffup', 'rbuyhay', 'rpf', 'rpick'].includes(a.t)) return undefined;
    if (!built(s)) return { err: 'gone' }; const r = ensure(s);
    switch (a.t) {
      case 'rbuyhay': { const c = hayFee() * 10; if (s.coins < c) return { err: 'notEnough' }; s.coins -= c; r.hay += 10; return { ok: 1, fx: 'coin', msg: 'ranchHayBought' }; }
      case 'rpf': { const p = prod(s), k = a.id; if (!CROPS.find(x => x.id === k) || !((p[k] || 0) > 0)) return { err: 'gone' }; const n = Math.min(p[k], Math.max(1, a.n | 0)); p[k] -= n; r.pf[k] = (r.pf[k] || 0) + n; return { ok: 1 }; }
      case 'rpick': { const k = pickOne(s, a.id); if (!k) return { err: 'gone' }; if (typeof G !== 'undefined' && G.addXpPublic) G.addXpPublic(s, 1); return { ok: 1, fx: 'coin', msg: 'ranchPicked', p: { i: RANCH_GOODS[k].icon } }; }
      case 'rfeed': { const n = eat(s); if (!n) return { err: 'ranchFed' }; return { ok: 1, fx: 'love', msg: 'ranchAte', p: { n } }; }
      case 'rcollect': { const n = pickAll(s); if (!n) return { err: 'ranchNothing' }; if (typeof G !== 'undefined' && G.addXpPublic) G.addXpPublic(s, n); return { ok: 1, fx: 'coin', msg: 'ranchCollected', p: { n } }; }
      case 'rsell': { const g = RANCH_GOODS[a.id]; if (!g) return { err: 'gone' }; const p = prod(s), n = Math.min(Math.max(1, a.n | 0), p[a.id] || 0); if (!n) return { err: 'gone' }; p[a.id] -= n; s.coins += g.sell * n; return { ok: 1, fx: 'coin' }; }
      case 'rup': { const nx = RANCH_LV[r.lv + 1]; if (!nx) return { err: 'gone' }; if (s.coins < nx.cost) return { err: 'notEnough' }; s.coins -= nx.cost; r.lv++; return { ok: 1, fx: 'coin', msg: 'ranchUp', p: { n: r.lv } }; }
      case 'rhire': { if (r.staff.length >= 3) return { err: 'gone' }; const c = RANCH_HAND.hire * (1 + r.staff.length); if (s.coins < c) return { err: 'notEnough' }; s.coins -= c; r.staff.push({ lv: 1, seed: 1 + Math.floor(Math.random() * 99999), done: 0, t: 1 }); return { ok: 1, fx: 'coin', msg: 'ranchHired' }; }
      case 'rstaffup': { const m = r.staff[a.i | 0]; if (!m || m.lv >= 5) return { err: 'gone' }; const c = RANCH_HAND.hire * m.lv; if (s.coins < c) return { err: 'notEnough' }; s.coins -= c; m.lv++; return { ok: 1, fx: 'coin' }; }
      case 'rfire': { r.staff.splice(a.i | 0, 1); return { ok: 1 }; }
    }
    return undefined;
  }

  // ---------------- drawing ----------------
  const P = (x, y, z) => [ISO.wx(x, y), ISO.wy(x, y) - (z || 0)];
  const poly = (c, pts, col, st, lw) => { c.beginPath(); pts.forEach((q, i) => i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])); c.closePath(); if (col) { c.fillStyle = col; c.fill(); } if (st) { c.lineWidth = lw || 1; c.strokeStyle = st; c.stroke(); } };
  const box = (c, x0, y0, w, d, z0, h, col, top) => { const x1 = x0 + w, y1 = y0 + d;
    poly(c, [P(x0, y1, z0 + h), P(x1, y1, z0 + h), P(x1, y1, z0), P(x0, y1, z0)], col, ART.OUT, 1);
    poly(c, [P(x1, y0, z0 + h), P(x1, y1, z0 + h), P(x1, y1, z0), P(x1, y0, z0)], ART.shade(col, -.13), ART.OUT, 1);
    poly(c, [P(x0, y0, z0 + h), P(x1, y0, z0 + h), P(x1, y1, z0 + h), P(x0, y1, z0 + h)], top || ART.shade(col, .06), ART.OUT, 1); };
  // pens inside the lot: cows on the west half, pigs on the east half; barn in the north-west corner, box + hay by the gate
  const PEN = L0 => ({ cow: { x: L0.x + .8, y: L0.y + 1.4, w: 5.2, d: 7.6 }, pig: { x: L0.x + 7, y: L0.y + 3, w: 4, d: 6 }, box: { x: L0.x + 6, y: L0.y + 1.2 }, hay: { x: L0.x + 8.2, y: L0.y + .9 }, haybox: { x: L0.x + 2.8, y: L0.y + 4.8 }, pigbox: { x: L0.x + 8.4, y: L0.y + 5.6 } });
  const walk = new Map();
  function wander(a, pen, T, trough, hungry) {
    let st = walk.get(a.id); const now = T;
    if (!st) { st = { x: pen.x + .5 + Math.random() * (pen.w - 1), y: pen.y + .5 + Math.random() * (pen.d - 1), wait: Math.random() * 3, dir: 1, lt: now }; st.tx = st.x; st.ty = st.y; walk.set(a.id, st); }
    const dt = Math.min(.1, Math.max(0, now - st.lt)); st.lt = now; let moving = false;
    // a spot around the open trough (each animal gets its own side)
    const spot = () => { const k = (trough.i || 0) % 4, e = trough.big ? .55 : .3, o = [[-.4 - e, .45], [1.6 + e, .45], [.6, -.3 - e], [.6, 1.2 + e]][k]; return [trough.x + o[0], trough.y + o[1]]; };
    if (hungry && trough.food && !st.toT) { st.toT = 1; [st.tx, st.ty] = spot(); st.wait = 0; }
    if (st.hungry && !hungry && st.toT) st.munch = 3.5; // just got fed → keep munching a bit
    st.hungry = hungry;
    if (st.munch > 0) { st.munch -= dt; const dx = st.tx - st.x, dy = st.ty - st.y, dd = Math.hypot(dx, dy); if (dd > .05) { const sp = Math.min(dd, .5 * dt); st.x += dx / dd * sp; st.y += dy / dd * sp; moving = true; } else st.dir = (trough.x + .6) - st.x - ((trough.y + .45) - st.y) > 0 ? 1 : -1;
      if (st.munch <= 0) { st.toT = 0; st.wait = 1; st.tx = pen.x + .5 + Math.random() * (pen.w - 1); st.ty = pen.y + .5 + Math.random() * (pen.d - 1); }
      return { x: st.x, y: st.y, dir: st.dir, moving, eating: !moving }; }
    if (st.toT && !hungry) st.toT = 0;
    if (st.toT) { const dx = st.tx - st.x, dy = st.ty - st.y, dd = Math.hypot(dx, dy); if (dd > .05) { const sp = Math.min(dd, .45 * dt); st.x += dx / dd * sp; st.y += dy / dd * sp; moving = true; if (Math.abs(dx - dy) > .01) st.dir = dx - dy > 0 ? 1 : -1; } else st.dir = (trough.x + .6) - st.x - ((trough.y + .45) - st.y) > 0 ? 1 : -1;
      return { x: st.x, y: st.y, dir: st.dir, moving, waiting: !moving }; }
    if (st.wait > 0) st.wait -= dt; else { const dx = st.tx - st.x, dy = st.ty - st.y, dd = Math.hypot(dx, dy), sp = .35 * dt; if (dd <= sp) { st.x = st.tx; st.y = st.ty; st.wait = 2 + Math.random() * 5; st.tx = pen.x + .5 + Math.random() * (pen.w - 1); st.ty = pen.y + .5 + Math.random() * (pen.d - 1); } else { st.x += dx / dd * sp; st.y += dy / dd * sp; moving = true; if (Math.abs(dx - dy) > .01) st.dir = dx - dy > 0 ? 1 : -1; } }
    return { x: st.x, y: st.y, dir: st.dir, moving };
  }
  function drawCow(c, sc, dir, t, moving, hungry) {
    c.save(); c.scale(sc * dir, sc); const bob = moving ? Math.abs(Math.sin(t * 8)) * 1.5 : Math.sin(t * 2) * .5;
    // Ground shadow
    ART.ell(c, 1, 0, 18, 5.5, 'rgba(30,20,10,.22)');
    // Contoured legs with hooves
    for (const [x, ph] of [[-10, 0], [-4.5, 1], [4.5, 0], [10.5, 1]]) {
      const lg = moving ? Math.sin(t * 8 + ph * 3) * 1.8 : 0;
      c.beginPath(); c.moveTo(x - 2, -10); c.lineTo(x - 1.5, -2 + lg); c.lineTo(x + 1.5, -2 + lg); c.lineTo(x + 2, -10); c.closePath();
      c.fillStyle = '#fefdf9'; c.fill(); c.strokeStyle = ART.OUT; c.lineWidth = 1; c.stroke();
      // Hoof
      ART.rrect(c, x - 1.8, -2 + lg, 3.6, 2.5, 1); c.fillStyle = '#3c2e28'; c.fill();
    }
    // Udder
    ART.ell(c, 2, -7 - bob, 4.5, 2.8, '#fbb6ce', ART.OUT, .8);
    for (let u = 0; u < 3; u++) ART.ell(c, 0.5 + u * 1.5, -5 - bob, 0.9, 1.4, '#f472b6');
    // Body (smooth rounded Holstein body)
    const gBody = c.createRadialGradient(2, -16 - bob, 3, 1, -14 - bob, 16);
    gBody.addColorStop(0, '#ffffff'); gBody.addColorStop(0.75, '#fefdfa'); gBody.addColorStop(1, '#e5ded5');
    ART.ell(c, 1, -14 - bob, 15.5, 10, gBody, ART.OUT, 1.4);
    // Distinctive black cow patches
    ART.ell(c, -3.5, -17.5 - bob, 5.5, 4, '#262223');
    ART.ell(c, 7.5, -12 - bob, 4.5, 3.5, '#262223');
    ART.ell(c, 11, -17 - bob, 3.2, 2.5, '#262223');
    // Swishing tail with tuft
    const tailSwing = moving ? Math.sin(t * 8) * 3 : Math.sin(t * 3) * 1.2;
    c.beginPath(); c.moveTo(15.5, -14 - bob); c.quadraticCurveTo(21, -12 - bob, 19 + tailSwing, -3 - bob);
    c.lineWidth = 1.8; c.strokeStyle = ART.OUT; c.stroke();
    ART.ell(c, 19 + tailSwing, -3 - bob, 2.4, 3.2, '#262223', ART.OUT, .8);
    // Head
    const hx = -15, hy = -18 - bob;
    // Horns
    for (const s2 of [-1, 1]) {
      c.beginPath(); c.moveTo(hx + s2 * 2.5, hy - 6); c.quadraticCurveTo(hx + s2 * 5.5, hy - 11, hx + s2 * 7.5, hy - 9);
      c.lineWidth = 2.2; c.strokeStyle = '#e2c98d'; c.lineCap = 'round'; c.stroke();
    }
    // Head shape
    ART.ell(c, hx, hy, 8.8, 8.2, gBody, ART.OUT, 1.3);
    ART.ell(c, hx + 3.8, hy - 4.5, 3.6, 2.8, '#262223'); // head spot
    // Drooping soft ears
    for (const s2 of [-1, 1]) {
      ART.ell(c, hx + s2 * 8.2, hy - 2, 3.8, 2.2, '#fefdfa', ART.OUT, 1);
      ART.ell(c, hx + s2 * 8.2, hy - 1.8, 2.5, 1.3, '#fbb6ce');
    }
    // Wide soft pink muzzle with dark nostrils & smile
    ART.ell(c, hx - 3.2, hy + 3.6, 6, 4.2, '#fbb6ce', ART.OUT, 1);
    ART.ell(c, hx - 5.2, hy + 3.6, 1.1, 1.1, '#6b2d42');
    ART.ell(c, hx - 1.2, hy + 3.6, 1.1, 1.1, '#6b2d42');
    c.beginPath(); c.arc(hx - 3.2, hy + 5.2, 1.8, 0.2 * Math.PI, 0.8 * Math.PI); c.strokeStyle = '#6b2d42'; c.lineWidth = 0.8; c.stroke();
    // Shiny big chibi anime eyes
    for (const [ex, ey] of [[hx - 2.8, hy - 2.2], [hx + 2.8, hy - 2.2]]) {
      ART.ell(c, ex, ey, 2, 2.4, '#1e1410');
      ART.ell(c, ex - .5, ey - .7, .8, .8, '#ffffff'); // bright shine
      ART.ell(c, ex + .5, ey + .5, .4, .4, '#ffffff');
    }
    // Cheerful rosy blush
    ART.ell(c, hx - 5.5, hy + 1, 2, 1.2, 'rgba(255,100,120,.45)');
    ART.ell(c, hx + 4.5, hy + 1, 2, 1.2, 'rgba(255,100,120,.45)');
    c.restore();
    if (hungry) { c.font = '10px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#000'; c.fillText('🌿?', 0, -34 * sc - 6); c.textAlign = 'start'; }
  }
  function drawCalf(c, sc, dir, t, moving, hungry) {
    c.save(); c.scale(sc * dir, sc); const bob = moving ? Math.abs(Math.sin(t * 9)) * 1.5 : Math.sin(t * 2) * .5;
    ART.ell(c, 0, 0, 13, 4.5, 'rgba(30,20,10,.2)');
    for (const [x, ph] of [[-8, 0], [-3, 1], [3.5, 0], [8.5, 1]]) {
      const lg = moving ? Math.sin(t * 9 + ph * 3) * 1.5 : 0;
      c.beginPath(); c.moveTo(x - 1.5, -9); c.lineTo(x - 1.2, -2 + lg); c.lineTo(x + 1.2, -2 + lg); c.lineTo(x + 1.5, -9); c.closePath();
      c.fillStyle = '#fefdfa'; c.fill(); c.strokeStyle = ART.OUT; c.lineWidth = 1; c.stroke();
      ART.rrect(c, x - 1.4, -2 + lg, 2.8, 2, 0.8); c.fillStyle = '#3c2e28'; c.fill();
    }
    const gCalf = c.createRadialGradient(1, -12 - bob, 2, 1, -11 - bob, 12);
    gCalf.addColorStop(0, '#ffffff'); gCalf.addColorStop(0.8, '#fbf8f2'); gCalf.addColorStop(1, '#e4dbd0');
    ART.ell(c, 1, -11 - bob, 11.5, 8.2, gCalf, ART.OUT, 1.3);
    ART.ell(c, 3, -13 - bob, 4.2, 3.2, '#262223');
    ART.ell(c, 8, -10 - bob, 3, 2.4, '#262223');
    // Tail
    c.beginPath(); c.moveTo(11, -11 - bob); c.quadraticCurveTo(15, -13 - bob, 14, -5 - bob); c.lineWidth = 1.4; c.strokeStyle = ART.OUT; c.stroke();
    ART.ell(c, 14, -5 - bob, 1.8, 2.4, '#262223', ART.OUT, .7);
    // Big round cute head
    const hx = -11, hy = -14 - bob;
    ART.ell(c, hx, hy, 9.2, 8.8, gCalf, ART.OUT, 1.3);
    ART.ell(c, hx + 3.5, hy - 4.5, 3.5, 2.8, '#262223');
    // Floppy ears
    for (const s2 of [-1, 1]) {
      ART.ell(c, hx + s2 * 8.2, hy - 2, 3.6, 2.4, '#fbf8f2', ART.OUT, .9);
      ART.ell(c, hx + s2 * 8.2, hy - 1.8, 2.4, 1.3, '#fbb6ce');
    }
    // Muzzle & nostrils
    ART.ell(c, hx - 2.8, hy + 3.2, 5.4, 3.8, '#fbb6ce', ART.OUT, .9);
    ART.ell(c, hx - 4.4, hy + 3.2, 0.9, 0.9, '#6b2d42');
    ART.ell(c, hx - 1.2, hy + 3.2, 0.9, 0.9, '#6b2d42');
    // Big glistening baby eyes
    for (const [ex, ey] of [[hx - 2.8, hy - 2], [hx + 2.8, hy - 2]]) {
      ART.ell(c, ex, ey, 2, 2.4, '#1e1410');
      ART.ell(c, ex - .5, ey - .7, 0.9, 0.9, '#ffffff');
      ART.ell(c, ex + .5, ey + .5, 0.4, 0.4, '#ffffff');
    }
    ART.ell(c, hx - 5.2, hy + 1.2, 2.2, 1.3, 'rgba(255,100,120,.5)');
    ART.ell(c, hx + 4.5, hy + 1.2, 2.2, 1.3, 'rgba(255,100,120,.5)');
    c.restore();
    if (hungry) { c.font = '9px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#000'; c.fillText('🌿?', 0, -26 * sc - 6); c.textAlign = 'start'; }
  }
  function drawPig(c, sc, dir, t, moving, hungry) {
    c.save(); c.scale(sc * dir, sc); const bob = moving ? Math.abs(Math.sin(t * 10)) * 1.3 : Math.sin(t * 2) * .4;
    ART.ell(c, 0, 0, 14, 4.5, 'rgba(30,15,10,.2)');
    // Short plump piggy legs with little trotters
    for (const [x, ph] of [[-7.5, 0], [-3, 1], [4, 0], [8.5, 1]]) {
      const lg = moving ? Math.sin(t * 10 + ph * 3) * 1.5 : 0;
      ART.rrect(c, x - 1.8, -7 + lg, 3.6, 7, 1.2); c.fillStyle = '#f8a8b8'; c.fill(); c.strokeStyle = ART.OUT; c.lineWidth = 0.9; c.stroke();
      // Little dark pink trotter hooves
      c.fillStyle = '#d9687e'; c.fillRect(x - 1.8, -1 + lg, 3.6, 1.8);
      c.strokeStyle = '#fff'; c.lineWidth = 0.6; c.beginPath(); c.moveTo(x, -1 + lg); c.lineTo(x, 0.8 + lg); c.stroke();
    }
    // Plump rosy pig body with soft radial shading
    const gPig = c.createRadialGradient(1, -13 - bob, 2, 1, -11 - bob, 14);
    gPig.addColorStop(0, '#ffd6df'); gPig.addColorStop(0.7, '#fba4b7'); gPig.addColorStop(1, '#e88299');
    ART.ell(c, 1, -12 - bob, 14, 9.2, gPig, ART.OUT, 1.3);
    ART.ell(c, -2, -15 - bob, 6.5, 3.5, 'rgba(255,255,255,.4)'); // glossy highlight
    // Springy curly corkscrew tail
    const tw = moving ? Math.sin(t * 10) * 0.4 : 0;
    c.beginPath(); c.arc(15.5, -13 - bob + tw, 3.2, 0, Math.PI * 1.7); c.lineWidth = 1.6; c.strokeStyle = '#d9687e'; c.stroke();
    // Round cute piggy head
    const hx = -12, hy = -14 - bob;
    ART.ell(c, hx, hy, 8.2, 7.8, gPig, ART.OUT, 1.2);
    // Floppy bouncy triangular ears
    for (const s2 of [-1, 1]) {
      c.beginPath(); c.moveTo(hx + s2 * 2.5, hy - 5.5); c.lineTo(hx + s2 * 7.5, hy - 11); c.lineTo(hx + s2 * 7.5, hy - 3.5); c.closePath();
      c.fillStyle = '#f893a9'; c.fill(); c.strokeStyle = ART.OUT; c.lineWidth = 1; c.stroke();
      c.fillStyle = '#ffccd6'; c.beginPath(); c.moveTo(hx + s2 * 3.5, hy - 5); c.lineTo(hx + s2 * 6.5, hy - 9); c.lineTo(hx + s2 * 6.5, hy - 4); c.closePath(); c.fill();
    }
    // Button snout with cute dark nostrils
    ART.ell(c, hx - 4.5, hy + 2.5, 4.2, 3.2, '#f888a0', ART.OUT, 1);
    ART.ell(c, hx - 5.8, hy + 2.5, 1, 1.3, '#731e33');
    ART.ell(c, hx - 3.2, hy + 2.5, 1, 1.3, '#731e33');
    // Twinkling cute chibi eyes
    for (const [ex, ey] of [[hx - 2.5, hy - 2], [hx + 2.5, hy - 2]]) {
      ART.ell(c, ex, ey, 1.6, 2, '#2b151a');
      ART.ell(c, ex - .4, ey - .5, 0.7, 0.7, '#ffffff');
      ART.ell(c, ex + .3, ey + .3, 0.3, 0.3, '#ffffff');
    }
    // Rosy blushing cheeks
    ART.ell(c, hx - 6.5, hy + 0.5, 2, 1.3, 'rgba(255,80,110,.5)');
    ART.ell(c, hx + 4.5, hy + 0.5, 2, 1.3, 'rgba(255,80,110,.5)');
    c.restore();
    if (hungry) { c.font = '10px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#000'; c.fillText('🥕?', 0, -28 * sc - 6); c.textAlign = 'start'; }
  }
  // ground layer (under everything): pasture, mud, fences are drawn in collect() so they sort with people
  function ground(c, T) {
    if (!built(S)) return; const L0 = L(); if (!L0) return; const pn = PEN(L0);
    poly(c, [P(L0.x, L0.y), P(L0.x + RANCH_LOT.w, L0.y), P(L0.x + RANCH_LOT.w, L0.y + RANCH_LOT.d), P(L0.x, L0.y + RANCH_LOT.d)], '#a9d98a');
    const cw = pn.cow; poly(c, [P(cw.x, cw.y), P(cw.x + cw.w, cw.y), P(cw.x + cw.w, cw.y + cw.d), P(cw.x, cw.y + cw.d)], '#8fcb6a');
    const pg = pn.pig; poly(c, [P(pg.x, pg.y), P(pg.x + pg.w, pg.y), P(pg.x + pg.w, pg.y + pg.d), P(pg.x, pg.y + pg.d)], '#b89a72');
    { const m = P(pg.x + pg.w * .7, pg.y + pg.d * .22); ART.ell(c, m[0], m[1], 30, 12, '#8a6a48'); ART.ell(c, m[0] - 6, m[1] - 2, 12, 4, 'rgba(255,255,255,.18)'); }
    for (let i = 0; i < 16; i++) { const q = P(cw.x + .3 + ((i * 37) % 47) / 10, cw.y + .3 + ((i * 53) % 55) / 10); c.fillStyle = 'rgba(60,120,40,.35)'; c.fillRect(q[0], q[1] - 3, 1.5, 3); }
  }
  function fence(c, x0, y0, x1, y1) {
    const n = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0)));
    for (const z of [6, 12]) { const a = P(x0, y0, z), b = P(x1, y1, z); c.strokeStyle = '#c09060'; c.lineWidth = 2; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
    for (let i = 0; i <= n; i++) { const u = i / n, a = P(x0 + (x1 - x0) * u, y0 + (y1 - y0) * u), b = P(x0 + (x1 - x0) * u, y0 + (y1 - y0) * u, 15); c.strokeStyle = '#8a5a33'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
  }
  function collectDraw(c, T, hits) {
    if (!built(S)) return []; const L0 = L(); if (!L0) return []; const r = ensure(S), pn = PEN(L0), out = [], d = day(S);
    const x0 = L0.x + .2, y0 = L0.y + .2, x1 = L0.x + RANCH_LOT.w - .2, y1 = L0.y + RANCH_LOT.d - .2;
    out.push({ depth: x0 + y0, fn: () => { fence(c, x0, y0, x1, y0); fence(c, x0, y0, x0, y1); } });
    out.push({ depth: x1 + y1 - .5, fn: () => { fence(c, x1, y0, x1, y1); fence(c, x0, y1, L0.x + 5.4, y1); fence(c, L0.x + 6.8, y1, x1, y1); } });
    out.push({ depth: pn.pig.x + pn.pig.y + pn.pig.d, fn: () => fence(c, pn.pig.x - .5, pn.pig.y, pn.pig.x - .5, pn.pig.y + pn.pig.d) });
    // wooden signboard (replaces the old red barn)
    const sg = { x: L0.x + .5, y: L0.y + .5 }; out.push({ depth: sg.x + sg.y + .5, fn: () => {
      for (const dx of [-.25, .25]) { const a2 = P(sg.x + dx, sg.y, 0), b3 = P(sg.x + dx, sg.y, 22); c.strokeStyle = '#6a4424'; c.lineWidth = 3; c.beginPath(); c.moveTo(a2[0], a2[1]); c.lineTo(b3[0], b3[1]); c.stroke(); }
      const m = P(sg.x, sg.y, 26), lab = '🐄 ' + t('ranchName') + ' Lv' + r.lv; c.font = 'bold 10px sans-serif'; const tw = c.measureText(lab).width + 14;
      c.fillStyle = '#c8955a'; c.strokeStyle = '#6a4424'; c.lineWidth = 2; c.beginPath(); c.rect(m[0] - tw / 2, m[1] - 16, tw, 18); c.fill(); c.stroke();
      c.textAlign = 'center'; c.fillStyle = '#3a2410'; c.fillText(lab, m[0], m[1] - 3); c.textAlign = 'start';
      hits.push({ kind: 'ranch', x0: m[0] - tw / 2 - 4, x1: m[0] + tw / 2 + 4, y0: m[1] - 22, y1: m[1] + 24 }); } });
    // hay stack + storage box
    const hy = pn.hay; out.push({ depth: hy.x + hy.y + 1, fn: () => { const q = P(hy.x + .5, hy.y + .5); for (const [dx, dy, rr] of [[-8, 0, 9], [8, 0, 9], [0, -9, 9]]) ART.ell(c, q[0] + dx, q[1] + dy - 6, rr, rr * .75, '#e8c56a', 'rgba(140,100,40,.7)', 1); c.font = 'bold 8px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#5a3a2a'; const hn = (prod(S).hay || 0); c.fillText('🌿' + hn, q[0], q[1] - 24); c.textAlign = 'start'; } });
    // open-top feed troughs in the middle of each pen: rustic timber manger with X-legs, iron brackets and rich feed
    const trough = (b2, col, lab, kind, fill) => out.push({ depth: b2.x + b2.y + 1.1, fn: () => {
      const x0 = b2.x, y0 = b2.y, w = 1.35, dd = .95, h = 10, ins = .12;
      const shadowP = P(x0 + w / 2, y0 + dd / 2, 0);
      ART.ell(c, shadowP[0], shadowP[1] + 2, 26, 12, 'rgba(0,0,0,.22)');

      // Heavy timber X-braced cross legs at both ends
      for (const lx of [x0 + .12, x0 + w - .12]) {
        const legBot1 = P(lx, y0 + .05, 0), legTop1 = P(lx, y0 + dd - .05, 5);
        const legBot2 = P(lx, y0 + dd - .05, 0), legTop2 = P(lx, y0 + .05, 5);
        c.lineWidth = 2.4; c.strokeStyle = '#45260f';
        c.beginPath(); c.moveTo(legBot1[0], legBot1[1]); c.lineTo(legTop1[0], legTop1[1]); c.stroke();
        c.beginPath(); c.moveTo(legBot2[0], legBot2[1]); c.lineTo(legTop2[0], legTop2[1]); c.stroke();
        const legMid = P(lx, y0 + dd / 2, 2.5);
        ART.ell(c, legMid[0], legMid[1], 1.5, 1.5, '#78350f', '#1c1917', .8); // Iron pivot bolt
      }

      // Inside back faces
      poly(c, [P(x0, y0, 4), P(x0 + w, y0, 4), P(x0 + w, y0, 4 + h), P(x0, y0, 4 + h)], ART.shade(col, -.25), ART.OUT, 1.1);
      poly(c, [P(x0, y0, 4), P(x0, y0 + dd, 4), P(x0, y0 + dd, 4 + h), P(x0, y0, 4 + h)], ART.shade(col, -.32), ART.OUT, 1.1);
      poly(c, [P(x0, y0, 4), P(x0 + w, y0, 4), P(x0 + w, y0 + dd, 4), P(x0, y0 + dd, 4)], ART.shade(col, -.42));

      // Interior feed contents (hay or fresh vegetables)
      fill(x0 + ins, y0 + ins, w - ins * 2, dd - ins * 2, 4, h);

      // Front weathered timber walls with horizontal plank seams
      poly(c, [P(x0, y0 + dd, 4), P(x0 + w, y0 + dd, 4), P(x0 + w, y0 + dd, 4 + h), P(x0, y0 + dd, 4 + h)], col, ART.OUT, 1.2);
      poly(c, [P(x0 + w, y0, 4), P(x0 + w, y0 + dd, 4), P(x0 + w, y0 + dd, 4 + h), P(x0 + w, y0, 4 + h)], ART.shade(col, .12), ART.OUT, 1.2);

      // Plank grooves and top rim lip
      const pMidA = P(x0, y0 + dd, 4 + h * .5), pMidB = P(x0 + w, y0 + dd, 4 + h * .5);
      c.beginPath(); c.moveTo(pMidA[0], pMidA[1]); c.lineTo(pMidB[0], pMidB[1]); c.strokeStyle = 'rgba(40,20,10,.45)'; c.lineWidth = 1; c.stroke();
      const pTopA = P(x0, y0 + dd, 4 + h), pTopB = P(x0 + w, y0 + dd, 4 + h);
      c.beginPath(); c.moveTo(pTopA[0], pTopA[1]); c.lineTo(pTopB[0], pTopB[1]); c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 1.2; c.stroke();

      // Wrought iron corner angle brackets
      for (const cx of [x0, x0 + w]) {
        const bp0 = P(cx, y0 + dd, 4), bp1 = P(cx, y0 + dd, 4 + h);
        c.lineWidth = 2.2; c.strokeStyle = '#292524'; c.beginPath(); c.moveTo(bp0[0], bp0[1]); c.lineTo(bp1[0], bp1[1]); c.stroke();
        for (const bz of [4.5, 4 + h - .8]) {
          const rp = P(cx + (cx === x0 ? .08 : -.08), y0 + dd, bz);
          ART.ell(c, rp[0], rp[1], 1, 1, '#ca8a04'); // Brass rivet
        }
      }

      const q = P(x0 + w / 2, y0 + dd / 2, 4 + h);
      c.font = 'bold 8.5px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#fff'; c.lineWidth = 3; c.strokeStyle = 'rgba(50,25,10,.88)'; c.lineJoin = 'round';
      c.strokeText(lab, q[0], q[1] - 27); c.fillText(lab, q[0], q[1] - 27); c.textAlign = 'start';
      hits.push({ kind, x0: q[0] - 28, x1: q[0] + 28, y0: q[1] - 38, y1: q[1] + 18 });
    } });

    // Cow manger: Lush golden timothy hay overflowing with soft stems
    trough(pn.haybox, '#9a6332', '🌿 ' + t('rHayBox') + ' ' + r.hay, 'rhaybox', (x, y, w, dd, z, h) => {
      const lvl = Math.min(1, r.hay / 20); if (lvl <= 0) return;
      const zt = z + 2 + (h - 2) * lvl;
      poly(c, [P(x, y, zt), P(x + w, y, zt), P(x + w, y + dd, zt), P(x, y + dd, zt)], '#eab308');
      // Abundant textured straw and hay wisps
      for (let i = 0; i < 20; i++) {
        const u = ((i * 37) % 10) / 10, v = ((i * 61) % 9) / 9;
        const a2 = P(x + u * w, y + v * dd, zt + (i % 3) * 1.2);
        c.strokeStyle = ['#ca8a04', '#fde047', '#fef08a', '#eab308'][i % 4];
        c.lineWidth = 1.3; c.beginPath(); c.moveTo(a2[0] - 4, a2[1] + 2); c.lineTo(a2[0] + 4, a2[1] - 3 - (i % 4)); c.stroke();
      }
      // Overflowing hay strands spilling over the front edge
      if (r.hay >= 6) {
        for (let i = 0; i < 6; i++) {
          const sp0 = P(x + .15 + i * (w - .3) / 5, y + dd, zt + 1);
          c.strokeStyle = i % 2 ? '#fde047' : '#eab308'; c.lineWidth = 1.4;
          c.beginPath(); c.moveTo(sp0[0], sp0[1]); c.quadraticCurveTo(sp0[0] + (i % 2 ? 3 : -3), sp0[1] + 4, sp0[0] + (i % 2 ? 1 : -1), sp0[1] + 7); c.stroke();
        }
      }
      if (r.hay >= 10) {
        const m = P(x + w / 2, y + dd / 2, zt + 2);
        ART.ell(c, m[0], m[1] - 2, 11, 5, '#fde047', 'rgba(160,110,30,.6)', .9);
      }
    });

    // Pig trough: Fresh farm garden crops & produce
    trough(pn.pigbox, '#854d0e', '🥕 ' + t('rPigBox') + ' ' + pfTotal(r), 'rpigbox', (x, y, w, dd, z, h) => {
      const tot = pfTotal(r); if (!tot) return;
      const zt = z + 2 + (h - 3) * Math.min(1, tot / 15);
      poly(c, [P(x, y, zt), P(x + w, y, zt), P(x + w, y + dd, zt), P(x, y + dd, zt)], '#713f12');
      const ics = [];
      for (const k in r.pf) { const cr = CROPS.find(q2 => q2.id === k); for (let i = 0; i < Math.min(r.pf[k], 4); i++) ics.push(cr ? cr.icon : '🥕'); }
      c.font = '10px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#000';
      ics.slice(0, 8).forEach((ic, i) => {
        const a2 = P(x + .15 + (i % 4) * (w - .3) / 3, y + .2 + Math.floor(i / 4) * (dd - .4), zt + 2);
        c.fillText(ic, a2[0], a2[1] + 3);
      });
      c.textAlign = 'start';
    });

    for (const q of r.drops) { const pen = q.k === 'milk' ? pn.cow : pn.pig; let x = pen.x + .4 + (q.u == null ? (q.id * .37) % 1 : q.u) * (pen.w - .8), y = pen.y + .4 + (q.v == null ? (q.id * .61) % 1 : q.v) * (pen.d - .8); const tb = q.k === 'milk' ? pn.haybox : pn.pigbox; let dy2 = 0; if (x > tb.x - .5 && x < tb.x + 1.7 && y > tb.y - .5 && y < tb.y + 1.4) dy2 = y < tb.y + .45 ? -(y - tb.y + .6) : (tb.y + 1.5 - y);
      y += dy2;
      out.push({ depth: x + y, fn: () => { const p2 = P(x, y); ART.ell(c, p2[0], p2[1], 6, 2.5, 'rgba(0,0,0,.15)'); c.font = '13px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#000'; c.fillText(RANCH_GOODS[q.k].icon, p2[0], p2[1] - 2 - Math.abs(Math.sin(T * 3 + q.id)) * 2); c.textAlign = 'start'; hits.push({ kind: 'rdrop', id: q.id, x0: p2[0] - 12, x1: p2[0] + 12, y0: p2[1] - 20, y1: p2[1] + 6 }); } }); }

    // Handsome Artisan Wooden Barn Storage Trunk / Chest
    const bx = pn.box; out.push({ depth: bx.x + bx.y + 1, fn: () => {
      const q = P(bx.x + .5, bx.y + .5);
      ART.ell(c, q[0], q[1] + 2, 22, 10, 'rgba(0,0,0,.22)');
      // Heavy oak chest base with beveled edges
      box(c, bx.x + .08, bx.y + .08, .84, .74, 0, 12, '#854d0e', '#a16207');
      // Arched domed trunk lid
      box(c, bx.x + .05, bx.y + .05, .90, .80, 12, 5, '#a16207', '#ca8a04');
      // Dark wrought-iron reinforcing bands across lid
      box(c, bx.x + .22, bx.y + .04, .12, .82, 12, 5.5, '#292524', '#44403c');
      box(c, bx.x + .66, bx.y + .04, .12, .82, 12, 5.5, '#292524', '#44403c');
      // Golden/brass rivet studs
      for (const rx of [bx.x + .28, bx.x + .72]) {
        const rp0 = P(rx, bx.y + .86, 14);
        ART.ell(c, rp0[0], rp0[1], 1.2, 1.2, '#fde047');
      }
      // Ornate central brass hasp latch and padlock
      const lockP = P(bx.x + .5, bx.y + .85, 11);
      c.fillStyle = '#eab308'; c.strokeStyle = '#713f12'; c.lineWidth = 1;
      c.beginPath(); c.rect(lockP[0] - 3.5, lockP[1] - 5, 7, 9); c.fill(); c.stroke();
      ART.ell(c, lockP[0], lockP[1] - 1, 1, 1.5, '#451a03'); // Keyhole

      c.font = '11px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#000';
      const pr = prod(S);
      if (pr.milk) c.fillText('🥛', q[0] - 6, q[1] - 18 - Math.abs(Math.sin(T * 3)) * 2);
      if (pr.meat) c.fillText('🥩', q[0] + 6, q[1] - 18 - Math.abs(Math.cos(T * 3)) * 2);

      c.font = 'bold 9px sans-serif'; c.fillStyle = '#fff'; c.lineWidth = 3; c.strokeStyle = 'rgba(50,25,10,.88)';
      const lab = '📦 ' + t('ranchBox'); c.strokeText(lab, q[0], q[1] - 32); c.fillText(lab, q[0], q[1] - 32); c.textAlign = 'start';
      hits.push({ kind: 'ranchbox', x0: q[0] - 28, x1: q[0] + 28, y0: q[1] - 44, y1: q[1] + 8 });
    } });
    // animals
    for (const [list, pen, fnD] of [[r.cows, pn.cow, drawCow], [r.pigs, pn.pig, drawPig]]) for (const a of list) {
      const tr = fnD === drawCow ? { x: pn.haybox.x, y: pn.haybox.y, food: r.hay > 0, big: 1 } : { x: pn.pigbox.x, y: pn.pigbox.y, food: pfTotal(r) > 0 }; tr.i = list.indexOf(a);
      const w = wander(a, pen, T, tr, a.fed !== d); const grown = d - a.born >= RANCH_GROW;
      const fn = (fnD === drawCow && !grown) ? drawCalf : fnD;
      const sc = fnD === drawCow ? (grown ? 1.9 : 1.38) : (grown ? 1.35 : .8);
      out.push({ depth: w.x + w.y, fn: () => { const q = P(w.x, w.y); c.save(); c.translate(q[0], q[1] + (w.eating ? Math.abs(Math.sin(T * 7)) * 1.5 : 0)); fn(c, sc, w.dir, T + a.born, w.moving, a.fed !== d && !w.waiting && !w.moving);
        if (w.eating) { c.font = '9px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#000'; c.fillText('😋', 0, -32 * sc - 4); c.textAlign = 'start'; }
        c.restore();
        c.font = 'bold 8px sans-serif'; c.textAlign = 'center'; c.fillStyle = a.sex === 'm' ? '#3a7ad9' : '#e0508a'; c.fillText(a.sex === 'm' ? '♂' : '♀', q[0] + 18 * sc, q[1] - 26 * sc); c.textAlign = 'start';
        hits.push({ kind: 'ranch', x0: q[0] - 14 * sc, x1: q[0] + 14 * sc, y0: q[1] - 24 * sc, y1: q[1] + 4 }); } });
    }
    // ranch hands
    r.staff.forEach((m, i) => { const tgt = m.act === 'hay' ? { x: pn.haybox.x + .3, y: pn.haybox.y + 1.1, w: 1, d: 1 } : m.act === 'pig' ? { x: pn.pigbox.x + .3, y: pn.pigbox.y + 1.1, w: 1, d: 1 } : m.act === 'collect' ? (m.tk === 'meat' ? pn.pig : pn.cow) : { x: L0.x + 5.4, y: L0.y + 2, w: 1.4, d: 1 };
      const st = walk.get('hand' + i) || { x: tgt.x + .5, y: tgt.y + .5, lt: T }; const dt = Math.min(.1, Math.max(0, T - st.lt)); st.lt = T;
      const tx = tgt.x + Math.min(tgt.w - .3, .6 + i * .8), ty = tgt.y + Math.min(tgt.d - .3, .6); const dx = tx - st.x, dy = ty - st.y, dd = Math.hypot(dx, dy), mv = dd > .05; if (mv) { const sp = Math.min(dd, 1.6 * dt); st.x += dx / dd * sp; st.y += dy / dd * sp; st.dir = dx - dy > 0 ? 1 : -1; } walk.set('hand' + i, st);
      out.push({ depth: st.x + st.y + .1, fn: () => { const q = P(st.x, st.y); const lk = ART.randomHuman(m.seed); lk.hat = 'straw'; lk.kid = false; lk.top = 'tee'; lk.shirt = '#7a9ad0'; lk.apron = '#6a8a4a'; applyStaffArt(lk, m.seed, false);
        c.save(); c.translate(q[0], q[1]); c.scale(st.dir < 0 ? -1 : 1, 1); ART.human(c, lk, 0, T, mv, 'happy'); c.restore();
        if (!mv && m.act && m.act !== 'idle') { c.font = '13px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#000'; c.fillText(m.act === 'hay' ? '🌿' : m.act === 'pig' ? '🥕' : m.tk === 'meat' ? '🥩' : '🥛', q[0] + 10, q[1] - 62 + Math.sin(T * 5) * 2); c.textAlign = 'start'; } } });
    });
    return out;
  }
  return { ensure, breedInfo, apply, tick, ground, collect: collectDraw, built, pigFood, hayFee, pfTotal, stockPigBox, pickAll };
})();
