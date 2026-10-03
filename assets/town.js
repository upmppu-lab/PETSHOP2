// ================= v9.99: town life — villagers' houses in the empty land, a pet that follows the player, fishing at the lake =================
// ================= PET TOWN v1.0: what can be built in the town =================
// cat house: cap = residents it holds, need = best population ever reached before it unlocks, cost grows +COST_STEP per copy
// cat tree: grow = [days to young, days to grown], hap = happiness when grown (sapling 20%, young 50%)
// cat deco: small facilities; hap = happiness, sup = residents it can serve (crowding), max = copies that count
const TOWN_DEF = {
  cottage: { cat: 'house', w: 5, d: 5, cap: 2, cost: 1500, need: 0, ic: '🛖' },
  tower: { cat: 'house', w: 5, d: 5, cap: 3, cost: 3500, need: 12, ic: '🏰' },
  family: { cat: 'house', w: 5, d: 5, cap: 4, cost: 6000, need: 20, ic: '🏠' },
  yard: { cat: 'house', w: 5, d: 5, cap: 4, cost: 8000, need: 30, ic: '🏡' },
  barn: { cat: 'house', w: 5, d: 5, cap: 5, cost: 12000, need: 45, ic: '🛖' },
  twostory: { cat: 'house', w: 5, d: 5, cap: 6, cost: 18000, need: 60, ic: '🏘️' },
  row: { cat: 'house', w: 5, d: 5, cap: 9, cost: 32000, need: 90, ic: '🏘️' },
  villa: { cat: 'house', w: 5, d: 5, cap: 16, cost: 60000, need: 130, ic: '🏢' },
  sunflower: { cat: 'tree', flower: 1, w: 1, d: 1, cost: 120, grow: [1, 1], hap: .1, ic: '🌻' },
  tulip: { cat: 'tree', flower: 1, w: 1, d: 1, cost: 150, grow: [1, 1], hap: .1, ic: '🌷' },
  rose: { cat: 'tree', flower: 1, w: 1, d: 1, cost: 220, grow: [1, 2], hap: .12, ic: '🌹' },
  lavender: { cat: 'tree', flower: 1, w: 1, d: 1, cost: 140, grow: [1, 1], hap: .1, ic: '🪻' },
  daisy: { cat: 'tree', flower: 1, w: 1, d: 1, cost: 130, grow: [1, 1], hap: .1, ic: '🌼' },
  cosmos: { cat: 'tree', flower: 1, w: 1, d: 1, cost: 160, grow: [1, 1], hap: .11, ic: '🌸' },
  hydrangea: { cat: 'tree', flower: 1, w: 1, d: 1, cost: 180, grow: [1, 2], hap: .12, ic: '💠' },
  lily: { cat: 'tree', flower: 1, w: 1, d: 1, cost: 200, grow: [1, 2], hap: .12, ic: '⚜️' },
  hibiscus: { cat: 'tree', flower: 1, w: 1, d: 1, cost: 240, grow: [1, 2], hap: .13, ic: '🌺' },
  pine: { cat: 'tree', w: 1, d: 1, cost: 250, grow: [1, 3], hap: .15, ic: '🌲' },
  bamboo: { cat: 'tree', w: 1, d: 1, cost: 320, grow: [1, 2], hap: .18, ic: '🎍' },
  cherry: { cat: 'tree', w: 1, d: 1, cost: 350, grow: [1, 3], hap: .2, ic: '🌸' },
  maple: { cat: 'tree', w: 1, d: 1, cost: 350, grow: [1, 3], hap: .2, ic: '🍁' },
  ginkgo: { cat: 'tree', w: 1, d: 1, cost: 360, grow: [1, 3], hap: .2, ic: '🍂' },
  willow: { cat: 'tree', w: 1, d: 1, cost: 380, grow: [1, 3], hap: .22, ic: '🌿' },
  palm: { cat: 'tree', w: 1, d: 1, cost: 400, grow: [2, 3], hap: .22, ic: '🌴' },
  peach: { cat: 'tree', w: 1, d: 1, cost: 420, grow: [2, 4], hap: .24, ic: '🍑' },
  orange: { cat: 'tree', w: 1, d: 1, cost: 440, grow: [2, 4], hap: .25, ic: '🍊' },
  apple: { cat: 'tree', w: 1, d: 1, cost: 450, grow: [2, 4], hap: .25, ic: '🍎' },
  bench: { cat: 'deco', w: 1, d: 1, cost: 800, hap: .25, sup: 2, max: 8, ic: '🪑', solid: 1 },
  lamp: { cat: 'deco', w: 1, d: 1, cost: 1200, hap: .25, sup: 1, max: 8, ic: '🏮', solid: 1 },
  busstop: { cat: 'deco', w: 2, d: 1, cost: 12000, hap: .6, sup: 8, max: 2, ic: '🚏', solid: 1, need: 12 },
  fountain: { cat: 'deco', w: 2, d: 2, cost: 15000, hap: .8, sup: 10, max: 3, ic: '⛲', solid: 1, need: 20 },
  playground: { cat: 'deco', w: 3, d: 3, cost: 25000, hap: 1.0, sup: 15, max: 3, ic: '🛝', solid: 1, need: 30 },
  // v1.24: many more decorations -- monuments, garden bits, street furniture
  fence: { cat: 'deco', w: 1, d: 1, cost: 120, hap: .1, sup: 0, max: 40, ic: '🪵', solid: 1 },
  hedge: { cat: 'deco', w: 1, d: 1, cost: 180, hap: .12, sup: 0, max: 40, ic: '🌿', solid: 1 },
  flowerbed: { cat: 'deco', w: 2, d: 1, cost: 600, hap: .2, sup: 1, max: 12, ic: '🌺', solid: 1 },
  signpost: { cat: 'deco', w: 1, d: 1, cost: 500, hap: .15, sup: 0, max: 6, ic: '🪧', solid: 1 },
  mailbox: { cat: 'deco', w: 1, d: 1, cost: 700, hap: .15, sup: 1, max: 6, ic: '📮', solid: 1 },
  topiary: { cat: 'deco', w: 1, d: 1, cost: 1500, hap: .25, sup: 1, max: 8, ic: '🐇', solid: 1 },
  stonelamp: { cat: 'deco', w: 1, d: 1, cost: 1800, hap: .25, sup: 1, max: 8, ic: '🏮', solid: 1 },
  flagpole: { cat: 'deco', w: 1, d: 1, cost: 2000, hap: .3, sup: 1, max: 4, ic: '🚩', solid: 1, need: 8 },
  picnic: { cat: 'deco', w: 2, d: 1, cost: 2500, hap: .35, sup: 2, max: 6, ic: '🧺', solid: 1, need: 8 },
  phonebooth: { cat: 'deco', w: 1, d: 1, cost: 3000, hap: .35, sup: 2, max: 3, ic: '☎️', solid: 1, need: 10 },
  well: { cat: 'deco', w: 1, d: 1, cost: 3500, hap: .4, sup: 2, max: 3, ic: '🪣', solid: 1, need: 10 },
  dogstatue: { cat: 'deco', w: 1, d: 1, cost: 4000, hap: .45, sup: 2, max: 3, ic: '🐕', solid: 1, need: 12 },
  catstatue: { cat: 'deco', w: 1, d: 1, cost: 4000, hap: .45, sup: 2, max: 3, ic: '🐈', solid: 1, need: 12 },
  sandbox: { cat: 'deco', w: 2, d: 2, cost: 4500, hap: .45, sup: 4, max: 3, ic: '🏖️', solid: 1, need: 15 },
  heartarch: { cat: 'deco', w: 2, d: 1, cost: 5000, hap: .5, sup: 2, max: 3, ic: '💗', solid: 1, need: 15 },
  pond: { cat: 'deco', w: 2, d: 2, cost: 6000, hap: .55, sup: 4, max: 3, ic: '🦆', solid: 1, need: 18 },
  monument: { cat: 'deco', w: 1, d: 1, cost: 8000, hap: .65, sup: 3, max: 2, ic: '🗿', solid: 1, need: 22 },
  gazebo: { cat: 'deco', w: 2, d: 2, cost: 10000, hap: .75, sup: 6, max: 2, ic: '⛩️', solid: 1, need: 25 },
  windmill: { cat: 'deco', w: 2, d: 2, cost: 18000, hap: .9, sup: 8, max: 1, ic: '🌬️', solid: 1, need: 35 },
  goldstatue: { cat: 'deco', w: 2, d: 2, cost: 40000, hap: 1.5, sup: 12, max: 1, ic: '🏆', solid: 1, need: 60 },
  pet_fountain: { cat: 'deco', w: 2, d: 2, cost: 7000, hap: .7, sup: 6, max: 3, ic: '⛲', solid: 1, need: 16 },
  pet_statue_hero: { cat: 'deco', w: 1, d: 1, cost: 9000, hap: .8, sup: 5, max: 2, ic: '🐕‍🦺', solid: 1, need: 20 },
  flower_tunnel: { cat: 'deco', w: 3, d: 2, cost: 11000, hap: .9, sup: 8, max: 2, ic: '🌺', solid: 1, need: 24 },
  camping_zone: { cat: 'deco', w: 3, d: 3, cost: 16000, hap: 1.1, sup: 10, max: 2, ic: '⛺', solid: 1, need: 30 }
};
// PET TOWN phase 2: the big buildings are placed from the build menu too (nothing exists at the start). w/d = the lot at the
// building's BIGGEST size (it grows inside it). act = the module's own build action (it takes the coins and checks its rules).
// live = has customers/staff inside, so it can only be moved while the shops are closed. noPlace = no lot to choose (along the main street).
Object.assign(TOWN_DEF, {
  farm: { cat: 'big', w: FARM_LOT.w, d: FARM_LOT.d, cost: 3000, ic: '🌾' },
  home: { cat: 'big', w: 10, d: 8, cost: 5000, ic: '🏡' },
  cafe: { cat: 'big', w: CAFE_LV[CAFE_MAX].w + 2, d: CAFE_LV[CAFE_MAX].d + 1, cost: CAFE_BUILD_COST, act: 'buildcafe', rep: CAFE_UNLOCK_TIER, ic: '☕', live: 1 },
  hosp: { cat: 'big', w: hospDims(HOSP_MAX).w + 2, d: hospDims(HOSP_MAX).d + 1, cost: HOSP_BUILD_COST, act: 'buildhosp', rep: HOSP_UNLOCK_TIER, ic: '🏥', live: 1 },
  salon: { cat: 'big', w: 12, d: 9, cost: SALON_COST, act: 'buildsalon', ic: '✂️', live: 1 },
  park: { cat: 'big', w: PARK_W, d: PARK_D, cost: PARK_COST, act: 'buildpark', ic: '🌳' },
  lake: { cat: 'big', w: 18, d: 16, cost: VILLAGE_COST.lake, act: 'vbuild', ic: '🦢' },
  monu: { cat: 'big', w: 7, d: 7, cost: VILLAGE_COST.monu, act: 'vbuild', ic: '💑' },
  avenue: { cat: 'big', noPlace: 1, cost: VILLAGE_COST.avenue, act: 'vbuild', ic: '🌸' }
});
// PET TOWN v1.4: residential zones (주택가). Houses can only be built inside one; each zone is a 20x14 block with a 2-row lane across the middle
// (5 house lots above it, 5 below). The first zone is free and starts away from the shop; more zones cost more each time.
TOWN_DEF.zone = { cat: 'zone', w: 20, d: 14, cost: 8000, ic: '🏘️', lane: 6 };
const TOWN_BIG = ['farm', 'home', 'cafe', 'hosp', 'salon', 'park', 'lake', 'monu', 'avenue'];
const TOWN_TABS = [['big', '🏛️'], ['house', '🏠'], ['tree', '🌳'], ['deco', '⛲']];
// PET TOWN stage 3: shops & public buildings (tab 🏫). hap/sup like small facilities (only `max` copies count), plus a special effect (fx)
// look: wall / roof colours, h = wall height, roof = 'gable' | 'hip' | 'flat' | 'none' (open lots), sign = emoji on the sign board
Object.assign(TOWN_DEF, {
  gate: { cat: 'civic', w: 3, d: 1, cost: 5000, hap: 2, sup: 0, max: 1, need: 0, ic: '🪧', roof: 'none', open: 1 },
  conv: { cat: 'civic', w: 3, d: 3, cost: 15000, hap: 2, sup: 10, max: 2, need: 12, ic: '🏪', wall: '#f4f6f8', roofc: '#3aa76d', h: 22, roof: 'flat', sign: '🏪', fx: 'spend2' },
  bakery: { cat: 'civic', w: 3, d: 3, cost: 20000, hap: 3, sup: 12, max: 2, need: 12, ic: '🥐', wall: '#fdf0d8', roofc: '#c8864a', h: 22, roof: 'gable', sign: '🥐', fx: 'spend3' },
  florist: { cat: 'civic', w: 3, d: 3, cost: 18000, hap: 3, sup: 8, max: 2, need: 20, ic: '💐', wall: '#f8e6ee', roofc: '#6ab04c', h: 20, roof: 'gable', sign: '💐', fx: 'green' },
  clinic: { cat: 'civic', w: 3, d: 3, cost: 35000, hap: 3, sup: 15, max: 2, need: 20, ic: '🩺', wall: '#ffffff', roofc: '#4aa3c8', h: 24, roof: 'flat', sign: '➕' },
  dogpark: { cat: 'civic', w: 5, d: 5, cost: 30000, hap: 4, sup: 12, max: 2, need: 30, ic: '🐕', roof: 'none', open: 1 },
  photo: { cat: 'civic', w: 3, d: 3, cost: 30000, hap: 3, sup: 8, max: 1, need: 30, ic: '📷', wall: '#eef0fa', roofc: '#7a6ab5', h: 24, roof: 'hip', sign: '📷' },
  school: { cat: 'civic', w: 6, d: 4, cost: 60000, hap: 5, sup: 25, max: 1, need: 45, ic: '🏫', wall: '#f6e3c6', roofc: '#b85a4a', h: 34, roof: 'hip', sign: '🏫', fx: 'movein' },
  police: { cat: 'civic', w: 4, d: 3, cost: 50000, hap: 4, sup: 20, max: 1, need: 45, ic: '🚓', wall: '#e8eef8', roofc: '#2f4f8a', h: 28, roof: 'flat', sign: '🚓', fx: 'thief' },
  fire: { cat: 'civic', w: 4, d: 3, cost: 50000, hap: 4, sup: 20, max: 1, need: 45, ic: '🚒', wall: '#f4e4dc', roofc: '#c0302a', h: 30, roof: 'flat', sign: '🚒', fx: 'stay' },
  library: { cat: 'civic', w: 4, d: 3, cost: 45000, hap: 4, sup: 15, max: 1, need: 60, ic: '📚', wall: '#efe6d6', roofc: '#5a6a7a', h: 30, roof: 'gable', sign: '📚', fx: 'collector' },
  market: { cat: 'civic', w: 4, d: 3, cost: 40000, hap: 3, sup: 10, max: 1, need: 60, ic: '🛒', roof: 'none', open: 1, fx: 'spend3' },
  training: { cat: 'civic', w: 4, d: 4, cost: 55000, hap: 3, sup: 10, max: 1, need: 90, ic: '🎓', wall: '#e6f2e2', roofc: '#4a7fb5', h: 26, roof: 'gable', sign: '🎓' },
  pethotel: { cat: 'civic', w: 4, d: 3, cost: 70000, hap: 3, sup: 10, max: 1, need: 90, ic: '🏨', wall: '#fff6e0', roofc: '#9a6ab5', h: 40, roof: 'flat', sign: '🏨', fx: 'rich' },
  clocktower: { cat: 'civic', w: 3, d: 3, cost: 90000, hap: 5, sup: 15, max: 1, need: 130, ic: '🕰️', roof: 'none', open: 1 },
  lookout: { cat: 'civic', w: 2, d: 2, cost: 80000, hap: 4, sup: 5, max: 1, need: 130, ic: '🔭', roof: 'none', open: 1 },
  chapel: { cat: 'civic', w: 4, d: 5, cost: 150000, hap: 8, sup: 10, max: 1, need: 180, ic: '💒', wall: '#ffffff', roofc: '#e98aa8', h: 30, roof: 'gable', sign: '💒' },
  shelter: { cat: 'civic', w: 6, d: 5, cost: 40000, hap: 5, sup: 20, max: 1, need: 25, ic: '🛖', wall: '#fff5eb', roofc: '#d97746', h: 28, roof: 'hip', sign: '🐾', fx: 'shelter' },
  aquarium_center: { cat: 'civic', w: 6, d: 5, cost: 120000, hap: 9, sup: 35, max: 1, need: 50, ic: '🐬', wall: '#e0f2fe', roofc: '#0284c7', h: 32, roof: 'hip', sign: '🐬', fx: 'spend3' },
  pet_themepark: { cat: 'civic', w: 7, d: 6, cost: 220000, hap: 12, sup: 50, max: 1, need: 80, ic: '🎡', roof: 'none', open: 1, fx: 'rich' },
  cat_cafe: { cat: 'civic', w: 4, d: 4, cost: 65000, hap: 6, sup: 22, max: 2, need: 35, ic: '🐱', wall: '#fef3c7', roofc: '#f59e0b', h: 26, roof: 'gable', sign: '🐾', fx: 'collector' },
  pet_bakery: { cat: 'civic', w: 4, d: 3, cost: 48000, hap: 5, sup: 18, max: 2, need: 28, ic: '🧁', wall: '#fce7f3', roofc: '#ec4899', h: 24, roof: 'gable', sign: '🧁', fx: 'spend2' },
  zoo: { cat: 'civic', w: 26, d: 22, cost: 900000, hap: 18, sup: 80, max: 1, need: 70, ic: '🦁', wall: '#f0f4f8', roofc: '#2b8a3e', h: 56, roof: 'hip', sign: '🦁', fx: 'zoo' }
});
TOWN_TABS.splice(3, 0, ['civic', '🏫']);
const TOWN_BAL = {
  H0: 45,          // happiness of a town with nothing in it
  FAC_CAP: 40, GREEN_CAP: 12, CROWD_K: .8, SUP0: 16,  // facilities / greenery caps, crowding penalty per resident over what facilities can serve
  MOVE_IN: .15,    // share of capacity that can move in per day (+1 per bus stop)
  LOW: 35, LOW_DAYS: 3, GRACE: 7, // people leave only after GRACE days, and only after LOW_DAYS days in a row under LOW happiness
  CUST_CAP: 3,     // customers come up to 3x as often in a big town
  COST_STEP: .1    // every copy of the same building costs 10% more
};
// milestones (best population ever): what they unlock is listed in the town panel
const TOWN_MS = [
  { pop: 12, u: ['h:tower', 'd:busstop', 'b:conv', 'b:bakery'] }, { pop: 20, u: ['h:family', 'd:fountain', 'c:family', 'b:florist', 'b:clinic'] }, { pop: 25, u: ['b:shelter'] }, { pop: 30, u: ['h:yard', 'd:playground', 'b:dogpark', 'b:photo'] },
  { pop: 45, u: ['h:barn', 's:cocker', 'b:school', 'b:police', 'b:fire'] }, { pop: 60, u: ['h:twostory', 'c:collector', 'b:library', 'b:market'] }, { pop: 70, u: ['b:zoo'] }, { pop: 90, u: ['h:row', 's:exotic', 'b:training', 'b:pethotel'] },
  { pop: 130, u: ['h:villa', 's:macaw', 'b:clocktower', 'b:lookout'] }, { pop: 180, u: ['c:rich', 'b:chapel'] }, { pop: 250, u: ['s:beardie', 'c:celeb'] }
];
const TOWN = (() => {
  const Wd = s => { const st = s || (typeof S !== 'undefined' && S); return (st && st.room && st.room.w) || 8; }, Hd = s => { const st = s || (typeof S !== 'undefined' && S); return (st && st.room && st.room.h) || 8; };
  let MR = null; // mirror (a turned building): swap x/y around the lot's corner, which mirrors the drawing on screen
  let ROT = null; // v1.5: a building turned 180° (r = 2, 3): {ox, oy, W, D} in the art frame; we then see its back
  let HS = null; // v1.4: houses are drawn 1.25x wider/deeper and 1.6x taller than the old art (people looked as tall as the houses)
  const Q = (x, y, z) => { if (ROT) { x = 2 * ROT.ox + ROT.W - x; y = 2 * ROT.oy + ROT.D - y; } if (MR) { const nx = MR.ox + (y - MR.oy), ny = MR.oy + (x - MR.ox); x = nx; y = ny; } if (HS) { x = HS.ox + (x - HS.ox) * HS.k; y = HS.oy + (y - HS.oy) * HS.k; z = (z || 0) * HS.kz; } return [ISO.wx(x, y), ISO.wy(x, y) - (z || 0)]; };
  const poly = (c, pts, col, st, lw) => { c.beginPath(); pts.forEach((q, i) => i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])); c.closePath(); if (col) { c.fillStyle = col; c.fill(); } if (st) { c.lineWidth = lw || 1; c.strokeStyle = st; c.stroke(); } };
  const hash = (a, b) => { let h = (a * 73856093) ^ (b * 19349663); h = (h ^ (h >>> 13)) * 1274126177; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
  // ================= PET TOWN v1.0: a town you build yourself =================
  // Every house / tree / small facility is an object the player placed: S.town.objs = [{ id, k, x, y, r, n, pd, paid }]
  //   x,y = top-left tile of the footprint, r = 1 when turned (footprint w/d swapped, drawn mirrored), n = residents (houses),
  //   pd = day planted (trees), paid = coins spent (half comes back on demolish).
  // Population = residents living in houses; "possible" = the houses' capacity. Happiness (0-100) decides how full the houses
  // get and whether people leave (only after a grace period and several bad days in a row).
  const D = TOWN_DEF;
  const obj = (s, id) => ((s.town && s.town.objs) || []).find(o => o.id === id);
  const fpOf = (k, r) => { const d = D[k] || { w: 1, d: 1 }; return r % 2 && d.cat !== 'big' ? { w: d.d, d: d.w } : { w: d.w, d: d.d }; }; // big buildings don't turn; r = 0 door south, 1 east, 2 north, 3 west
  const rotPt = (o, u, v, W, Dd) => { const r = o.r || 0; if (r >= 2) { u = W - 1 - u; v = Dd - 1 - v; } if (r % 2) { const t = u; u = v; v = t; } return { x: o.x + u, y: o.y + v }; }; // a tile of the unturned lot -> where it is now
  const maxR = k => (k === 'zoo') ? 1 : D[k] && (D[k].cat === 'house' || D[k].cat === 'civic' || D[k].cat === 'deco' || k === 'zone') ? 4 : 1;
  const normR = (k, r) => ((r | 0) % maxR(k) + maxR(k)) % maxR(k);
  // every lot that belongs to something else (shop, road, café, hospital, farm, home, park, lake, monument, board, salon), at its biggest size
  // what is already taken: the shop + its yard, the main street (full length), the notice board and every big building's lot
  function reserved(ignore, s) {
    const W = Wd(s), H = Hd(s), R = [], add = (x, y, w, d, m) => R.push({ x: x - (m || 0), y: y - (m || 0), w: w + 2 * (m || 0), d: d + 2 * (m || 0) });
    add(-1, -1, W + 2, H + 2, 1); add(W + 1, VILLAGE_Y0 - 2, 9, 400, 0);   // x를 W-1 → W+1로, 폭 11 → 9로 축소
    if (typeof VILLAGE !== 'undefined') { const b = VILLAGE.BOARD(); add(b.x, b.y, 1, 1, 1); }
    for (const k of TOWN_BIG) { if (k === ignore) continue; const L = LAY(k, s), d = D[k]; if (L && !d.noPlace) add(L.x, L.y, d.w, d.d, 0); }
    return R;
  }
  let _res = null, _resKey = '';
  const resv = (ig, s) => { if (ig) return reserved(ig, s); const st = s || (typeof S !== 'undefined' && S); const k = Wd(st) + 'x' + Hd(st) + JSON.stringify((st && st.lay) || 0); if (_resKey !== k) { _res = reserved(null, st); _resKey = k; } return _res; };
  const overlap = (a, b) => a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.d && b.y < a.y + a.d;
  const inBig = (x, y) => { for (const k of TOWN_BIG) { const L = LAY(k), d = D[k]; if (L && !d.noPlace && x >= L.x && x < L.x + d.w && y >= L.y && y < L.y + d.d) return k; } return null; };
  const zonesOf = s => (s && s.town && s.town.zones) || [];
  const isVertZone = z => !!((z && z.r && z.r % 2) || (z && z.w && z.d && z.w < z.d));
  const laneOf = z => isVertZone(z)
    ? { x: z.x + D.zone.lane, y: z.y, w: 2, d: z.d || D.zone.w }
    : { x: z.x, y: z.y + D.zone.lane, w: z.w || D.zone.w, d: 2 };
  const inside = (b, z) => b.x >= z.x && b.y >= z.y && b.x + b.w <= z.x + z.w && b.y + b.d <= z.y + z.d;
  const zoneAt = (s, x, y) => zonesOf(s).find(z => x >= z.x && x < z.x + z.w && y >= z.y && y < z.y + z.d) || null;
  // v1.5: a paved path from the first residential zone to the pet shop: along the lane out of the zone, down past the shop's west side,
  // then along the shop's south side to the sidewalk (worked out from the shop's size, so it follows when the shop grows)
  function pathRects(s) {
    const z = zonesOf(s)[0]; if (!z) return [];
    const W = Wd(), H = Hd(), ly = z.y + D.zone.lane, ex = z.x + z.w, px = -4, cy = H + 5, R = []; // (row H+5: leaves room for the notice board at H+3)
    if (ex <= px) { R.push({ x: ex, y: ly, w: px + 2 - ex, d: 2 }); R.push({ x: px, y: Math.min(ly, cy), w: 2, d: Math.abs(cy - ly) + 2 }); }
    else if (z.y >= cy) { const mx = Math.min(Math.max(z.x + 2, px), W - 3); R.push({ x: mx, y: cy, w: 2, d: z.y - cy }); }
    const sx = ex <= px ? px : Math.min(Math.max(z.x + 2, px), W - 3); R.push({ x: sx, y: cy, w: W + 1 - sx, d: 2 });
    return R;
  }
  // v1.6: roads are tiles the player paves / erases ("x,y" strings in S.town.roads). A new town starts with the path above already paved.
  const ROAD_COST = 20;
  const ROAD_TYPES = [
    { id: 'cobble', ic: '🪨', cost: 20 },
    { id: 'brick', ic: '🧱', cost: 25 },
    { id: 'wood', ic: '🪵', cost: 25 },
    { id: 'marble', ic: '🏛️', cost: 35 },
    { id: 'step', ic: '🌿', cost: 20 },
    { id: 'pink', ic: '🌸', cost: 30 }
  ];
  let _rset = null, _rkey = '';
  const roadSet = s => { const T = s && s.town; if (!T || !T.roads) return new Set(); const k = T.roads.length + ':' + (T.rv || 0); if (k !== _rkey || !_rset) { _rset = new Set(T.roads); _rkey = k; } return _rset; };
  const onRoad = (s, box) => { const R = roadSet(s); if (!R.size) return false; for (let u = 0; u < box.w; u++) for (let v = 0; v < box.d; v++) if (R.has((box.x + u) + ',' + (box.y + v))) return true; return false; };
  function initRoads(s) { const T = s.town; if (T.roads) return; T.roads = []; T.rstyle = T.rstyle || {}; const seen = new Set(); for (const r of pathRects(s)) for (let u = 0; u < r.w; u++) for (let v = 0; v < r.d; v++) { const k = (r.x + u) + ',' + (r.y + v); if (!seen.has(k)) { seen.add(k); T.roads.push(k); } } T.rv = 1; }
  // 실제 건물 본체 내부인지 판별 (여백/마당은 제외하고 실제 건물 안과 큰도로 차도만 차단)
  function inActualBuilding(s, x, y) {
    const W = Wd(s), H = Hd(s);
    // 1. 가게 내부 (가게 벽 안쪽만 차단; 가게 밖 테두리 x=-1, x=W, y=-1, y=H는 허용)
    if (x >= 0 && x < W && y >= 0 && y < H) return true;
    // 2. 큰도로 중앙 차도 (W+3.4 ~ W+6.2 구간인 타일 W+4, W+5) 차단 — 양옆 인도(W+1~W+3, W+6~W+8) 및 집 앞은 연결 가능하도록 허용
    if (x >= W + 4 && x <= W + 5) return true;
    // 3. 마을 게시판 본체 타일
    if (typeof VILLAGE !== 'undefined') { const nb = VILLAGE.BOARD(); if (x === nb.x && y === nb.y) return true; }
    // 4. 내 집(home): 10x8 부지 전체가 아니라 실제 집 건물(HOME_POS)만 차단 (집 앞마당과 인도 사이는 길 깔기 허용!)
    if (LAY('home', s) && typeof FURN !== 'undefined' && FURN.HOME_POS) {
      const hp = FURN.HOME_POS(W, H, (s && s.home && s.home.lv) || 1);
      if (x >= hp.x && x < hp.x + hp.w && y >= hp.y && y < hp.y + hp.d) return true;
    }
    // 5. 카페 실제 건물 (지어졌을 때 현재 레벨의 실제 건물만 차단)
    if (s && s.cafe && s.cafe.built && typeof CAFE_POS === 'function') {
      const cp = CAFE_POS(s); if (x >= cp.x && x < cp.x + cp.w && y >= cp.y && y < cp.y + cp.d) return true;
    }
    // 6. 병원 실제 건물 (지어졌을 때 현재 레벨의 실제 건물만 차단)
    if (s && s.hosp && s.hosp.built && typeof HOSP_POS === 'function') {
      const hp = HOSP_POS(s); if (x >= hp.x && x < hp.x + hp.w && y >= hp.y && y < hp.y + hp.d) return true;
    }
    // 7. 미용실 실제 건물 (10x8 건물 본체만 차단, 동쪽 문 앞 2칸은 길 깔기 허용)
    if (s && s.salon && s.salon.built && typeof SALON_POS === 'function') {
      const sp = SALON_POS(); if (x >= sp.x && x < sp.x + sp.w && y >= sp.y && y < sp.y + sp.d) return true;
    }
    // 8. 농장: 밭(FARM_POS), 씨앗가게(STALL_POS), 닭장(COOP_POS), 보관상자(FARM_BOX_POS) 본체만 차단 (주변 통로는 길 깔기 허용)
    if (LAY('farm', s)) {
      if (typeof FARM_POS === 'function') {
        const fp = FARM_POS(W, H); if (x >= fp.x && x < fp.x + fp.w && y >= fp.y && y < fp.y + fp.d) return true;
      }
      if (typeof STALL_POS === 'function') {
        const sp = STALL_POS(); if (x >= Math.floor(sp.x) && x < Math.ceil(sp.x + 3.1) && y >= Math.floor(sp.y) && y < Math.ceil(sp.y + 3)) return true;
      }
      if (s && s.farm && s.farm.coop && typeof COOP_POS === 'function') {
        const cq = COOP_POS(W); if (x >= cq.x && x < cq.x + cq.w && y >= cq.y && y < cq.y + cq.d) return true;
      }
      if (typeof FARM_BOX_POS === 'function') {
        const fb = FARM_BOX_POS(); if (fb && x >= fb.x && x < fb.x + fb.w && y >= fb.y && y < fb.y + fb.d) return true;
      }
    }
    // 9. 목장, 공원, 호수, 기념광장 (실제 지어진 경우에만 차단)
    for (const bk of ['ranch', 'park', 'lake', 'monu']) {
      const L = LAY(bk, s), bd = D[bk];
      if (L && bd && !bd.noPlace && bigBuilt(s, bk) && x >= L.x && x < L.x + bd.w && y >= L.y && y < L.y + bd.d) return true;
    }
    return false;
  }
  const houseBuildingHasTile = (o, x, y) => {
    for (let u = 0; u < 4; u++) for (let v = 0; v < 3; v++) { const p = rotPt(o, u, v, 5, 5); if (p.x === x && p.y === y) return true; }
    return false;
  };
  // 길 깔기: 건물 안과 큰도로 차도를 제외한 어디든 자유롭게 깔 수 있게 허용 (집과 인도 사이, 앞마당 등 모두 가능!)
  const roadTileOk = (s, x, y) => {
    const b = { x, y, w: 1, d: 1 };
    const W = Wd(s), H = Hd(s);
    if (x < VILLAGE_X0 + 1 || y < VILLAGE_Y0 + 1 || x > W + VILLAGE_XE - 2 || y > VILLAGE_S_MAX() - 1) return false;
    if (inActualBuilding(s, x, y)) return false;
    // 플레이어가 배치한 마을 오브젝트: 주택은 실제 집 건물(4x3) 본체만 막고 앞마당(2칸)은 길 깔기 허용!
    for (const o of (s && s.town && s.town.objs) || []) {
      const d = D[o.k]; if (!d) continue;
      if (d.cat === 'house') {
        if (houseBuildingHasTile(o, x, y)) return false;
        continue;
      }
      if (o.k === 'gate') continue;
      const g = fpOf(o.k, o.r);
      if (overlap(b, { x: o.x, y: o.y, w: g.w, d: g.d })) return false;
    }
    return true;
  };
  const zoneCost = s => Math.round(D.zone.cost * Math.pow(1.8, Math.max(0, zonesOf(s).length - 1)) / 100) * 100;
  function canPlace(s, k, x, y, r, ignore) {
    const f = fpOf(k, r), box = { x, y, w: f.w, d: f.d }, W = Wd(s), H = Hd(s), cat = D[k] && D[k].cat;
    if (x < VILLAGE_X0 + 2 || y < VILLAGE_Y0 + 2 || x + f.w > W + VILLAGE_XE - 2 || y + f.d > VILLAGE_S_MAX() - 1) return 'tOut';
    const Z = zonesOf(s);
    if (cat === 'zone') { // a new residential block: clear land, not touching another block
      if (resv(null, s).some(q => overlap(box, q))) return 'tTaken';
      if (Z.some(z => overlap(box, { x: z.x - 1, y: z.y - 1, w: z.w + 2, d: z.d + 2 }))) return 'tTaken';
      for (const o of (s.town && s.town.objs) || []) { const g = fpOf(o.k, o.r); if (overlap(box, { x: o.x, y: o.y, w: g.w, d: g.d })) return 'tTaken'; }
      return null;
    }
    // v1.31: 나무나 꽃은 집 옆, 인도 옆, 도로 옆에도 심을 수 있음 (미래 확장 대비용 예약 여백 제거)
    if (cat === 'tree') {
      // 1. 가게 벽 안쪽은 막음 (가게 내부는 불가)
      if (overlap(box, { x: 0, y: 0, w: W, d: H })) return 'tTaken';
      // 2. 메인 스트리트 차도/인도 본체 위는 막음
      if (overlap(box, { x: W + 1, y: VILLAGE_Y0 - 2, w: 9, d: 400 })) return 'tTaken';
      // 3. 게시판 본체 위는 막음
      if (typeof VILLAGE !== 'undefined') { const b = VILLAGE.BOARD(); if (overlap(box, { x: b.x, y: b.y, w: 1, d: 1 })) return 'tTaken'; }
      // 4. 큰 건물의 "현재 실제 크기" 위는 막음 (미래 확장 빈 공간은 심기 허용)
      if (s && s.cafe && s.cafe.built && typeof CAFE_POS === 'function') {
        const cp = CAFE_POS(s); if (overlap(box, { x: cp.x, y: cp.y, w: cp.w, d: cp.d })) return 'tTaken';
      }
      if (s && s.hosp && s.hosp.built && typeof HOSP_POS === 'function') {
        const hp = HOSP_POS(s); if (overlap(box, { x: hp.x, y: hp.y, w: hp.w, d: hp.d })) return 'tTaken';
      }
      for (const bk of TOWN_BIG) {
        if (bk === 'cafe' || bk === 'hosp') continue;
        const L = LAY(bk, s), bd = D[bk];
        if (L && !bd.noPlace && bigBuilt(s, bk) && overlap(box, { x: L.x, y: L.y, w: bd.w, d: bd.d })) return 'tTaken';
      }
      // 5. 도로/인도 위는 심을 수 없음 (길 옆은 허용)
      if (onRoad(s, box)) return 'tOnPath';
      // 6. 주택가 중앙 통로(차선) 위는 심을 수 없음 (집 옆은 허용)
      if (Z.some(z => overlap(box, laneOf(z)))) return 'tOnLane';
      // 7. 다른 오브젝트/집 본체 위와 충돌 검사
      for (const o of (s.town && s.town.objs) || []) {
        if (o.id === ignore) continue;
        const g = fpOf(o.k, o.r);
        if (overlap(box, { x: o.x, y: o.y, w: g.w, d: g.d })) return 'tTaken';
      }
      return null;
    }
    if (resv(cat === 'big' ? k : null, s).some(q => overlap(box, q))) return 'tTaken';
    if (cat === 'house') {
      const R = roadSet(s);
      if (R.size) {
        const fakeO = { x, y, r: normR(k, r) };
        for (let u = 0; u < 4; u++) for (let v = 0; v < 3; v++) { const p = rotPt(fakeO, u, v, 5, 5); if (R.has(p.x + ',' + p.y)) return 'tOnPath'; }
      }
    } else if (cat !== 'zone' && cat !== 'big' && onRoad(s, box)) return 'tOnPath';
    if (cat === 'house') { const z = Z.find(z => inside(box, z)); if (!z) return 'tNeedZone'; if (overlap(box, laneOf(z))) return 'tOnLane'; }
    else if (cat === 'big' || cat === 'civic') { if (Z.some(z => overlap(box, z))) return 'tInZone'; }
    else if (Z.some(z => overlap(box, laneOf(z)))) return 'tOnLane';
    for (const o of (s.town && s.town.objs) || []) {
      if (o.id === ignore) continue;
      if ((cat === 'big' || cat === 'civic') && D[o.k] && D[o.k].cat === 'tree') continue;
      const g = fpOf(o.k, o.r);
      if (overlap(box, { x: o.x, y: o.y, w: g.w, d: g.d })) return 'tTaken';
    }
    return null;
  }
  // the first residential block: away from the shop (about 20 tiles), on the first free spot of a few candidates
  function firstZone(s) {
    const W = Wd(), H = Hd(), zw = D.zone.w, zd = D.zone.d;
    for (const [x, y] of [[-zw - 20, H + 5 - D.zone.lane], [-zw - 20, 0], [-zw - 20, H + 6], [-zw - 20, -zd - 4], [-zw - 30, 0], [-10, H + 22], [-zw - 20, -zd - 20]]) if (!canPlace(s, 'zone', x, y, 0)) return { x, y, w: zw, d: zd };
    return { x: -zw - 24, y: 0, w: zw, d: zd };
  }
  // free house lots in the zones (top row faces the lane)
  function zoneLots(s, k) {
    const out = [];
    for (const z of zonesOf(s)) {
      if (isVertZone(z)) {
        for (const xx of [z.x + 1, z.x + D.zone.lane + 3]) for (let yy = z.y; yy + 5 <= z.y + z.d; yy += 5) if (!canPlace(s, k || 'cottage', xx, yy, 0)) out.push({ x: xx, y: yy });
      } else {
        for (const yy of [z.y + 1, z.y + D.zone.lane + 3]) for (let xx = z.x; xx + 5 <= z.x + z.w; xx += 5) if (!canPlace(s, k || 'cottage', xx, yy, 0)) out.push({ x: xx, y: yy });
      }
    }
    return out;
  }
  // v1.8: saves started before v1.8 have the first zone further north with a bent path. If that town is still untouched
  // (one zone at the old spot, roads exactly the starting path), slide the zone and everything in it south so the path is straight.
  function moveStartZone(s) {
    const T = s.town; T.m18 = 1;
    try {
      const zs = T.zones || [], z = zs[0], zw = D.zone.w; if (zs.length !== 1 || z.x !== -zw - 20 || z.y !== 0) return;
      const ny = Hd() + 5 - D.zone.lane, dy = ny - z.y; if (dy <= 0) return;
      const keyOf = R => { const a = []; for (const r of R) for (let u = 0; u < r.w; u++) for (let v = 0; v < r.d; v++) a.push((r.x + u) + ',' + (r.y + v)); return [...new Set(a)].sort().join('|'); };
      if (keyOf(pathRects(s)) !== [...new Set(T.roads || [])].sort().join('|')) return; // player changed the roads -> leave it alone
      const inZ = o => o.x >= z.x && o.x < z.x + z.w && o.y >= z.y && o.y < z.y + z.d, mine = T.objs.filter(inZ), rest = T.objs.filter(o => !inZ(o));
      const objs0 = T.objs, roads0 = T.roads; T.objs = rest; T.zones = []; T.roads = [];
      const bad = canPlace(s, 'zone', z.x, ny, 0);
      T.objs = objs0; T.zones = zs; T.roads = roads0;
      if (bad) return;
      z.y = ny; for (const o of mine) o.y += dy;
      T.roads = null; initRoads(s); T.rv = (T.rv || 0) + 1;
    } catch (e) { }
  }
  // ---------------- state ----------------
  function ensure(s) {
    if (!s.town) s.town = { objs: [], seq: 1, day: (s.clock && s.clock.day) || 1, svc: 0, low: 0, best: 0, log: [], why: {}, moved: 0, left: 0 };
    if (!s.town.zones) {
      s.town.zones = []; const z = firstZone(s); s.town.zones.push(z);
      const starters = s.town.objs.filter(o => o.k === 'cottage' && !o.paid);
      if (!s.town.objs.length) for (let i = 0; i < 4; i++) s.town.objs.push({ id: s.town.seq++, k: 'cottage', x: 0, y: 0, r: 0, n: 2, paid: 0, cw: (i * 3 + 1) % 8, cr: (i * 5 + 2) % 8, starter: 1 });
      const toMove = s.town.objs.filter(o => o.starter || (o.k === 'cottage' && !o.paid));
      for (const o of toMove) { o.x = LAY_FAR; o.y = LAY_FAR; }
      for (const o of toMove) { const L = zoneLots(s, o.k)[0]; if (L) { o.x = L.x; o.y = L.y; o.r = 0; } }
      s.town.objs = s.town.objs.filter(o => o.x !== LAY_FAR);
      s.town.best = Math.max(s.town.best || 0, pop(s));
    }
    if (!s.town.roads) initRoads(s);
    if (!s.town.m18) moveStartZone(s);
    if (s.town.objs) {
      for (const o of s.town.objs) {
        if (o.k === 'zoo' || o.k === 'shelter') {
          if (o.k === 'zoo') o.r = 0;
          if (o.k === 'zoo' && !o.bigZoo2) {
            o.bigZoo = 1; o.bigZoo2 = 1;
            if (o.x + D.zoo.w > -2 && o.x < 0) o.x -= 8;
            if (o.y + D.zoo.d > -2 && o.y < 0) o.y -= 6;
          }
          const bx = { x: o.x, y: o.y, w: D[o.k].w, d: D[o.k].d };
          s.town.objs = s.town.objs.filter(q => q === o || !D[q.k] || D[q.k].cat !== 'tree' || !overlap(bx, { x: q.x, y: q.y, w: 1, d: 1 }));
          if (s.town.roads) {
            const before = s.town.roads.length;
            s.town.roads = s.town.roads.filter(rk => { const [rx, ry] = rk.split(',').map(Number); return !(rx >= bx.x && rx < bx.x + bx.w && ry >= bx.y && ry < bx.y + bx.d); });
            if (s.town.roads.length !== before) { s.town.rv = (s.town.rv || 0) + 1; _rkey = ''; }
          }
          if (canPlace(s, o.k, o.x, o.y, 0, o.id)) {
            const p = nearFree(s, o.k, o.x, o.y, 0, o.id, 95);
            if (p) { o.x = p.x; o.y = p.y; }
          }
        }
      }
      fitShop(s);
    }
    const T = s.town; if (!T.objs) T.objs = []; if (!T.why) T.why = {}; if (!T.log) T.log = []; if (T.svc == null) T.svc = 0;
    return T;
  }
  // building levels (v1.3): shops/public buildings and houses go Lv1 -> Lv3
  const LV_MAX = 3, lvOf = o => Math.min(LV_MAX, o.lv || 1), lvMul = o => 1 + .5 * (lvOf(o) - 1); // Lv2 x1.5, Lv3 x2 happiness / residents served
  const capOf = o => D[o.k].cap + (lvOf(o) - 1) * Math.ceil(D[o.k].cap / 2); // houses: every level adds half the rooms again
  const upNeed = o => (D[o.k].need || 0) + (lvOf(o) === 1 ? 20 : 60); // residents needed for the next level
  const upCost = o => Math.round(D[o.k].cost * lvOf(o) * (D[o.k].cat === 'house' ? .8 : 1.2) / 100) * 100;
  const canUp = o => D[o.k] && (D[o.k].cat === 'civic' || D[o.k].cat === 'house') && lvOf(o) < LV_MAX;
  const houses_ = s => ((s.town && s.town.objs) || []).filter(o => D[o.k] && D[o.k].cat === 'house');
  const pop = s => houses_(s).reduce((a, o) => a + (o.n || 0), 0);
  const cap = s => houses_(s).reduce((a, o) => a + capOf(o), 0);
  const countOf = (s, k) => ((s.town && s.town.objs) || []).filter(o => o.k === k).length;
  const stageOf = (s, o) => { const d = D[o.k]; if (!d || !d.grow) return 2; const age = ((s.clock && s.clock.day) || 1) - (o.pd == null ? 1 : o.pd); return age >= d.grow[d.grow.length - 1] ? 2 : age >= d.grow[0] ? 1 : 0; };
  // the big amenities that already exist in the game: [id, happiness, residents they can serve, built?]
  const AMEN = [['park', 10, 40, s => s.park && s.park.built], ['lake', 8, 30, s => s.village && s.village.lake], ['avenue', 6, 20, s => s.village && s.village.avenue],
    ['monu', 5, 10, s => s.village && s.village.monu], ['salon', 5, 15, s => s.salon && s.salon.built], ['cafe', 6, 20, s => s.cafe && s.cafe.built],
    ['hosp', 6, 25, s => s.hosp && s.hosp.built], ['coop', 2, 5, s => s.farm && s.farm.coop]];
  function stats(s) {
    const T = s.town || { objs: [], svc: 0 }, P = pop(s), C = cap(s);
    let fac = 0, sup = TOWN_BAL.SUP0, green = 0; const facs = [];
    for (const [id, h, su, ok] of AMEN) if (ok(s)) { fac += h; sup += su; facs.push(id); }
    const per = {};
    for (const o of T.objs) {
      const d = D[o.k]; if (!d) continue;
      if (d.cat === 'tree') { const st = stageOf(s, o); green += st === 2 ? d.hap : st === 1 ? d.hap * .5 : d.hap * .2; }
      else if (d.cat === 'deco' || d.cat === 'civic') { per[o.k] = (per[o.k] || 0) + 1; if (per[o.k] <= (d.max || 99)) { fac += d.hap * lvMul(o); sup += (d.sup || 0) * lvMul(o); } }
    }
    fac = Math.min(TOWN_BAL.FAC_CAP + civicCap(T), fac); green = Math.min(TOWN_BAL.GREEN_CAP + 4 * Math.min(2, per.florist || 0), green); // 💐 florists: more room for greenery
    const crowd = P > sup ? Math.min(30, (P - sup) * TOWN_BAL.CROWD_K) : 0, svc = T.svc || 0;
    // 편의시설(fac)과 나무/꽃(green) 밸런스: 행복지수 70 이상에서는 초과 기여분이 0.2배로 점진적 증가
    const coreHap = TOWN_BAL.H0 + svc - crowd;
    const bonusHap = fac + green;
    const rawHap = coreHap + bonusHap;
    let finalHap;
    if (rawHap <= 70) {
      finalHap = rawHap;
    } else if (coreHap <= 70) {
      finalHap = 70 + (rawHap - 70) * 0.2;
    } else {
      finalHap = coreHap + bonusHap * 0.2;
    }
    const hap = Math.max(0, Math.min(100, Math.round(finalHap)));
    return { pop: P, cap: C, sup, fac, green, svc, crowd, hap, facs, best: Math.max(T.best || 0, P) };
  }
  const civicCap = T => ((T && T.objs) || []).some(o => D[o.k] && D[o.k].cat === 'civic') ? 20 : 0; // shops & public buildings can push facility happiness past the old cap
  const occFrac = h => Math.max(.35, Math.min(1, .35 + (h - 20) * .013));
  // the shop side: more residents = more (and a bit richer) customers
  const custK = s => { const P = pop(s); return Math.max(.75, Math.min(TOWN_BAL.CUST_CAP, .75 + P / 60)); };
  const maxAdd = s => Math.min(4, Math.floor(pop(s) / 40));
  const has = (s, k) => Math.min((D[k] && D[k].max) || 1, countOf(s, k));
  const pow = (s, k) => ((s.town && s.town.objs) || []).filter(o => o.k === k).slice(0, (D[k] && D[k].max) || 1).reduce((a, o) => a + lvMul(o), 0); // Lv2 = 1.5 copies' worth
  const spendK = s => { const st = stats(s); return (.9 + Math.min(.3, st.pop / 500)) * (.9 + st.hap / 500) * (1 + .02 * pow(s, 'conv') + .03 * pow(s, 'bakery') + .03 * pow(s, 'market')); }; // 🏪🥐🛒 shops nearby: people spend a bit more
  const bestPop = s => Math.max((s.town && s.town.best) || 0, pop(s));
  // happiness from how the shops treat people (pets people want, waiting, café food...)
  function mood(s, dv, why) {
    const T = s.town; if (!T) return;
    T.svc = Math.max(-20, Math.min(15, (T.svc || 0) + dv));
    if (why) T.why[why] = (T.why[why] || 0) + 1;
  }
  function ev_(s, e) { e.id = s.seq++; e.t = Date.now(); s.events.push(e); if (s.events.length > 40) s.events.splice(0, s.events.length - 40); }
  function logDay(s, txt) { const T = s.town; T.log.unshift({ d: s.clock.day, x: txt }); T.log.length = Math.min(T.log.length, 12); }
  // a new day: people move in or out, service happiness fades back toward zero, saplings grow
  function newDay(s) {
    const T = s.town, st = stats(s), hs = houses_(s), day = s.clock.day;
    const target = Math.floor(st.cap * occFrac(st.hap));
    let moved = 0, left = 0;
    if (st.pop < target) {
      let n = Math.min(target - st.pop, Math.max(1, Math.ceil(st.cap * TOWN_BAL.MOVE_IN)) + countOf(s, 'busstop') + Math.round(2 * pow(s, 'school'))); // 🏫 families move in for the school
      const open = hs.filter(o => (o.n || 0) < capOf(o)).sort((a, b) => (a.n || 0) / capOf(a) - (b.n || 0) / capOf(b));
      for (const o of open) { while (n > 0 && (o.n || 0) < capOf(o)) { o.n = (o.n || 0) + 1; n--; moved++; } if (n <= 0) break; }
    }
    T.low = st.hap < TOWN_BAL.LOW ? (T.low || 0) + 1 : 0;
    if (day > TOWN_BAL.GRACE && T.low >= TOWN_BAL.LOW_DAYS && st.pop > 4) {
      let n = Math.max(1, Math.ceil(st.pop * (TOWN_BAL.LOW - st.hap) / 100 * .6 * (has(s, 'fire') ? .5 : 1))); // 🚒 a fire station makes people feel safe: half as many leave
      const full = hs.filter(o => (o.n || 0) > 0).sort((a, b) => (b.n || 0) - (a.n || 0));
      for (const o of full) { while (n > 0 && o.n > 0 && st.pop - left > 4) { o.n--; n--; left++; } if (n <= 0) break; }
    }
    T.svc = Math.round((T.svc || 0) * .6 * 10) / 10; // yesterday's service fades T.why = {}; T.day = day;
    T.best = Math.max(T.best || 0, pop(s));
    if (moved) logDay(s, '+' + moved); if (left) logDay(s, '-' + left);
    if (moved || left) ev_(s, { k: 'townDay', moved, left, hap: st.hap });
    checkMilestones(s);
  }
  function checkMilestones(s) {
    const T = s.town, b = bestPop(s); T.ms = T.ms || 0;
    for (const m of TOWN_MS) if (m.pop > T.ms && b >= m.pop) { T.ms = m.pop; ev_(s, { k: 'townMs', pop: m.pop }); }
  }
  // grace days in a row with low happiness before anybody leaves is TOWN_BAL.LOW_DAYS; the first TOWN_BAL.GRACE days nobody leaves at all
  function tick(s, dt) {
    const T = ensure(s);
    if (T.day !== s.clock.day) newDay(s);
    // the shop grew over a house? move that house to the nearest free spot (host only: guests never tick)
    fitShop(s);
  }
  // the shop or big building grew: roads and trees/flowers under the expanded building naturally disappear (자연스럽게 삭제), houses/big lots move to nearest free spot
  function clearBuildingOverlaps(s) {
    const T = s && s.town; if (!T) return;
    const inBuildingTile = (x, y) => inActualBuilding(s, x, y);
    // 길 삭제 (실제 건물 내부에 들어간 타일만 제거)
    if (T.roads) {
      const n0 = T.roads.length;
      T.roads = T.roads.filter(k => {
        const [x, y] = k.split(',').map(Number);
        const drop = inBuildingTile(x, y);
        if (drop && T.rstyle) delete T.rstyle[k];
        return !drop;
      });
      if (T.roads.length !== n0) { T.rv = (T.rv || 0) + 1; _rkey = ''; }
    }
    // 건물 확장으로 겹치게 된 나무, 꽃, 작은 장식물은 자연스럽게 사라짐
    if (T.objs) {
      T.objs = T.objs.filter(o => {
        const d = D[o.k];
        if (d && (d.cat === 'tree' || (d.cat === 'deco' && d.w === 1 && d.d === 1))) {
          if (inBuildingTile(o.x, o.y)) return false; // disappear cleanly
        }
        return true;
      });
    }
  }
  function fitShop(s) {
    const T = s && s.town; if (!T) return;
    const key = Wd(s) + 'x' + Hd(s) + ':' + ((s.cafe && s.cafe.lv) || 0) + ':' + ((s.hosp && s.hosp.lv) || 0);
    if (T.fitKey !== key) {
      T.fitKey = key;
      clearBuildingOverlaps(s);
      for (const k of TOWN_BIG) {
        const L = LAY(k, s);
        if (L && !D[k].noPlace && canPlace(s, k, L.x, L.y, 0, k)) {
          const p = nearFree(s, k, L.x, L.y, 0, k, 70);
          if (p) { L.x = p.x; L.y = p.y; }
        }
      }
      for (const o of T.objs) {
        if (['tTaken', 'tOut'].includes(canPlace(s, o.k, o.x, o.y, o.r, o.id))) {
          const p = nearFree(s, o.k, o.x, o.y, o.r, o.id);
          if (p) { o.x = p.x; o.y = p.y; }
        }
      }
    }
  }
  function nearFree(s, k, x0, y0, r, ignore, maxR) {
    for (let R = 1; R < (maxR || 40); R++) for (let dx = -R; dx <= R; dx++) for (const dy of [-R, R]) { for (const [x, y] of [[x0 + dx, y0 + dy], [x0 + dy, y0 + dx]]) if (!canPlace(s, k, x, y, r, ignore)) return { x, y }; }
    return null;
  }
  // which house a customer walks out of (weighted by residents); returns the door tile
  function doorOf(o) { return rotPt(o, 1, 3, 5, 5); }
  function pickHome(s) {
    const hs = houses_(s).filter(o => o.n > 0), tot = hs.reduce((a, o) => a + o.n, 0); if (!tot) return null;
    let r = Math.random() * tot; for (const o of hs) { r -= o.n; if (r <= 0) return o; } return hs[0];
  }
  const kindCost = (s, k) => { const d = D[k], n = ((s.town && s.town.objs) || []).filter(o => o.k === k && o.paid).length; return Math.round(d.cost * (1 + TOWN_BAL.COST_STEP * n) / 50) * 50; }; // the free starter houses don't count
  const unlockedK = (s, k) => bestPop(s) >= (D[k].need || 0);
  const bigBuilt = (s, k) => k === 'cafe' ? !!(s.cafe && s.cafe.built) : k === 'hosp' ? !!(s.hosp && s.hosp.built) : k === 'salon' ? !!(s.salon && s.salon.built) : k === 'park' ? !!(s.park && s.park.built)
    : (k === 'lake' || k === 'monu' || k === 'avenue') ? !!(s.village && s.village[k]) : !!(s.lay && s.lay[k]);
  function applyTown(s, a, by) {
    if (a.t === 'tbig') {
      const d = D[a.k]; if (!d || d.cat !== 'big' || bigBuilt(s, a.k)) return { err: 'gone' };
      if (d.rep && repTier(s.rep || 0) < d.rep) return { err: 'tNeedRep', p: { t: (REP_TIERS[d.rep] || {}).ic || '⭐' } };
      s.lay = s.lay || {};
      if (!d.noPlace) { const e = canPlace(s, a.k, a.x, a.y, 0); if (e) return { err: e }; }
      if (d.act) {
        if (!d.noPlace) s.lay[a.k] = { x: a.x, y: a.y };
        const r = G.apply(s, { t: d.act, k: a.k, text: a.text, looks: a.looks, lang: a.lang }, by);
        if (!r || r.err) { if (!d.noPlace) delete s.lay[a.k]; return r || { err: 'gone' }; }
        if (typeof G !== 'undefined' && G.addXpPublic) G.addXpPublic(s, 20);
        return r;
      }
      if (s.coins < d.cost) return { err: 'notEnough' };
      s.coins -= d.cost; s.lay[a.k] = { x: a.x, y: a.y };
      if (a.k === 'farm' && typeof FARM !== 'undefined' && FARM.ensure) FARM.ensure(s);
      if (typeof G !== 'undefined' && G.addXpPublic) G.addXpPublic(s, 10);
      return { ok: 1, fx: 'coin', msg: 'tBigBuilt_' + a.k };
    }
    if (a.t === 'tbigmove') {
      const d = D[a.k], L = s.lay && s.lay[a.k]; if (!d || !L) return { err: 'gone' };
      if (d.live && s.clock && s.clock.ph === 'open') return { err: 'tMoveClosed' };
      const e = canPlace(s, a.k, a.x, a.y, 0, a.k); if (e) return { err: e };
      L.x = a.x; L.y = a.y; return { ok: 1, msg: 'tMoved' };
    }
    if (a.t === 'tbuild') {
      const d = D[a.k]; if (!d) return { err: 'gone' }; ensure(s);
      if (!unlockedK(s, a.k)) return { err: 'tLocked', p: { n: d.need } };
      const e = canPlace(s, a.k, a.x, a.y, normR(a.k, a.r)); if (e) return { err: e };
      const cost = kindCost(s, a.k); if (s.coins < cost) return { err: 'notEnough' };
      s.coins -= cost;
      const o = { id: s.town.seq++, k: a.k, x: a.x, y: a.y, r: normR(a.k, a.r), paid: cost };
      if (a.k === 'zoo') o.bigZoo = 1;
      if (d.cat === 'house') { o.n = Math.min(d.cap, Math.floor(d.cap * occFrac(stats(s).hap) * .5)); o.cw = Math.floor(Math.random() * 8); o.cr = Math.floor(Math.random() * 8); }
      if (d.cat === 'tree') o.pd = s.clock.day;
      if (d.cat === 'civic') {
        const bx = { x: o.x, y: o.y, w: fpOf(o.k, o.r).w, d: fpOf(o.k, o.r).d };
        s.town.objs = s.town.objs.filter(q => !D[q.k] || D[q.k].cat !== 'tree' || !overlap(bx, { x: q.x, y: q.y, w: 1, d: 1 }));
      }
      s.town.objs.push(o); s.town.best = Math.max(s.town.best || 0, pop(s)); checkMilestones(s);
      if (typeof G !== 'undefined' && G.addXpPublic) G.addXpPublic(s, d.cat === 'house' ? 5 : d.cat === 'deco' ? 2 : 0);
      return { ok: 1, fx: 'coin', msg: d.cat === 'house' ? (o.n ? 'tBuiltHouse' : 'tBuiltHouse0') : d.cat === 'tree' ? 'tPlanted' : 'tBuilt', p: { n: o.n || 0 } };
    }
    if (a.t === 'tmove') {
      const o = obj(s, a.id); if (!o) return { err: 'gone' };
      const e = canPlace(s, o.k, a.x, a.y, normR(o.k, a.r), o.id); if (e) return { err: e };
      o.x = a.x; o.y = a.y; o.r = normR(o.k, a.r);
      if (D[o.k] && D[o.k].cat === 'civic') {
        const bx = { x: o.x, y: o.y, w: fpOf(o.k, o.r).w, d: fpOf(o.k, o.r).d };
        s.town.objs = s.town.objs.filter(q => q === o || !D[q.k] || D[q.k].cat !== 'tree' || !overlap(bx, { x: q.x, y: q.y, w: 1, d: 1 }));
      }
      return { ok: 1, msg: 'tMoved' };
    }
    if (a.t === 'troad') { // pave (on) or erase a list of tiles
      ensure(s); const T = s.town, R = roadSet(s), tiles = (a.tiles || []).slice(0, 300).map(p => (p[0] | 0) + ',' + (p[1] | 0));
      T.rstyle = T.rstyle || {};
      const style = (ROAD_TYPES.find(q => q.id === a.style) ? a.style : 'cobble');
      const rDef = ROAD_TYPES.find(q => q.id === style) || ROAD_TYPES[0];
      if (a.on) {
        const add = [...new Set(tiles)].filter(k => (!R.has(k) || (T.rstyle[k] || 'cobble') !== style) && roadTileOk(s, ...k.split(',').map(Number)));
        if (!add.length) return { err: 'tRoadNone' };
        const cost = add.length * rDef.cost;
        if (s.coins < cost) return { err: 'notEnough' };
        s.coins -= cost;
        for (const k of add) {
          if (!R.has(k)) T.roads.push(k);
          T.rstyle[k] = style;
        }
        T.rv = (T.rv || 0) + 1; _rkey = '';
        return { ok: 1, fx: 'coin', msg: 'tRoadPaved', p: { n: add.length, c: cost } };
      }
      const del = new Set(tiles.filter(k => R.has(k))); if (!del.size) return { err: 'tRoadNone' };
      T.roads = T.roads.filter(k => !del.has(k));
      for (const k of del) delete T.rstyle[k];
      T.rv = (T.rv || 0) + 1; _rkey = '';
      return { ok: 1, msg: 'tRoadErased', p: { n: del.size } };
    }
    if (a.t === 'tzone') {
      ensure(s); const r = normR('zone', a.r), f = fpOf('zone', r);
      const e = canPlace(s, 'zone', a.x, a.y, r); if (e) return { err: e };
      const cost = zoneCost(s); if (s.coins < cost) return { err: 'notEnough' };
      s.coins -= cost; s.town.zones.push({ x: a.x, y: a.y, w: f.w, d: f.d, r });
      return { ok: 1, fx: 'coin', msg: 'tZoneBuilt' };
    }
    if (a.t === 'tup') {
      const o = obj(s, a.id); if (!o || !canUp(o)) return { err: 'gone' };
      if (bestPop(s) < upNeed(o)) return { err: 'tLocked', p: { n: upNeed(o) } };
      const cost = upCost(o); if (s.coins < cost) return { err: 'notEnough' };
      s.coins -= cost; o.paid = (o.paid || 0) + cost; o.lv = lvOf(o) + 1;
      if (typeof G !== 'undefined' && G.addXpPublic) G.addXpPublic(s, 5 * o.lv);
      return { ok: 1, fx: 'coin', msg: 'tUpgraded', p: { n: o.lv } };
    }
    if (a.t === 'tdemo') {
      const o = obj(s, a.id); if (!o) return { err: 'gone' };
      const back = Math.floor((o.paid || 0) / 2); s.coins += back;
      s.town.objs = s.town.objs.filter(q => q !== o); return { ok: 1, msg: 'tDemolished', p: { c: back } };
    }
    return undefined;
  }
  // tiles that nobody can walk through (house walls, tree trunks, fountains...)
  function houseSolid(set) {
    if (typeof S === 'undefined' || !S || !S.town) return;
    for (const o of S.town.objs) {
      const d = D[o.k]; if (!d) continue;
      if (d.cat === 'house') { for (let u = 0; u < 4; u++) for (let v = 0; v < 3; v++) { const p = rotPt(o, u, v, 5, 5); set.add(p.x + ',' + p.y); } }
      else if (o.k === 'zoo') {
        // Grand Safari Zoo: left/right entrance kiosks and fountain core are solid!
        for (let u = 0; u < d.w; u++) for (let v = 0; v < d.d; v++) {
          // Left Ticket Kiosk (u: 9..11, v: 18..21) & Right Souvenir Kiosk (u: 15..17, v: 18..21) are strictly solid buildings!
          if (v >= d.d - 4 && ((u >= 9 && u <= 11) || (u >= 15 && u <= 17))) {
            set.add((o.x + u) + ',' + (o.y + v));
            continue;
          }
          // Fountain center stone pillar is solid (User Request 3: Character walks cleanly around fountain)
          if (u >= 12 && u <= 14 && v >= 9 && v <= 11) {
            set.add((o.x + u) + ',' + (o.y + v));
            continue;
          }
          // Walkable avenues: central promenade walkway (u: 12..14), cross avenues (v: 7..8, 13..14)
          const onWalk = (u >= 12 && u <= 14) || (v >= 7 && v <= 8) || (v >= 13 && v <= 14);
          if (onWalk) continue;
          set.add((o.x + u) + ',' + (o.y + v));
        }
      }
      else if (d.cat === 'civic') { const W0 = d.w, D0 = d.open ? d.d : d.d - 1; for (let u = 0; u < W0; u++) for (let v = 0; v < D0; v++) { if (o.k === 'gate' && u > 0 && u < W0 - 1) continue; const p = rotPt(o, u, v, d.w, d.d); set.add(p.x + ',' + p.y); } }
      else if (d.solid) { const f = fpOf(o.k, o.r); for (let u = 0; u < f.w; u++) for (let v = 0; v < f.d; v++) set.add((o.x + u) + ',' + (o.y + v)); }
    }
  }
  // what the world draws: houses in the old format ({x, y, v kind index, cw, cr}) plus trees and small facilities
  function houses() { return houses_(typeof S !== 'undefined' && S ? S : {}).map(o => ({ x: o.x, y: o.y, v: KINDS.indexOf(o.k), cw: o.cw || 0, cr: o.cr || 0, r: o.r, id: o.id, o })); }
  // v10.0: many kinds of homes, smaller and varied: tiny cottage, family house, 2-storey house, villa (apartment block),
  // house with a big yard (dog house, clothesline), gambrel-roof farmhouse, townhouse row, round-tower cottage
  // Soft & Warm Cozy Storybook Pastel Palettes
  const WALLS = ['#fdf6ea', '#fdf2f4', '#f4f8fe', '#fbf5e6', '#edf4ea', '#f8f1e9', '#fdf9f2', '#f5edf8'];
  const ROOFS = ['#d47862', '#688eb2', '#7ba689', '#cb7a8b', '#8a6e5a', '#deb35b', '#6b788a', '#967ec7'];
  const KINDS = ['cottage', 'family', 'twostory', 'villa', 'yard', 'barn', 'row', 'tower'];
  const sh = (col, k) => ART.shade ? ART.shade(col, k) : col;
  const isLit = () => S && S.clock && (S.clock.m >= 1080 || S.clock.m < 360);
  // under ROT a box keeps its shape: turn its rectangle, then draw the faces we really see (south / east) -- and give the back walls windows
  const turned = (x0, y0, w, d) => ({ x: 2 * ROT.ox + ROT.W - (x0 + w), y: 2 * ROT.oy + ROT.D - (y0 + d) });
  function blk(c, x0, y0, w, d, z0, h, col) {
    if (!ROT) return blk_(c, x0, y0, w, d, z0, h, col);
    const R = ROT, p = turned(x0, y0, w, d); ROT = null;
    try { blk_(c, p.x, p.y, w, d, z0, h, col); if (h >= 14 && z0 < 6 && w >= .7 && d >= .6) backWins(c, p.x, p.y, w, d, z0, h, col); } finally { ROT = R; }
  }
  function backWins(c, x, y, w, d, z0, h, col) { // the back of a building: rows of plain windows on the two faces we see
    const fr = sh(col, -.35), lit = isLit();
    for (let z = z0 + 5; z + 8 <= z0 + h - 3; z += 13) {
      const n = Math.max(1, Math.floor(w / .75)); for (let i = 0; i < n; i++) { const ww = Math.min(.42, (w - .3) / n - .12); if (ww > .12) winS(c, x + .15 + i * (w - .3) / n, y + d, z, ww, 8, lit && (i + z) % 3 === 0, fr); }
      const m = Math.max(1, Math.floor(d / .8)); for (let i = 0; i < m; i++) { const ww = Math.min(.45, (d - .3) / m - .12); if (ww > .12) winE(c, x + w, y + .15 + i * (d - .3) / m, z, ww, 8, lit && (i + z) % 2 === 0, fr); }
    }
  }
  const roofTurn = fn => function (c, x0, y0, w, d, ...rest) { if (!ROT) return fn(c, x0, y0, w, d, ...rest); const R = ROT, p = turned(x0, y0, w, d); ROT = null; try { return fn(c, p.x, p.y, w, d, ...rest); } finally { ROT = R; } };
  function blk_(c, x0, y0, w, d, z0, h, col) { // a box: the two faces we see (south y1, east x1) + the top
    const x1 = x0 + w, y1 = y0 + d;
    // Ground contact shadow if on ground level
    if (z0 === 0) {
      poly(c, [Q(x0 - .06, y0 - .06), Q(x1 + .08, y0 - .06), Q(x1 + .08, y1 + .08), Q(x0 - .06, y1 + .08)], 'rgba(30,20,10,.25)');
    }
    const southFace = [Q(x0, y1, z0 + h), Q(x1, y1, z0 + h), Q(x1, y1, z0), Q(x0, y1, z0)];
    const eastFace = [Q(x1, y0, z0 + h), Q(x1, y1, z0 + h), Q(x1, y1, z0), Q(x1, y0, z0)];
    const topFace = [Q(x0, y0, z0 + h), Q(x1, y0, z0 + h), Q(x1, y1, z0 + h), Q(x0, y1, z0 + h)];
    poly(c, southFace, col, ART.OUT, 1);
    poly(c, eastFace, sh(col, -.15), ART.OUT, 1);
    poly(c, topFace, sh(col, .08), ART.OUT, 1);
    // Stone foundation base for buildings
    if (z0 === 0 && h >= 14) {
      const bh = Math.min(6, h * .25);
      poly(c, [Q(x0, y1, bh), Q(x1, y1, bh), Q(x1, y1, 0), Q(x0, y1, 0)], '#a89884', ART.OUT, .8);
      poly(c, [Q(x1, y0, bh), Q(x1, y1, bh), Q(x1, y1, 0), Q(x1, y0, 0)], '#8e806e', ART.OUT, .8);
      // Foundation top bevel line
      const f1 = Q(x0, y1, bh), f2 = Q(x1, y1, bh), f3 = Q(x1, y0, bh);
      c.beginPath(); c.moveTo(f1[0], f1[1]); c.lineTo(f2[0], f2[1]); c.lineTo(f3[0], f3[1]);
      c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 1; c.stroke();
    }
    // Top front edge highlight
    const e1 = Q(x0, y1, z0 + h), e2 = Q(x1, y1, z0 + h), e3 = Q(x1, y0, z0 + h);
    c.beginPath(); c.moveTo(e1[0], e1[1]); c.lineTo(e2[0], e2[1]); c.lineTo(e3[0], e3[1]);
    c.strokeStyle = 'rgba(255,255,255,.28)'; c.lineWidth = 1.2; c.stroke();
    // Vertical corner edge highlight
    const c1 = Q(x1, y1, z0 + h), c2 = Q(x1, y1, z0);
    c.beginPath(); c.moveTo(c1[0], c1[1]); c.lineTo(c2[0], c2[1]);
    c.strokeStyle = 'rgba(255,255,255,.2)'; c.lineWidth = 1; c.stroke();
  }
  function winS(c, x, y, z, w, h, lit, fr, opts) {
    if (ROT) return;
    opts = opts || {};
    // Shutters (open on left and right)
    if (opts.shutters) {
      const sw = .22, shCol = opts.shutterCol || '#5a7862';
      // Left shutter
      poly(c, [Q(x - sw - .02, y + .01, z + h + .5), Q(x - .02, y + .01, z + h + .5), Q(x - .02, y + .01, z - .5), Q(x - sw - .02, y + .01, z - .5)], shCol, ART.OUT, .8);
      // Right shutter
      poly(c, [Q(x + w + .02, y + .01, z + h + .5), Q(x + w + sw + .02, y + .01, z + h + .5), Q(x + w + sw + .02, y + .01, z - .5), Q(x + w + .02, y + .01, z - .5)], shCol, ART.OUT, .8);
      // Shutter louver lines
      for (const sz of [z + h * .3, z + h * .7]) {
        const l0 = Q(x - sw - .01, y + .01, sz), l1 = Q(x - .03, y + .01, sz);
        c.beginPath(); c.moveTo(l0[0], l0[1]); c.lineTo(l1[0], l1[1]); c.strokeStyle = 'rgba(0,0,0,.3)'; c.lineWidth = .7; c.stroke();
        const r0 = Q(x + w + .03, y + .01, sz), r1 = Q(x + w + sw + .01, y + .01, sz);
        c.beginPath(); c.moveTo(r0[0], r0[1]); c.lineTo(r1[0], r1[1]); c.strokeStyle = 'rgba(0,0,0,.3)'; c.lineWidth = .7; c.stroke();
      }
    }
    // Outer frame with molded trim
    poly(c, [Q(x - .04, y, z + h + 1.2), Q(x + w + .04, y, z + h + 1.2), Q(x + w + .04, y, z - 1), Q(x - .04, y, z - 1)], fr || '#ffffff', ART.OUT, 1);
    // Glass pane with soft glow/sky gradient
    const pane = [Q(x, y, z + h), Q(x + w, y, z + h), Q(x + w, y, z), Q(x, y, z)];
    const p0 = Q(x, y, z + h), p1 = Q(x + w, y, z);
    const g = c.createLinearGradient(p0[0], p0[1], p1[0], p1[1]);
    if (lit) {
      g.addColorStop(0, '#fffbe0'); g.addColorStop(0.5, '#ffd255'); g.addColorStop(1, '#ff9e28');
    } else {
      g.addColorStop(0, '#e4f4fb'); g.addColorStop(0.4, '#a2d4ea'); g.addColorStop(1, '#6eaec8');
    }
    poly(c, pane, g, 'rgba(40,25,15,.55)', .8);
    // Window mullions (crossbars)
    const midX = x + w / 2, midZ = z + h / 2;
    const v0 = Q(midX, y, z + h), v1 = Q(midX, y, z);
    const h0 = Q(x, y, midZ), h1 = Q(x + w, y, midZ);
    c.beginPath(); c.moveTo(v0[0], v0[1]); c.lineTo(v1[0], v1[1]); c.moveTo(h0[0], h0[1]); c.lineTo(h1[0], h1[1]);
    c.strokeStyle = fr || '#ffffff'; c.lineWidth = 1; c.stroke();
    // Glass glint reflection streak
    if (!lit) {
      const g0 = Q(x + w * .2, y, z + h * .85), g1 = Q(x + w * .7, y, z + h * .25);
      c.beginPath(); c.moveTo(g0[0], g0[1]); c.lineTo(g1[0], g1[1]); c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 1.4; c.stroke();
    }
    // Window sill
    poly(c, [Q(x - .06, y + .06, z), Q(x + w + .06, y + .06, z), Q(x + w + .06, y, z - 1.8), Q(x - .06, y, z - 1.8)], '#e4dacf', ART.OUT, .8);
    // Flower Planter Box under window
    if (opts.flowerBox) {
      const fbx0 = x - .02, fbx1 = x + w + .02, fby = y + .08, fbz = z - 1.5, fbh = 3.2;
      // Planter wooden trough
      poly(c, [Q(fbx0, fby, fbz), Q(fbx1, fby, fbz), Q(fbx1, fby, fbz - fbh), Q(fbx0, fby, fbz - fbh)], '#7a4e2d', ART.OUT, .8);
      // Lush green foliage
      for (let i = 0; i < 4; i++) {
        const fx = fbx0 + (i + .5) * (fbx1 - fbx0) / 4, q = Q(fx, fby + .02, fbz + 1.2);
        ART.ell(c, q[0], q[1], 4.2, 3, i % 2 ? '#4da23e' : '#5fb84d');
      }
      // Blooming colorful flower blossoms
      const fcols = ['#ff6b8b', '#ffd152', '#ff85a2', '#ffffff', '#b58eff'];
      for (let i = 0; i < 5; i++) {
        const fx = fbx0 + (i + .4) * (fbx1 - fbx0) / 5, q = Q(fx, fby + .03, fbz + 1.6);
        ART.ell(c, q[0], q[1], 2, 1.8, fcols[i % fcols.length]);
      }
      // Trailing ivy leaves
      for (const ix of [fbx0 + .06, fbx1 - .06]) {
        const q = Q(ix, fby + .02, fbz - fbh - 1);
        ART.ell(c, q[0], q[1], 2.2, 2.8, '#438e36');
      }
    }
  }
  function winE(c, x, y, z, w, h, lit, fr) {
    if (ROT) return;
    poly(c, [Q(x, y - .04, z + h + 1.2), Q(x, y + w + .04, z + h + 1.2), Q(x, y + w + .04, z - 1), Q(x, y - .04, z - 1)], fr || '#e8e2d8', ART.OUT, 1);
    const pane = [Q(x, y, z + h), Q(x, y + w, z + h), Q(x, y + w, z), Q(x, y, z)];
    poly(c, pane, lit ? '#ffcf52' : '#6b9db8', 'rgba(40,25,15,.55)', .8);
    // Crossbars
    const midY = y + w / 2, midZ = z + h / 2;
    const v0 = Q(x, midY, z + h), v1 = Q(x, midY, z);
    const h0 = Q(x, y, midZ), h1 = Q(x, y + w, midZ);
    c.beginPath(); c.moveTo(v0[0], v0[1]); c.lineTo(v1[0], v1[1]); c.moveTo(h0[0], h0[1]); c.lineTo(h1[0], h1[1]);
    c.strokeStyle = fr || '#e8e2d8'; c.lineWidth = 1; c.stroke();
    // Sill
    poly(c, [Q(x + .06, y - .05, z), Q(x + .06, y + w + .05, z), Q(x, y + w + .05, z - 1.6), Q(x, y - .05, z - 1.6)], '#dcd2c4', ART.OUT, .8);
  }

  // --- Roofs with Scalloped / Stepped Shingles, Eaves Overhang & Drop Shadows ---
  const gable = roofTurn(gable_), hip = roofTurn(hip_), gambrel = roofTurn(gambrel_);

  function gable_(c, x0, y0, w, d, z, rh, col, wall) {
    const x1 = x0 + w, y1 = y0 + d, ym = (y0 + y1) / 2, e = .24;
    // Under-eaves cast drop shadow onto south wall and east wall
    poly(c, [Q(x0, y1, z), Q(x1, y1, z), Q(x1, y1, z - 4.5), Q(x0, y1, z - 4.5)], 'rgba(25,12,6,.38)');
    poly(c, [Q(x1, y0, z), Q(x1, y1, z), Q(x1, y1, z - 3.5), Q(x1, y0, z - 3.5)], 'rgba(20,10,5,.3)');

    // North slope (shadowed back side)
    poly(c, [Q(x0 - e, y0 - e, z), Q(x1 + e, y0 - e, z), Q(x1 + e, ym, z + rh), Q(x0 - e, ym, z + rh)], sh(col, -.26), ART.OUT, 1.2);
    // East wall gable peak with decorative beam trim
    poly(c, [Q(x1, y0, z), Q(x1, y1, z), Q(x1, ym, z + rh)], sh(wall, -.08), ART.OUT, 1.2);
    // Gable timber cross-strut
    const gPeak = Q(x1 + .01, ym, z + rh), gMid = Q(x1 + .01, ym, z);
    c.beginPath(); c.moveTo(gPeak[0], gPeak[1]); c.lineTo(gMid[0], gMid[1]); c.strokeStyle = '#6a452a'; c.lineWidth = 1.8; c.stroke();

    // South slope (lit main side)
    poly(c, [Q(x0 - e, ym, z + rh), Q(x1 + e, ym, z + rh), Q(x1 + e, y1 + e, z), Q(x0 - e, y1 + e, z)], col, ART.OUT, 1.3);

    // Multi-tier scalloped / stepped shingle rows on south slope
    const rows = 5;
    for (let r = 1; r < rows; r++) {
      const f = r / rows, zz = z + rh * (1 - f), yy = (y1 + e) * f + ym * (1 - f);
      const a = Q(x0 - e + .02, yy, zz), b = Q(x1 + e - .02, yy, zz);
      // Dark under-shingle shadow groove
      c.beginPath(); c.moveTo(a[0], a[1] + 1); c.lineTo(b[0], b[1] + 1);
      c.strokeStyle = 'rgba(30,12,5,.45)'; c.lineWidth = 1.4; c.stroke();
      // Sunlit specular rim on shingle ridge
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]);
      c.strokeStyle = 'rgba(255,255,255,.32)'; c.lineWidth = 1.2; c.stroke();
      // Vertical shingle tabs
      const tabs = 6;
      for (let k = 1; k < tabs; k++) {
        const u = k / tabs, tx = (x0 - e) * (1 - u) + (x1 + e) * u;
        const t0 = Q(tx, yy, zz), t1 = Q(tx, yy - .08, zz + rh / rows * .6);
        c.beginPath(); c.moveTo(t0[0], t0[1]); c.lineTo(t1[0], t1[1]);
        c.strokeStyle = 'rgba(30,12,5,.3)'; c.lineWidth = .9; c.stroke();
      }
    }
    // Carved bargeboards (fascia trim) along the south and east eave edges
    const e0 = Q(x0 - e, y1 + e, z), e1 = Q(x1 + e, y1 + e, z);
    c.beginPath(); c.moveTo(e0[0], e0[1]); c.lineTo(e1[0], e1[1]);
    c.strokeStyle = '#ffffff'; c.lineWidth = 2; c.stroke();
    const gTop = Q(x1 + e, ym, z + rh), gBot = Q(x1 + e, y1 + e, z);
    c.beginPath(); c.moveTo(gTop[0], gTop[1]); c.lineTo(gBot[0], gBot[1]);
    c.strokeStyle = '#ffffff'; c.lineWidth = 2; c.stroke();

    // Top ridge beam with round cap tiles
    const r0 = Q(x0 - e, ym, z + rh), r1 = Q(x1 + e, ym, z + rh);
    c.beginPath(); c.moveTo(r0[0], r0[1]); c.lineTo(r1[0], r1[1]);
    c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 2.2; c.stroke();
    // Ridge end finials
    ART.ell(c, r0[0], r0[1] - 2, 2.5, 3.5, '#ffffff', ART.OUT, .8);
    ART.ell(c, r1[0], r1[1] - 2, 2.5, 3.5, '#ffffff', ART.OUT, .8);
  }

  function hip_(c, x0, y0, w, d, z, rh, col) {
    const x1 = x0 + w, y1 = y0 + d, e = .22;
    const a = Q(x0 + w * .32, (y0 + y1) / 2, z + rh), b = Q(x0 + w * .68, (y0 + y1) / 2, z + rh);
    // Under-eave shadow
    poly(c, [Q(x0, y1, z), Q(x1, y1, z), Q(x1, y1, z - 4.5), Q(x0, y1, z - 4.5)], 'rgba(25,12,6,.38)');
    poly(c, [Q(x1, y0, z), Q(x1, y1, z), Q(x1, y1, z - 3.5), Q(x1, y0, z - 3.5)], 'rgba(20,10,5,.3)');

    poly(c, [Q(x0 - e, y0 - e, z), Q(x1 + e, y0 - e, z), b, a], sh(col, -.24), ART.OUT, 1.2);
    poly(c, [Q(x1 + e, y0 - e, z), Q(x1 + e, y1 + e, z), b], sh(col, -.12), ART.OUT, 1.2);
    poly(c, [Q(x0 - e, y1 + e, z), Q(x1 + e, y1 + e, z), b, a], col, ART.OUT, 1.3);

    // Shingle rows on south slope
    const rows = 4;
    for (let r = 1; r < rows; r++) {
      const f = r / rows, zz = z + rh * (1 - f);
      const a0 = Q(x0 - e + w * .32 * (1 - f), (y1 + e) * f + (y0 + y1) / 2 * (1 - f), zz);
      const b0 = Q(x1 + e - w * .32 * (1 - f), (y1 + e) * f + (y0 + y1) / 2 * (1 - f), zz);
      c.beginPath(); c.moveTo(a0[0], a0[1]); c.lineTo(b0[0], b0[1]);
      c.strokeStyle = 'rgba(255,255,255,.32)'; c.lineWidth = 1.2; c.stroke();
    }
    // Ridge beam highlight
    c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]);
    c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 2.2; c.stroke();
  }

  function gambrel_(c, x0, y0, w, d, z, rh, col, wall) {
    const x1 = x0 + w, y1 = y0 + d, ym = (y0 + y1) / 2, q1 = y0 + d * .2, q2 = y1 - d * .2, e = .2;
    poly(c, [Q(x0 - e, ym, z + rh), Q(x1 + e, ym, z + rh), Q(x1 + e, q2, z + rh * .7), Q(x0 - e, q2, z + rh * .7)], sh(col, .08), ART.OUT, 1.2);
    poly(c, [Q(x0 - e, q2, z + rh * .7), Q(x1 + e, q2, z + rh * .7), Q(x1 + e, y1 + e, z), Q(x0 - e, y1 + e, z)], col, ART.OUT, 1.2);
    poly(c, [Q(x1, y0, z), Q(x1, q1, z + rh * .7), Q(x1, ym, z + rh), Q(x1, q2, z + rh * .7), Q(x1, y1, z)], sh(wall, -.08), ART.OUT, 1.2);
    // Eaves trim
    const e0 = Q(x0 - e, y1 + e, z), e1 = Q(x1 + e, y1 + e, z);
    c.beginPath(); c.moveTo(e0[0], e0[1]); c.lineTo(e1[0], e1[1]); c.strokeStyle = '#ffffff'; c.lineWidth = 1.8; c.stroke();
  }

  // --- Chimney with Ashlar Stone Bricks & Translucent Smoke ---
  function smoke(c, x, y, z, T, s) {
    for (let i = 0; i < 4; i++) {
      const k = (T * .3 + i / 4 + s * .13) % 1, q = Q(x, y, z);
      const drift = Math.sin(T * 1.5 + i) * 3 + k * 8, rise = k * 26;
      c.globalAlpha = .55 * (1 - k);
      ART.ell(c, q[0] + drift, q[1] - 7 - rise, 3.5 + k * 5, 2.8 + k * 4, '#ffffff');
      ART.ell(c, q[0] + drift - 1, q[1] - 8 - rise, 1.8 + k * 2, 1.4 + k * 2, 'rgba(255,255,255,.7)');
    }
    c.globalAlpha = 1;
  }
  function chimney(c, x, y, z, T, s) {
    const q = Q(x, y, z);
    // Stone chimney body
    c.fillStyle = '#9e5a48'; c.fillRect(q[0] - 3.5, q[1] - 6, 7, 13);
    c.strokeStyle = ART.OUT; c.lineWidth = .9; c.strokeRect(q[0] - 3.5, q[1] - 6, 7, 13);
    // Brick mortar lines
    c.strokeStyle = 'rgba(255,255,255,.3)'; c.lineWidth = .7;
    for (const dy of [-3, 1, 5]) { c.beginPath(); c.moveTo(q[0] - 3, q[1] + dy); c.lineTo(q[0] + 3, q[1] + dy); c.stroke(); }
    // Stepped stone cap & terracotta chimney pot
    c.fillStyle = '#b8a694'; c.fillRect(q[0] - 4.5, q[1] - 8, 9, 2.5);
    c.fillStyle = '#7a3828'; c.fillRect(q[0] - 2, q[1] - 11, 4, 3.5);
    c.strokeStyle = ART.OUT; c.lineWidth = .8; c.strokeRect(q[0] - 2, q[1] - 11, 4, 3.5);
    smoke(c, x, y, z + 8, T, s);
  }

  // --- Cozy Wooden Door with Porch Hood, Step & Lantern ---
  function door(c, x, y, h, col, opts) {
    if (ROT) return;
    opts = opts || {};
    const dw = .48, p0 = Q(x, y, h), p1 = Q(x + dw, y, h), p2 = Q(x + dw, y, 0), p3 = Q(x, y, 0);
    // Entrance stone step / threshold
    poly(c, [Q(x - .05, y + .14, 0), Q(x + dw + .05, y + .14, 0), Q(x + dw + .05, y, 0), Q(x - .05, y, 0)], '#c9c0b5', ART.OUT, .8);
    // Door frame
    poly(c, [Q(x - .03, y, h + 1.2), Q(x + dw + .03, y, h + 1.2), Q(x + dw + .03, y, 0), Q(x - .03, y, 0)], '#ffffff', ART.OUT, .9);
    // Wooden door panel
    poly(c, [p0, p1, p2, p3], col || '#7a4a2c', ART.OUT, 1);
    // Vertical wood plank grooves
    for (const dx of [.16, .32]) {
      const a = Q(x + dx, y, h), b = Q(x + dx, y, 0);
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.strokeStyle = 'rgba(0,0,0,.3)'; c.lineWidth = .8; c.stroke();
    }
    // Brass door handle
    const hPt = Q(x + dw - .08, y, h * .45);
    ART.ell(c, hPt[0], hPt[1], 1.4, 1.4, '#eec85a', '#6a4515', .7);
    // Upper door window pane
    if (h >= 14) {
      const w0 = Q(x + .1, y, h - 2), w1 = Q(x + dw - .1, y, h - 6);
      c.fillStyle = '#fff4c2'; c.fillRect(w0[0], w0[1], w1[0] - w0[0], w1[1] - w0[1]);
      c.strokeStyle = '#6a452a'; c.lineWidth = .7; c.strokeRect(w0[0], w0[1], w1[0] - w0[0], w1[1] - w0[1]);
    }
    // Porch Hood / Canopy over door
    if (opts.porch) {
      const c0 = Q(x - .12, y, h + 2.5), c1 = Q(x + dw + .12, y, h + 2.5);
      const c2 = Q(x + dw + .12, y + .35, h), c3 = Q(x - .12, y + .35, h);
      poly(c, [c0, c1, c2, c3], opts.porchCol || '#c04a3e', ART.OUT, 1);
      // Bracket supports
      const b0 = Q(x - .1, y, h), b1 = Q(x - .1, y + .3, h);
      c.beginPath(); c.moveTo(b0[0], b0[1]); c.lineTo(b1[0], b1[1]); c.strokeStyle = '#5a3822'; c.lineWidth = 1.4; c.stroke();
    }
    // Hanging carriage lantern
    if (opts.lantern) {
      const lPt = Q(x + dw + .16, y, h * .75);
      // Lantern mount
      c.strokeStyle = '#3a3a44'; c.lineWidth = 1.2;
      c.beginPath(); c.moveTo(lPt[0] - 4, lPt[1]); c.lineTo(lPt[0], lPt[1]); c.lineTo(lPt[0], lPt[1] + 2); c.stroke();
      // Glowing lantern glass
      ART.ell(c, lPt[0], lPt[1] + 4, 2.5, 3.2, '#ffe67a', '#3a3a44', .8);
      // Warm glow halo
      c.globalAlpha = .35; ART.ell(c, lPt[0], lPt[1] + 4, 7, 7, '#ffd84a'); c.globalAlpha = 1;
    }
  }

  // --- Dormer Window helper for roofs ---
  function dormer(c, x, y, z, w, d, h, roofCol, wallCol, lit) {
    if (ROT) return;
    const bx = x, by = y;
    // Dormer walls
    poly(c, [Q(bx, by + d, z), Q(bx + w, by + d, z), Q(bx + w, by + d, z - h), Q(bx, by + d, z - h)], wallCol, ART.OUT, .9);
    // Dormer arched glowing window
    const gPt = Q(bx + w / 2, by + d, z - h * .4);
    ART.ell(c, gPt[0], gPt[1], 3.5, 4.5, lit ? '#ffe67a' : '#92c2da', '#ffffff', 1);
    // Dormer miniature gable roof
    const dPeak = Q(bx + w / 2, by + d / 2, z + 4);
    poly(c, [Q(bx - .08, by + d + .08, z), dPeak, Q(bx + w + .08, by + d + .08, z)], roofCol, ART.OUT, 1);
  }

  // --- Stone Foundation Plinth Helper ---
  function stoneFoundation(c, bx, by, w, d, bh) {
    bh = bh || 4.5;
    // Base contact drop shadow
    poly(c, [Q(bx - .1, by - .1), Q(bx + w + .25, by - .1), Q(bx + w + .25, by + d + .25), Q(bx - .1, by + d + .25)], 'rgba(15,28,12,.28)');
    // South stone face
    poly(c, [Q(bx, by + d, bh), Q(bx + w, by + d, bh), Q(bx + w, by + d, 0), Q(bx, by + d, 0)], '#a69a8b', ART.OUT, .9);
    // East stone face
    poly(c, [Q(bx + w, by, bh), Q(bx + w, by + d, bh), Q(bx + w, by + d, 0), Q(bx + w, by, 0)], '#8e8274', ART.OUT, .9);
    // Foundation stone joint lines
    c.strokeStyle = 'rgba(40,25,15,.35)'; c.lineWidth = .8;
    for (let u = .5; u < w; u += .65) {
      const a = Q(bx + u, by + d, bh), b = Q(bx + u, by + d, 0);
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke();
    }
    // Top bevel highlight
    const f1 = Q(bx, by + d, bh), f2 = Q(bx + w, by + d, bh), f3 = Q(bx + w, by, bh);
    c.beginPath(); c.moveTo(f1[0], f1[1]); c.lineTo(f2[0], f2[1]); c.lineTo(f3[0], f3[1]);
    c.strokeStyle = 'rgba(255,255,255,.45)'; c.lineWidth = 1.2; c.stroke();
  }

  // --- Half-Timbering Wood Beams Helper ---
  function timberBeams(c, bx, by, w, d, z0, z1, col) {
    if (ROT) return;
    const tCol = col || '#6a452a';
    c.strokeStyle = tCol; c.lineWidth = 1.8;
    // Corner vertical posts
    for (const x of [bx + .04, bx + w - .04]) {
      const a = Q(x, by + d, z1), b = Q(x, by + d, z0);
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke();
    }
    // Top & bottom horizontal beams
    for (const z of [z0, z1]) {
      const a = Q(bx, by + d, z), b = Q(bx + w, by + d, z);
      c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke();
    }
  }

  function flowers(c, x, y, n, s) {
    for (let i = 0; i < n; i++) {
      const q = Q(x + (i % 4) * .28, y + Math.floor(i / 4) * .3);
      // Soft pastel blooms with yellow centers
      const col = ['#f78da7', '#ffd152', '#bca3ea', '#ff9e7d', '#70c7ea'][(i + s) % 5];
      ART.ell(c, q[0], q[1] - 2, 2.6, 2.6, col, 'rgba(60,20,30,.4)', .6);
      ART.ell(c, q[0], q[1] - 2, 1, 1, '#fff6c4');
    }
  }

  function tree(c, x, y, s) {
    const q = Q(x, y);
    ART.ell(c, q[0] + 1, q[1] + 1, 15, 6.5, 'rgba(25,45,15,.2)');
    // Warm timber trunk
    c.fillStyle = '#6d4529'; c.fillRect(q[0] - 2.5, q[1] - 20, 5, 20);
    c.strokeStyle = ART.OUT; c.lineWidth = 1; c.strokeRect(q[0] - 2.5, q[1] - 20, 5, 20);
    // Soft storybook watercolor canopy puffs
    const cc = ['#72b852', '#7cb860', '#63ad50'][(s || 0) % 3];
    const darkC = sh(cc, -.25), midC = cc, litC = sh(cc, .3);
    for (const [dx, dy, r] of [[-7, -23, 9.5], [7, -24, 9.5], [0, -32, 11]]) ART.ell(c, q[0] + dx, q[1] + dy + 2, r, r * .85, darkC);
    for (const [dx, dy, r] of [[-7, -24, 9.5], [7, -25, 9.5], [0, -33, 11.5]]) {
      const px = q[0] + dx, py = q[1] + dy;
      const g = c.createRadialGradient(px - r * .3, py - r * .35, r * .2, px, py, r);
      g.addColorStop(0, litC); g.addColorStop(0.55, midC); g.addColorStop(1, darkC);
      ART.ell(c, px, py, r, r * .86, g, 'rgba(25,50,15,.7)', 1.1);
    }
    ART.ell(c, q[0] - 2, q[1] - 39, 4.8, 2.6, 'rgba(255,255,255,.36)');
    // Fruit / blossom accents on tree
    if ((s || 0) % 2 === 0) {
      for (const [fx, fy] of [[-5, -22], [5, -26], [0, -32]]) {
        ART.ell(c, q[0] + fx, q[1] + fy, 2.2, 2.2, '#f77f98');
        ART.ell(c, q[0] + fx - .5, q[1] + fy - .5, .8, .8, '#ffffff');
      }
    }
  }

  function fence(c, x0, y0, x1, y1) {
    const n = Math.max(2, Math.round(Math.hypot(x1 - x0, y1 - y0) / .35));
    for (let i = 0; i <= n; i++) {
      const u = i / n, a = Q(x0 + (x1 - x0) * u, y0 + (y1 - y0) * u);
      c.fillStyle = '#ffffff'; c.fillRect(a[0] - 1, a[1] - 9, 2, 9);
    }
    const a = Q(x0, y0, 6), b = Q(x1, y1, 6);
    c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]);
    c.strokeStyle = '#ffffff'; c.lineWidth = 1.5; c.stroke();
  }

  function frameOn(o, W, D, hs) {
    const r = o.r || 0;
    ROT = r >= 2 ? { ox: o.x, oy: o.y, W, D } : null;
    MR = r % 2 ? { ox: o.x, oy: o.y } : null;
    HS = hs || null;
  }
  function frameOff() { ROT = null; MR = null; HS = null; }
  function drawHouse(c, h, T) {
    frameOn(h, 4, 4, { ox: h.x, oy: h.y, k: 1.25, kz: 1.6 });
    try { drawHouse_(c, h, T); } finally { frameOff(); }
  }

  // ================= REDESIGNED HOUSE ARCHITECTURE =================
  function drawHouse_(c, h, T) {
    const kind = KINDS[h.v % KINDS.length], wall = WALLS[h.cw % WALLS.length], roof = ROOFS[h.cr % ROOFS.length];
    const lit = S.clock && (S.clock.m >= 1080 || S.clock.m < 360), bx = h.x + .5, by = h.y + .5;

    // Lot Garden Yard with Lush Lawn (only under the house building & non-road tiles so front-yard roads stay visible!)
    poly(c, [Q(h.x + .15, h.y + .15), Q(h.x + 3.85, h.y + .15), Q(h.x + 3.85, h.y + 2.35), Q(h.x + .15, h.y + 2.35)], 'rgba(125,190,75,.45)');

    // ----------------------------------------------------
    // VARIANT 0: COTTAGE (Cozy Storybook Fairytale Cottage)
    // ----------------------------------------------------
    if (kind === 'cottage') {
      const w = 1.8, d = 1.4, H1 = 20, rh = 18;
      // Stone foundation
      stoneFoundation(c, bx, by, w, d, 4.5);
      // Main cream/stucco building block
      blk(c, bx, by, w, d, 4.5, H1 - 4.5, wall);
      // Half-timbering beams
      timberBeams(c, bx, by, w, d, 4.5, H1, '#6a452a');
      // Front window with shutters & overflowing flower planter box
      winS(c, bx + .15, by + d, 7, .45, 8.5, lit, '#ffffff', { shutters: true, flowerBox: true });
      // Side window
      winE(c, bx + w, by + .5, 7, .45, 8, lit);
      // Cute wooden front door with porch hood and hanging glowing lantern
      door(c, bx + .95, by + d, 14, '#7a4528', { porch: true, porchCol: roof, lantern: true });
      // Scalloped pitched gable roof with deep eaves overhang
      gable(c, bx, by, w, d, H1, rh, roof, wall);
      // Cute dormer window in the roof
      dormer(c, bx + .2, by + d * .6, H1 + rh * .4, .45, .4, 6, roof, wall, lit);
      // Ashlar stone chimney with smoke
      chimney(c, bx + 1.4, by + .35, H1 + rh - 2, T, h.v);
      // Flagstone stepping stones leading from door
      for (let i = 0; i < 4; i++) {
        const p = Q(bx + 1.1 + (i % 2) * .12, by + d + .4 + i * .45);
        ART.ell(c, p[0], p[1], 4.5, 2.5, '#dcd4c8', 'rgba(50,30,15,.35)', .7);
      }
      // Corner garden flowers & tree
      flowers(c, bx + .05, by + d + .35, 4, h.cw);
      tree(c, bx + 2.7, by + .55, h.v);

    // ----------------------------------------------------
    // VARIANT 1: FAMILY (Suburban 2-Story with Gabled Porch)
    // ----------------------------------------------------
    } else if (kind === 'family') {
      const w = 2.4, d = 1.7, H1 = 28, rh = 20;
      stoneFoundation(c, bx, by, w, d, 5);
      blk(c, bx, by, w, d, 5, H1 - 5, wall);
      timberBeams(c, bx, by, w, d, 5, H1, '#5a3822');
      // Floor divider molding
      poly(c, [Q(bx, by + d, 15.5), Q(bx + w, by + d, 15.5), Q(bx + w, by + d, 14.5), Q(bx, by + d, 14.5)], '#ffffff', ART.OUT, .8);
      // Upper floor shuttered windows with flower boxes
      winS(c, bx + .2, by + d, 17.5, .45, 8, lit, '#ffffff', { shutters: true, flowerBox: true });
      winS(c, bx + 1.7, by + d, 17.5, .45, 8, lit, '#ffffff', { shutters: true, flowerBox: true });
      // Ground floor bay window with copper roof
      poly(c, [Q(bx + .15, by + d + .25, 12), Q(bx + .75, by + d + .25, 12), Q(bx + .85, by + d, 13.5), Q(bx + .05, by + d, 13.5)], '#4a7a62', ART.OUT, .8);
      winS(c, bx + .2, by + d + .25, 6, .5, 6.5, lit, '#ffffff');
      // East side windows
      winE(c, bx + w, by + .55, 17.5, .5, 8, lit);
      // Front gabled entrance porch with twin white pillars
      const px0 = bx + 1.1, px1 = bx + 1.9, py = by + d;
      for (const px of [px0 + .05, px1 - .05]) {
        const a = Q(px, py + .45, 16), b = Q(px, py + .45, 0);
        c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.strokeStyle = '#ffffff'; c.lineWidth = 2.4; c.stroke();
      }
      // Gabled porch roof
      poly(c, [Q(px0 - .1, py + .55, 15), Q((px0 + px1) / 2, py + .55, 18.5), Q(px1 + .1, py + .55, 15)], roof, ART.OUT, 1);
      door(c, bx + 1.25, by + d, 15, '#7a4a2c', { lantern: true });
      // Main shingled roof
      gable(c, bx, by, w, d, H1, rh, roof, wall);
      chimney(c, bx + 2, by + .45, H1 + rh - 3, T, h.v);
      // Front hedgerow & stone path
      for (let i = 0; i < 5; i++) {
        const q = Q(bx + 1.75 + i * .25, by + d + .6);
        ART.ell(c, q[0], q[1] - 3, 5.5, 4.5, '#56a848', 'rgba(20,40,10,.5)', .8);
      }
      flowers(c, bx, by + d + .4, 3, h.cr);

    // ----------------------------------------------------
    // VARIANT 2: TWOSTORY (Town Manor / Hip Roof with Balcony)
    // ----------------------------------------------------
    } else if (kind === 'twostory') {
      const w = 2.2, d = 1.8, H1 = 46, rh = 19;
      stoneFoundation(c, bx, by, w, d, 5);
      blk(c, bx, by, w, d, 5, H1 - 5, wall);
      // Ashlar stone quoins on corners
      for (let z = 5; z < H1; z += 6) {
        poly(c, [Q(bx + .08, by + d, z + 3), Q(bx, by + d, z + 3), Q(bx, by + d, z), Q(bx + .08, by + d, z)], '#d4cac0', ART.OUT, .6);
        poly(c, [Q(bx + w, by + d, z + 3), Q(bx + w - .08, by + d, z + 3), Q(bx + w - .08, by + d, z), Q(bx + w, by + d, z)], '#d4cac0', ART.OUT, .6);
      }
      // Floor dividing molding
      poly(c, [Q(bx, by + d, 23.5), Q(bx + w, by + d, 23.5), Q(bx + w, by + d, 22), Q(bx, by + d, 22)], '#e8e2d8', ART.OUT, .8);
      // 1st Floor windows
      winS(c, bx + .2, by + d, 8, .45, 9, lit && !lit, '#ffffff', { shutters: true });
      winS(c, bx + 1.5, by + d, 8, .45, 9, lit, '#ffffff', { shutters: true });
      // 2nd Floor French door & windows opening onto balcony
      winS(c, bx + .2, by + d, 27, .45, 9, lit, '#ffffff');
      winS(c, bx + 1.5, by + d, 27, .45, 9, lit, '#ffffff');
      winE(c, bx + w, by + .6, 27, .5, 9, lit);
      // Balcony with iron railing & flower planters
      const balX0 = bx + .75, balX1 = bx + 1.45, balY = by + d;
      poly(c, [Q(balX0, balY + .4, 23), Q(balX1, balY + .4, 23), Q(balX1, balY, 23), Q(balX0, balY, 23)], '#d4c4b0', ART.OUT, .8);
      // Iron railing
      for (let u = 0; u <= 4; u++) {
        const rx = balX0 + u * (balX1 - balX0) / 4;
        const r0 = Q(rx, balY + .4, 29), r1 = Q(rx, balY + .4, 23);
        c.beginPath(); c.moveTo(r0[0], r0[1]); c.lineTo(r1[0], r1[1]); c.strokeStyle = '#2b2b34'; c.lineWidth = 1.3; c.stroke();
      }
      const bRail0 = Q(balX0, balY + .4, 29), bRail1 = Q(balX1, balY + .4, 29);
      c.beginPath(); c.moveTo(bRail0[0], bRail0[1]); c.lineTo(bRail1[0], bRail1[1]); c.strokeStyle = '#2b2b34'; c.lineWidth = 1.8; c.stroke();
      // Grand front entrance
      door(c, bx + .85, by + d, 17, '#5a3520', { lantern: true });
      // Shingled Hip Roof with twin dormers
      hip(c, bx, by, w, d, H1, rh, roof);
      dormer(c, bx + .3, by + d * .65, H1 + rh * .4, .4, .35, 6, roof, wall, lit);
      dormer(c, bx + 1.4, by + d * .65, H1 + rh * .4, .4, .35, 6, roof, wall, lit);
      tree(c, bx + 3.1, by + 2.4, h.v);

    // ----------------------------------------------------
    // VARIANT 3: VILLA (Mediterranean Terracotta Villa)
    // ----------------------------------------------------
    } else if (kind === 'villa') {
      const w = 2.6, d = 1.9, fl = 3, H1 = fl * 14 + 6;
      stoneFoundation(c, bx, by, w, d, 5);
      blk(c, bx, by, w, d, 5, H1 - 5, wall);
      // Floor dividing bands
      for (let f = 1; f < fl; f++) {
        const fz = 5 + f * 14;
        poly(c, [Q(bx, by + d, fz + 1.2), Q(bx + w, by + d, fz + 1.2), Q(bx + w, by + d, fz), Q(bx, by + d, fz)], '#e6ddd0', ART.OUT, .8);
      }
      // Arched windows with decorative ledges
      for (let f = 0; f < fl; f++) {
        const z = 7 + f * 14;
        for (let i = 0; i < 3; i++) {
          winS(c, bx + .2 + i * .82, by + d, z, .48, 8, lit && (f + i + h.v) % 2 === 0, '#ffffff');
        }
        winE(c, bx + w, by + .4, z, .5, 8, lit && f % 2 === 0);
      }
      // Rooftop terrace pergola with terracotta roof eaves
      poly(c, [Q(bx - .1, by - .1, H1), Q(bx + w + .1, by - .1, H1), Q(bx + w + .1, by + d + .1, H1), Q(bx - .1, by + d + .1, H1)], '#d0583b', ART.OUT, 1.2);
      // Wooden rooftop pergola
      for (const px of [bx + .3, bx + 1.3, bx + 2.3]) {
        const a = Q(px, by + .5, H1 + 10), b = Q(px, by + .5, H1);
        c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.strokeStyle = '#7a4e28'; c.lineWidth = 1.8; c.stroke();
      }
      // Rooftop potted tree in ceramic urn
      const urnPt = Q(bx + 2, by + d * .5, H1 + 2);
      ART.ell(c, urnPt[0], urnPt[1], 4, 3, '#c0533f');
      ART.ell(c, urnPt[0], urnPt[1] - 7, 7, 7, '#4f9e42', '#285820', .8);
      // Ground floor arched entrance with striped awning
      poly(c, [Q(bx + 1, by + d + .35, 14), Q(bx + 1.7, by + d + .35, 14), Q(bx + 1.7, by + d, 16), Q(bx + 1, by + d, 16)], '#d0583b', ART.OUT, .8);
      door(c, bx + 1.1, by + d, 13, '#5a3822');
      // Polished brass VILLA sign
      const sg = Q(bx + 1.35, by + d, H1 - 4);
      ART.rrect(c, sg[0] - 14, sg[1] - 6, 28, 12, 3);
      c.fillStyle = '#f2c85a'; c.fill(); c.strokeStyle = '#7a4e18'; c.lineWidth = 1; c.stroke();
      c.font = 'bold 7px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#4a2c0a'; c.fillText('VILLA', sg[0], sg[1] + 2); c.textAlign = 'start';

    // ----------------------------------------------------
    // VARIANT 4: YARD (Country Homestead, Fenced Lawn & Doghouse)
    // ----------------------------------------------------
    } else if (kind === 'yard') {
      const w = 1.8, d = 1.3, H1 = 20, rh = 16;
      // Fenced Green Lawn
      poly(c, [Q(bx - .35, by + 1.2), Q(bx + 3.15, by + 1.2), Q(bx + 3.15, by + 3.25), Q(bx - .35, by + 3.25)], '#7ab84f');
      // Split rail picket fence
      fence(c, bx - .35, by + 3.25, bx + 3.15, by + 3.25);
      fence(c, bx + 3.15, by + .3, bx + 3.15, by + 3.25);
      // Farmhouse structure
      stoneFoundation(c, bx, by, w, d, 4);
      blk(c, bx, by, w, d, 4, H1 - 4, wall);
      timberBeams(c, bx, by, w, d, 4, H1, '#5a3822');
      winS(c, bx + .15, by + d, 7, .4, 8, lit, '#ffffff', { shutters: true, flowerBox: true });
      door(c, bx + .85, by + d, 14, '#7a4528', { porch: true, lantern: true });
      winE(c, bx + w, by + .45, 7, .4, 8, lit);
      gable(c, bx, by, w, d, H1, rh, roof, wall);
      chimney(c, bx + 1.4, by + .35, H1 + rh - 2, T, h.v);

      // Adorable Wooden Doghouse
      blk(c, bx + 2.2, by + .5, .65, .55, 0, 9, '#c8864a');
      gable(c, bx + 2.2, by + .5, .65, .55, 9, 6.5, '#d9534f', '#c8864a');
      const dhPt = Q(bx + 2.5, by + .5 + .55, 0);
      ART.ell(c, dhPt[0], dhPt[1] - 4, 3, 4, '#3a1f10'); // doghouse entrance hole
      ART.ell(c, dhPt[0] + 5, dhPt[1], 2.5, 1.5, '#4a7fb5'); // dog bowl

      // Clothesline with hanging colorful laundry swaying in the breeze
      const clA = Q(bx + .3, by + 2.4, 15), clB = Q(bx + 2.1, by + 2.4, 15);
      c.beginPath(); c.moveTo(clA[0], clA[1]); c.lineTo(clB[0], clB[1]);
      c.strokeStyle = '#888894'; c.lineWidth = 1; c.stroke();
      const sw = Math.sin(T * 3) * 1.5;
      const clothes = ['#ff85a2', '#72c2ed', '#ffd55e', '#ffffff'];
      for (let i = 0; i < 4; i++) {
        const q = Q(bx + .6 + i * .4, by + 2.4, 14);
        c.fillStyle = clothes[i];
        c.fillRect(q[0] - 3.5, q[1], 7, 7);
        c.strokeStyle = 'rgba(0,0,0,.2)'; c.lineWidth = .6; c.strokeRect(q[0] - 3.5, q[1], 7, 7);
      }
      // Raised Vegetable Garden Bed with Pumpkins
      poly(c, [Q(bx + 2, by + 2.6), Q(bx + 2.95, by + 2.6), Q(bx + 2.95, by + 3.05), Q(bx + 2, by + 3.05)], '#6b4528', '#8a5a35', 1);
      for (let i = 0; i < 3; i++) {
        const p = Q(bx + 2.15 + i * .35, by + 2.82);
        ART.ell(c, p[0], p[1] - 2, 3, 2.5, '#f58220', '#a0480a', .8);
      }

    // ----------------------------------------------------
    // VARIANT 5: BARN (Rustic Farmhouse Barn with Gambrel Roof)
    // ----------------------------------------------------
    } else if (kind === 'barn') {
      const w = 2.3, d = 1.8, H1 = 23, rh = 24;
      stoneFoundation(c, bx, by, w, d, 5);
      blk(c, bx, by, w, d, 5, H1 - 5, wall);
      // White vertical barn siding trims
      c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 1;
      for (let u = .4; u < w; u += .5) {
        const a = Q(bx + u, by + d, H1), b = Q(bx + u, by + d, 5);
        c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke();
      }
      // Double barn doors with white X crossbucks
      const dw0 = bx + .8, dw1 = bx + 1.6, dh = 16;
      poly(c, [Q(dw0, by + d, dh), Q(dw1, by + d, dh), Q(dw1, by + d, 0), Q(dw0, by + d, 0)], '#5a2d1d', ART.OUT, 1);
      // X braces
      const x0 = Q(dw0, by + d, dh), x1 = Q(dw1, by + d, 0);
      const x2 = Q(dw1, by + d, dh), x3 = Q(dw0, by + d, 0);
      c.beginPath(); c.moveTo(x0[0], x0[1]); c.lineTo(x1[0], x1[1]); c.moveTo(x2[0], x2[1]); c.lineTo(x3[0], x3[1]);
      c.strokeStyle = '#ffffff'; c.lineWidth = 1.6; c.stroke();
      // Shuttered farm windows
      winS(c, bx + .15, by + d, 8, .4, 8, lit, '#ffffff', { shutters: true });
      winS(c, bx + 1.75, by + d, 8, .4, 8, lit, '#ffffff', { shutters: true });
      // Gambrel barn roof
      gambrel(c, bx, by, w, d, H1, rh, roof, wall);
      // Round star / wagon wheel window in the gable peak
      const starPt = Q(bx + w, by + d / 2, H1 + 11);
      ART.ell(c, starPt[0], starPt[1], 4.5, 4.5, lit ? '#ffe68a' : '#c8e2f4', '#ffffff', 1.5);
      // Upper hayloft door with hoist beam
      const hBeam0 = Q(bx + w / 2, by + d, H1 + 8), hBeam1 = Q(bx + w / 2, by + d + .4, H1 + 8);
      c.beginPath(); c.moveTo(hBeam0[0], hBeam0[1]); c.lineTo(hBeam1[0], hBeam1[1]); c.strokeStyle = '#7a4e28'; c.lineWidth = 2.4; c.stroke();
      tree(c, bx + 3.1, by + .45, h.v);

    // ----------------------------------------------------
    // VARIANT 6: ROW (European Triplet Row Houses)
    // ----------------------------------------------------
    } else if (kind === 'row') {
      const houseCols = ['#78c4a4', '#f0a28a', '#fad06a'];
      const roofCols = ['#c85a48', '#4a7fb5', '#486248'];
      const gables = ['step', 'triangle', 'mansard'];
      for (let i = 0; i < 3; i++) {
        const xx = bx + i * .98, wc = houseCols[i], rc = roofCols[i], H = 32 + (i % 2) * 3;
        stoneFoundation(c, xx, by, .98, 1.5, 4);
        blk(c, xx, by, .98, 1.5, 4, H - 4, wc);
        // Floor molding
        poly(c, [Q(xx, by + 1.5, 17), Q(xx + .98, by + 1.5, 17), Q(xx + .98, by + 1.5, 15.8), Q(xx, by + 1.5, 15.8)], '#ffffff', ART.OUT, .8);
        // 2nd floor window with flower box
        winS(c, xx + .25, by + 1.5, 19, .46, 8, lit && i === 1, '#ffffff', { flowerBox: true });
        // Ground floor door & shop window
        door(c, xx + .18, by + 1.5, 13, '#5a3520');
        // Decorative roof style: stepped or triangular gable
        if (i === 0) { // Stepped Dutch gable
          poly(c, [Q(xx + .1, by + 1.5, H), Q(xx + .88, by + 1.5, H), Q(xx + .88, by + 1.5, H + 4), Q(xx + .1, by + 1.5, H + 4)], wc, ART.OUT, .8);
          poly(c, [Q(xx + .25, by + 1.5, H + 4), Q(xx + .73, by + 1.5, H + 4), Q(xx + .73, by + 1.5, H + 8), Q(xx + .25, by + 1.5, H + 8)], wc, ART.OUT, .8);
        } else if (i === 1) { // Striped awning over center door
          poly(c, [Q(xx + .1, by + 1.5 + .3, 14), Q(xx + .88, by + 1.5 + .3, 14), Q(xx + .88, by + 1.5, 16), Q(xx + .1, by + 1.5, 16)], rc, ART.OUT, .8);
          gable(c, xx, by, .98, 1.5, H, 13, rc, wc);
        } else {
          gable(c, xx, by, .98, 1.5, H, 13, rc, wc);
        }
      }
      flowers(c, bx, by + 1.85, 8, h.v);

    // ----------------------------------------------------
    // VARIANT 7: TOWER (Fairytale Turret Manor)
    // ----------------------------------------------------
    } else {
      const w = 2, d = 1.5, H1 = 23, rh = 18;
      // Main cottage section
      stoneFoundation(c, bx, by, w, d, 4.5);
      blk(c, bx, by, w, d, 4.5, H1 - 4.5, wall);
      timberBeams(c, bx, by, w, d, 4.5, H1, '#5a3822');
      winS(c, bx + .2, by + d, 8, .45, 8.5, lit, '#ffffff', { shutters: true, flowerBox: true });
      door(c, bx + 1.1, by + d, 15, '#7a4528', { porch: true, lantern: true });
      gable(c, bx, by, w, d, H1, rh, roof, wall);

      // Magnificent Round Stone Turret Tower — ROT/MR 반영한 로컬 좌표로 변환
      let tlx = bx + w + .15, tly = by + d + .15;
      if (ROT) { const p = turned(tlx - .5, tly - .5, 1, 1); tlx = p.x + .5; tly = p.y + .5; }
      const tq = Q(tlx, tly), r = 11;
      c.save(); c.translate(tq[0], tq[1]); c.scale(1.25, 1.6); c.translate(-tq[0], -tq[1]);
      const tw = '#a69e94';
      ART.ell(c, tq[0], tq[1], r, r * .5, sh(tw, -.25), ART.OUT, 1);
      // Stone tower cylinder with vertical ashlar texture
      c.fillStyle = tw; c.fillRect(tq[0] - r, tq[1] - 46, r * 2, 46);
      c.strokeStyle = ART.OUT; c.lineWidth = 1.1;
      c.beginPath(); c.moveTo(tq[0] - r, tq[1]); c.lineTo(tq[0] - r, tq[1] - 46);
      c.moveTo(tq[0] + r, tq[1]); c.lineTo(tq[0] + r, tq[1] - 46); c.stroke();
      // Stone block courses
      c.strokeStyle = 'rgba(40,25,15,.35)'; c.lineWidth = .8;
      for (let k = 1; k <= 5; k++) {
        c.beginPath(); c.moveTo(tq[0] - r, tq[1] - k * 8); c.lineTo(tq[0] + r, tq[1] - k * 8); c.stroke();
      }
      // Arched slit window with leaded glass
      ART.rrect(c, tq[0] - 3.5, tq[1] - 34, 7, 10, 3.5);
      c.fillStyle = lit ? '#ffe68a' : '#8fb8d0'; c.fill(); c.strokeStyle = '#4a3020'; c.lineWidth = .9; c.stroke();
      // Conical Spire Roof with Spire Finial
      c.beginPath();
      c.moveTo(tq[0] - r - 2.5, tq[1] - 46);
      c.lineTo(tq[0], tq[1] - 74);
      c.lineTo(tq[0] + r + 2.5, tq[1] - 46);
      c.closePath();
      c.fillStyle = roof; c.fill(); c.strokeStyle = ART.OUT; c.lineWidth = 1.2; c.stroke();
      // Golden weather vane / finial
      ART.ell(c, tq[0], tq[1] - 75, 2.5, 2.5, '#eec85a', '#6a4515', .8);
      // Climbing ivy vines on tower stones
      for (const [dy, dx] of [[-10, -6], [-18, -4], [-26, -5], [-14, 4], [-22, 6]]) {
        ART.ell(c, tq[0] + dx, tq[1] + dy, 3, 2.4, '#4da23e');
      }
      c.restore();
      flowers(c, bx, by + d + .2, 4, h.cw);
    }

    // Cute Lot Mailbox with Red Flag
    const mb = Q(h.x + 3.4, h.y + 3.5);
    c.fillStyle = '#6a452a'; c.fillRect(mb[0] - 1, mb[1] - 12, 2.2, 12);
    ART.rrect(c, mb[0] - 4.5, mb[1] - 17, 9, 6.5, 3);
    c.fillStyle = roof; c.fill(); c.strokeStyle = ART.OUT; c.lineWidth = .9; c.stroke();
    // Mailbox red flag
    c.fillStyle = '#e04038'; c.fillRect(mb[0] + 3.5, mb[1] - 19, 3, 2.5);
  }
  // ---------------- saplings, trees & flowers (grow over the days) ----------------
  function drawTree(c, o, T, ghost) {
    const st = ghost ? 2 : stageOf(S, o), k = o.k, q = Q(o.x + .5, o.y + .5), sw = Math.sin(T * 1.4 + o.x * .7 + o.y) * 1.5;
    // Ground shadow & soft grass bedding
    ART.ell(c, q[0], q[1], st === 2 ? 14 : 9, st === 2 ? 6 : 4, 'rgba(0,0,0,.15)');
    if (st === 0) { // a sapling: rich soil mound, sturdy green sprout with twin leaves & dew
      ART.ell(c, q[0], q[1] - 1, 9, 4, '#5c3d24');
      ART.ell(c, q[0], q[1] - 2, 7, 3, '#785030');
      c.strokeStyle = '#3e7025'; c.lineWidth = 2.2; c.beginPath(); c.moveTo(q[0], q[1] - 2); c.quadraticCurveTo(q[0] + sw * .2, q[1] - 8, q[0] + sw * .4, q[1] - 14); c.stroke();
      ART.ell(c, q[0] - 4 + sw * .4, q[1] - 13, 4.2, 2.4, '#6db53e', ART.OUT, .8);
      ART.ell(c, q[0] + 4 + sw * .4, q[1] - 15, 4.2, 2.4, '#87d152', ART.OUT, .8);
      ART.ell(c, q[0] + 2 + sw * .4, q[1] - 15.5, 1.2, 1.2, '#ffffff');
      if (D[k].flower) return;
      c.font = 'bold 9px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#4c8a2a'; c.fillText('🌱', q[0], q[1] - 20); c.textAlign = 'start'; return;
    }
    const s = st === 2 ? 1 : .65;
    c.save(); c.translate(q[0], q[1]); c.scale(s, s);

    if (k === 'sunflower') {
      // Natural soil mound at base
      ART.ell(c, 0, -1, 10, 4, '#634428');
      // 3 clustered stalks (front & sides)
      const stems = [{ x: -7, h: 26, s: .85 }, { x: 7, h: 28, s: .9 }, { x: 0, h: 36, s: 1 }];
      for (const stm of stems) {
        const x = stm.x, h = stm.h, w = sw * .6 * stm.s;
        // Sturdy stalk
        c.strokeStyle = '#3d7224'; c.lineWidth = 2.5 * stm.s; c.beginPath();
        c.moveTo(x * .4, 0); c.quadraticCurveTo(x * .6 + w * .3, -h * .5, x + w, -h); c.stroke();
        // Broad textured sunflower leaves
        ART.ell(c, x * .5 - 4 + w * .3, -h * .38, 5.5 * stm.s, 3.2 * stm.s, '#4e9432', ART.OUT, .6);
        ART.ell(c, x * .5 + 5 + w * .4, -h * .6, 5 * stm.s, 3 * stm.s, '#5ca83c', ART.OUT, .6);
        // Leaf vein highlight
        c.strokeStyle = '#7ecc50'; c.lineWidth = .9; c.beginPath();
        c.moveTo(x * .5 - 6 + w * .3, -h * .38); c.lineTo(x * .5 - 2 + w * .3, -h * .38);
        c.moveTo(x * .5 + 3 + w * .4, -h * .6); c.lineTo(x * .5 + 7 + w * .4, -h * .6); c.stroke();

        const fx = x + w, fy = -h;
        if (st === 2) {
          // Layer 1: Outer golden rays (14 petals)
          const petals = 14;
          for (let p = 0; p < petals; p++) {
            const ang = (p / petals) * Math.PI * 2;
            const px = fx + Math.cos(ang) * 9.5 * stm.s, py = fy + Math.sin(ang) * 8.5 * stm.s;
            ART.ell(c, px, py, 4 * stm.s, 3.2 * stm.s, '#f3a216', '#c97708', .5);
          }
          // Layer 2: Inner bright golden petals
          for (let p = 0; p < petals; p++) {
            const ang = ((p + .5) / petals) * Math.PI * 2;
            const px = fx + Math.cos(ang) * 7.5 * stm.s, py = fy + Math.sin(ang) * 6.5 * stm.s;
            ART.ell(c, px, py, 3.2 * stm.s, 2.5 * stm.s, '#ffd235', '#e09810', .5);
          }
          // Layer 3: Dark chocolate seed head
          ART.ell(c, fx, fy, 5.5 * stm.s, 5 * stm.s, '#462711', ART.OUT, .8);
          ART.ell(c, fx, fy, 4.2 * stm.s, 3.8 * stm.s, '#633917');
          // Golden seed flecks / florets ring
          for (let s = 0; s < 8; s++) {
            const sang = (s / 8) * Math.PI * 2 + T * .2;
            ART.ell(c, fx + Math.cos(sang) * 2.8 * stm.s, fy + Math.sin(sang) * 2.4 * stm.s, 1.1 * stm.s, 1.1 * stm.s, '#f5c53b');
          }
        } else {
          // Young sunflower bud
          ART.ell(c, fx, fy, 5 * stm.s, 5 * stm.s, '#5aa638', ART.OUT, .8);
          ART.ell(c, fx, fy, 3.2 * stm.s, 3.2 * stm.s, '#f0b830');
        }
      }
    }
    else if (k === 'tulip') {
      // Clustered luxury tulip flowerbed (4 blossoms with arched foliage)
      ART.ell(c, 0, -1, 11, 4.5, '#5d4128');
      const tulipSpecs = [
        { x: -8, h: 22, col: '#f75985', dark: '#b82752', hi: '#ffaec4' }, // Coral rose
        { x: -2.5, h: 26, col: '#f7b731', dark: '#c27e05', hi: '#ffeaa7' }, // Golden amber
        { x: 3.5, h: 29, col: '#9b59b6', dark: '#632b7a', hi: '#d8b4e2' }, // Royal amethyst
        { x: 9, h: 23, col: '#e74c3c', dark: '#a92415', hi: '#ff8a7d' }  // Crimson
      ];
      // Lush arched baseline foliage
      for (let i = 0; i < 5; i++) {
        const lx = (i - 2) * 5, lw = sw * .3;
        c.fillStyle = i % 2 ? '#468f30' : '#57a83d';
        c.beginPath();
        c.moveTo(lx, 0);
        c.quadraticCurveTo(lx * 1.5 + lw, -10, lx * 1.8 + lw * 1.5, -15);
        c.quadraticCurveTo(lx * 1.3, -8, lx * .8, 0);
        c.fill();
        c.strokeStyle = '#2d5e1d'; c.lineWidth = .7; c.stroke();
      }
      for (let i = 0; i < tulipSpecs.length; i++) {
        const t = tulipSpecs[i], x = t.x, h = t.h, fx = x + sw * .4, fy = -h;
        // Stalk
        c.strokeStyle = '#3b7826'; c.lineWidth = 1.9; c.beginPath();
        c.moveTo(x * .5, 0); c.quadraticCurveTo(x * .8 + sw * .2, -h * .5, fx, fy); c.stroke();
        if (st === 2) {
          // Cup tulip blossom with shaded petals
          // Back petals
          c.fillStyle = t.dark; c.beginPath();
          c.moveTo(fx - 4.5, fy); c.quadraticCurveTo(fx - 5.5, fy - 11, fx, fy - 12);
          c.quadraticCurveTo(fx + 5.5, fy - 11, fx + 4.5, fy); c.fill();
          // Front petals (layered tulip petals)
          c.fillStyle = t.col; c.beginPath();
          c.moveTo(fx - 5, fy + 1);
          c.quadraticCurveTo(fx - 5.5, fy - 8, fx - 1.5, fy - 9.5);
          c.quadraticCurveTo(fx - 2, fy - 3, fx, fy + 2);
          c.quadraticCurveTo(fx + 2, fy - 3, fx + 1.5, fy - 9.5);
          c.quadraticCurveTo(fx + 5.5, fy - 8, fx + 5, fy + 1);
          c.quadraticCurveTo(fx, fy + 5.5, fx - 5, fy + 1);
          c.fill();
          c.strokeStyle = ART.OUT; c.lineWidth = .7; c.stroke();
          // Top highlight sheen on petal rim
          c.fillStyle = t.hi; c.beginPath();
          c.moveTo(fx - 3.5, fy - 4); c.quadraticCurveTo(fx - 1, fy - 7.5, fx, fy - 5);
          c.quadraticCurveTo(fx + 1, fy - 7.5, fx + 3.5, fy - 4);
          c.quadraticCurveTo(fx, fy - 1, fx - 3.5, fy - 4); c.fill();
        } else {
          // Young tulip bud
          ART.ell(c, fx, fy - 3, 3, 5, '#5aa638', ART.OUT, .7);
          ART.ell(c, fx, fy - 5, 2, 3, t.col);
        }
      }
    }
    else if (k === 'rose') {
      // Lush Victorian Rose Bush: rich layered foliage mound + layered spiral garden roses
      ART.ell(c, 0, -1, 14, 6, '#563a23');
      // Foliage dome clusters with rich multi-tone shading
      const bushPuffs = [
        { x: -8, y: -9, r: 9, c: '#275822' }, { x: 8, y: -9, r: 9, c: '#2e6329' },
        { x: -5, y: -16, r: 10, c: '#3b7834' }, { x: 5, y: -16, r: 10, c: '#488c40' },
        { x: 0, y: -23, r: 11, c: '#5ba352' }, { x: -8, y: -20, r: 8, c: '#4e9444' }, { x: 8, y: -20, r: 8, c: '#529e48' }
      ];
      for (const p of bushPuffs) {
        ART.ell(c, p.x + sw * .3, p.y, p.r, p.r * .8, p.c, ART.OUT, .8);
        // Leaf texture serrations
        ART.ell(c, p.x - p.r * .4 + sw * .3, p.y - p.r * .3, p.r * .4, p.r * .3, '#6fc264');
      }
      if (st === 2) {
        // 6 Full blooming English garden roses
        const roses = [
          { x: -7, y: -12, r: 5.2 }, { x: 7, y: -13, r: 5.4 }, { x: 0, y: -17, r: 6 },
          { x: -6, y: -24, r: 5.5 }, { x: 6, y: -23, r: 5.5 }, { x: 0, y: -28, r: 6.2 }
        ];
        for (const r of roses) {
          const rx = r.x + sw * .35, ry = r.y, rad = r.r;
          // Outer petal halo
          ART.ell(c, rx, ry, rad, rad * .88, '#c92a4a', '#781024', .8);
          // Middle lush petals
          ART.ell(c, rx, ry - .5, rad * .8, rad * .7, '#ee496c');
          // Inner spiral petal folds
          ART.ell(c, rx - 1, ry - 1, rad * .55, rad * .48, '#fa7290');
          ART.ell(c, rx + 1, ry - .5, rad * .38, rad * .32, '#ff9ebb');
          // Core bud & soft highlight
          ART.ell(c, rx, ry - 1.2, rad * .22, rad * .18, '#ffffff');
        }
      } else {
        // Small rose buds
        for (const [bx, by] of [[-6, -14], [5, -16], [0, -23]]) {
          ART.ell(c, bx + sw * .3, by, 3.2, 3.8, '#c92a4a', ART.OUT, .7);
          ART.ell(c, bx + sw * .3, by - 1, 1.8, 2, '#ffa0b5');
        }
      }
    }
    else if (k === 'lavender') {
      // Fragrant Provence Lavender Mound: silvery-sage foliage + 7 swaying purple flower spikes
      ART.ell(c, 0, -1, 13, 5.5, '#593d25');
      for (const [lx, ly, rx, ry, col] of [[-7, -5, 7, 5, '#5f8d6e'], [7, -5, 7, 5, '#689977'], [0, -7, 8.5, 6, '#74a884']]) {
        ART.ell(c, lx + sw * .2, ly, rx, ry, col, ART.OUT, .7);
      }
      const spikes = [[-9, 24], [-5.5, 29], [-2, 33], [1.5, 34], [5, 30], [8.5, 25], [0, 27]];
      for (let i = 0; i < spikes.length; i++) {
        const [sx0, h] = spikes[i], tx = sx0 + sw * (.5 + (i % 3) * .15);
        c.strokeStyle = '#4d7c5b'; c.lineWidth = 1.5; c.beginPath();
        c.moveTo(sx0 * .45, -3); c.quadraticCurveTo(sx0 * .75 + sw * .2, -h * .5, tx, -h); c.stroke();
        if (st === 2) {
          for (let b = 0; b < 5; b++) {
            const u = .52 + b * .1, bx = sx0 * .45 + (tx - sx0 * .45) * u, by = -3 + (-h + 3) * u;
            const col = b % 2 ? '#8e54e9' : '#a770ef';
            ART.ell(c, bx - 1.4, by, 2.1, 1.6, col, '#4a2380', .5);
            ART.ell(c, bx + 1.4, by - .6, 2.1, 1.6, '#b98eff', '#4a2380', .5);
          }
          ART.ell(c, tx, -h - 1.5, 1.8, 2.2, '#d6bcfa');
        } else {
          ART.ell(c, tx, -h, 2.2, 4.2, '#7b52ab', ART.OUT, .6);
        }
      }
    }
    else if (k === 'daisy') {
      // Cheerful Meadow Daisy Cluster: lush green cushion + 7 crisp white-petalled daisies with golden centers
      ART.ell(c, 0, -1, 13, 5.5, '#593d25');
      for (const [px, py, r, col] of [[-7, -6, 8, '#3d8232'], [7, -6, 8, '#46913a'], [-3, -11, 8.5, '#52a345'], [4, -11, 8.5, '#5eb350'], [0, -8, 9, '#68bf58']]) {
        ART.ell(c, px + sw * .25, py, r, r * .75, col, ART.OUT, .7);
      }
      const blooms = [[-8, -11, .85], [8, -12, .85], [-4, -18, .95], [5, -17, .95], [0, -13, 1], [-6, -22, .9], [3, -23, 1]];
      for (const [bx, by, sc] of blooms) {
        const fx = bx + sw * .38, fy = by;
        c.strokeStyle = '#3b7a2e'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(bx * .5, -3); c.lineTo(fx, fy); c.stroke();
        if (st === 2) {
          for (let p = 0; p < 8; p++) {
            const a = (p / 8) * Math.PI * 2;
            ART.ell(c, fx + Math.cos(a) * 4.2 * sc, fy + Math.sin(a) * 3.6 * sc, 2.2 * sc, 1.6 * sc, '#ffffff', '#cbd5e1', .5);
          }
          ART.ell(c, fx, fy, 2.6 * sc, 2.3 * sc, '#f59e0b', '#b45309', .6);
          ART.ell(c, fx - .6 * sc, fy - .6 * sc, 1.1 * sc, .9 * sc, '#fde047');
        } else {
          ART.ell(c, fx, fy, 2.8 * sc, 2.8 * sc, '#fef08a', ART.OUT, .6);
        }
      }
    }
    else if (k === 'cosmos') {
      // Pastel Pink & Magenta Autumn Cosmos swaying on slender stems
      ART.ell(c, 0, -1, 12, 5, '#593d25');
      const cosmosList = [
        { x: -8, y: -22, sc: .88, c: '#ff85a2', d: '#c9184a' },
        { x: 8, y: -24, sc: .9, c: '#fbcfe8', d: '#db2777' },
        { x: -3.5, y: -30, sc: 1, c: '#f472b6', d: '#9d174d' },
        { x: 4.5, y: -32, sc: .96, c: '#ffffff', d: '#ec4899' },
        { x: 0, y: -20, sc: .92, c: '#ff9ebb', d: '#be185d' }
      ];
      for (const fl of cosmosList) {
        const fx = fl.x + sw * .55, fy = fl.y, sc = fl.sc;
        c.strokeStyle = '#4d9138'; c.lineWidth = 1.4; c.beginPath();
        c.moveTo(fl.x * .35, 0); c.quadraticCurveTo(fl.x * .7 + sw * .25, fy * .5, fx, fy); c.stroke();
        // Feathery cosmos leaves
        ART.ell(c, fl.x * .6 - 3, fy * .45, 3.8, 1.2, '#5eb346');
        ART.ell(c, fl.x * .6 + 3, fy * .55, 3.8, 1.2, '#5eb346');
        if (st === 2) {
          for (let p = 0; p < 8; p++) {
            const a = (p / 8) * Math.PI * 2 + .2;
            ART.ell(c, fx + Math.cos(a) * 5.2 * sc, fy + Math.sin(a) * 4.5 * sc, 2.8 * sc, 2.1 * sc, fl.c, fl.d, .55);
          }
          ART.ell(c, fx, fy, 2.5 * sc, 2.2 * sc, '#fbbf24', '#92400e', .6);
        } else {
          ART.ell(c, fx, fy, 3 * sc, 3 * sc, fl.c, ART.OUT, .6);
        }
      }
    }
    else if (k === 'hydrangea') {
      // Lush Pastel Blue, Periwinkle & Lilac Hydrangea Pom-Pom Bush
      ART.ell(c, 0, -1, 14, 6, '#563a23');
      for (const [lx, ly, r, col] of [[-8, -8, 9, '#2b6cb0'], [8, -8, 9, '#2c5282'], [-5, -14, 10, '#2f855a'], [5, -14, 10, '#38a169'], [0, -11, 11, '#48bb78']]) {
        if (ly > -10 && col.startsWith('#2b')) continue;
        ART.ell(c, lx + sw * .25, ly, r, r * .8, col, ART.OUT, .8);
      }
      const heads = [
        { x: -7.5, y: -14, r: 6.8, base: '#63b3ed', mid: '#90cdf4', hi: '#ebf8ff' },
        { x: 7.5, y: -15, r: 6.8, base: '#b794f4', mid: '#d6bcfa', hi: '#faf5ff' },
        { x: 0, y: -19, r: 7.6, base: '#7f9cf5', mid: '#a3bffa', hi: '#ebf4ff' },
        { x: -4.5, y: -24, r: 6.5, base: '#f687b3', mid: '#fbb6ce', hi: '#fff5f7' },
        { x: 5, y: -24, r: 6.6, base: '#63b3ed', mid: '#bee3f8', hi: '#ffffff' }
      ];
      for (const h of heads) {
        const hx = h.x + sw * .35, hy = h.y, r = st === 2 ? h.r : h.r * .65;
        ART.ell(c, hx, hy, r, r * .88, h.base, ART.OUT, .8);
        if (st === 2) {
          for (let f = 0; f < 7; f++) {
            const a = (f / 7) * Math.PI * 2;
            const fx = hx + Math.cos(a) * r * .48, fy = hy + Math.sin(a) * r * .42;
            ART.ell(c, fx, fy, 2.8, 2.5, h.mid, h.base, .5);
            ART.ell(c, fx, fy, .9, .9, h.hi);
          }
          ART.ell(c, hx, hy, 3.2, 2.8, h.hi);
        }
      }
    }
    else if (k === 'lily') {
      // Royal Stargazer & White Madonna Lilies with Trumpet Blooms
      ART.ell(c, 0, -1, 12, 5, '#593d25');
      for (let i = -3; i <= 3; i++) {
        const lx = i * 3.2;
        c.fillStyle = i % 2 ? '#2f7a38' : '#3f9142';
        c.beginPath(); c.moveTo(lx * .5, 0); c.quadraticCurveTo(lx * 1.6, -10, lx * 2.1, -18); c.quadraticCurveTo(lx * 1.1, -8, lx * .2, 0); c.fill();
      }
      const lilies = [[-7, -23, .9, '#fff5f7', '#e53e3e'], [7, -24, .9, '#ffffff', '#ecc94b'], [-2, -31, 1.05, '#fed7e2', '#d53f8c'], [3.5, -28, .95, '#ffffff', '#f6ad55']];
      for (const [lx, ly, sc, col, core] of lilies) {
        const fx = lx + sw * .45, fy = ly;
        c.strokeStyle = '#2f7a38'; c.lineWidth = 1.8; c.beginPath(); c.moveTo(lx * .4, 0); c.lineTo(fx, fy); c.stroke();
        if (st === 2) {
          for (let p = 0; p < 6; p++) {
            const a = (p / 6) * Math.PI * 2;
            ART.ell(c, fx + Math.cos(a) * 5.2 * sc, fy + Math.sin(a) * 4.4 * sc, 3.4 * sc, 2.0 * sc, col, '#b83280', .55);
          }
          ART.ell(c, fx, fy, 2.2 * sc, 2.0 * sc, core);
        } else {
          ART.ell(c, fx, fy - 2, 2.6 * sc, 5 * sc, col, ART.OUT, .6);
        }
      }
    }
    else if (k === 'hibiscus') {
      // Tropical Hibiscus & Mugunghwa Shrub: glossy dark-emerald foliage + exotic blooms with long golden stamens
      ART.ell(c, 0, -1, 14, 6, '#563a23');
      for (const [px, py, r, c0] of [[-8, -9, 9, '#1e5631'], [8, -9, 9, '#26693c'], [-5, -17, 10, '#2e7d47'], [5, -17, 10, '#399154'], [0, -23, 11, '#44a361']]) {
        ART.ell(c, px + sw * .3, py, r, r * .82, c0, ART.OUT, .8);
      }
      if (st === 2) {
        const blooms = [[-7, -13, '#ff4d6d', '#fff0f3'], [7, -14, '#ff758f', '#fff0f3'], [-4, -23, '#f72585', '#fdeff4'], [5, -22, '#ff9e00', '#fff8e6'], [0, -17, '#ff4d6d', '#ffffff']];
        for (const [bx, by, col, hi] of blooms) {
          const fx = bx + sw * .35, fy = by;
          for (let p = 0; p < 5; p++) {
            const a = (p / 5) * Math.PI * 2 - .3;
            ART.ell(c, fx + Math.cos(a) * 4.2, fy + Math.sin(a) * 3.8, 3.2, 2.6, col, '#800f2f', .6);
          }
          ART.ell(c, fx, fy, 2.4, 2.1, '#800f2f');
          c.strokeStyle = '#ffd166'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(fx, fy); c.lineTo(fx + 3.5, fy - 3.5); c.stroke();
          ART.ell(c, fx + 3.8, fy - 3.8, 1.3, 1.3, '#ffd166');
          ART.ell(c, fx - 1, fy - 1, .9, .9, hi);
        }
      }
    }
    else if (k === 'bamboo') {
      // Zen Emerald Bamboo Grove: 4 segmented culms with nodes + feathery bamboo leaf sprays
      ART.ell(c, 0, -1, 13, 5.5, '#4f6d3a');
      const stalks = [[-6.5, 42, '#5c9e31'], [-2, 50, '#72b840'], [3, 46, '#64ab35'], [7, 38, '#53912b']];
      for (const [sx0, h, col] of stalks) {
        const swayX = sw * .45;
        c.strokeStyle = col; c.lineWidth = 3.2; c.beginPath();
        c.moveTo(sx0, 0); c.quadraticCurveTo(sx0 + swayX * .4, -h * .5, sx0 + swayX, -h); c.stroke();
        // Bamboo nodes (rings)
        c.strokeStyle = '#dcfce7'; c.lineWidth = 1.2;
        for (let ny = 9; ny < h - 4; ny += 9) {
          const nx = sx0 + swayX * (ny / h);
          c.beginPath(); c.moveTo(nx - 2, -ny); c.lineTo(nx + 2, -ny); c.stroke();
        }
        // Feathery leaf clusters along top half
        for (const ly of [h * .55, h * .78, h]) {
          const lx = sx0 + swayX * (ly / h);
          for (const dir of [-1, 1]) {
            ART.ell(c, lx + dir * 5.5, -ly - 1, 5.5, 1.8, '#65c438', '#1e4d14', .6);
            ART.ell(c, lx + dir * 4, -ly + 2, 4.5, 1.5, '#86efac', '#1e4d14', .5);
          }
        }
      }
    }
    else if (k === 'willow') {
      // Graceful Weeping Willow: twisting warm trunk + cascading curtain of emerald willow fronds
      c.fillStyle = '#5c3a24'; c.beginPath();
      c.moveTo(-5.5, 0); c.quadraticCurveTo(-3, -14, -2, -28); c.lineTo(2.5, -28); c.quadraticCurveTo(3.5, -14, 5.5, 0); c.closePath();
      c.fill(); c.strokeStyle = '#382010'; c.lineWidth = .9; c.stroke();
      // Crown dome
      for (const [px, py, rx, ry, col] of [[-11, -32, 12, 9, '#3d7a36'], [11, -32, 12, 9, '#488c40'], [-6, -40, 13, 10, '#58a34e'], [6, -40, 13, 10, '#68b55c'], [0, -45, 13, 9, '#82cc74']]) {
        ART.ell(c, px + sw * .3, py, rx, ry, col, ART.OUT, .75);
      }
      // Hanging weeping willow curtains swaying in the breeze
      for (let i = -7; i <= 7; i++) {
        const vx = i * 2.4 + sw * .3, topY = -36 - (7 - Math.abs(i)) * 1.2, len = 20 + (i % 3) * 4;
        const tipX = vx + sw * 1.1;
        c.strokeStyle = i % 2 ? '#58a84c' : '#7ad16b'; c.lineWidth = 1.4;
        c.beginPath(); c.moveTo(vx, topY); c.quadraticCurveTo((vx + tipX) * .5, topY + len * .5, tipX, topY + len); c.stroke();
        if (st === 2) {
          for (let d = .3; d <= .95; d += .3) {
            ART.ell(c, vx + (tipX - vx) * d, topY + len * d, 1.6, 2.8, i % 2 ? '#8ce07c' : '#65b858');
          }
        }
      }
    }
    else if (k === 'palm') {
      // Tropical Coconut Palm: curved ringed trunk + coconuts + 7 sweeping fan fronds
      c.strokeStyle = '#7c5333'; c.lineWidth = 5.5; c.lineCap = 'round';
      c.beginPath(); c.moveTo(0, -1); c.quadraticCurveTo(4, -18, 2 + sw * .4, -38); c.stroke();
      c.strokeStyle = '#52341d'; c.lineWidth = 1.1;
      for (let h = 5; h < 36; h += 5) {
        const tx = (h / 38) * 2.5;
        c.beginPath(); c.moveTo(tx - 2.6, -h); c.lineTo(tx + 2.6, -h - 1); c.stroke();
      }
      const topX = 2 + sw * .4, topY = -39;
      if (st === 2) {
        for (const [cx, cy] of [[-2.8, 2], [2.8, 2.2], [0, 3.6]]) {
          ART.ell(c, topX + cx, topY + cy, 3.2, 3.0, '#5c3818', ART.OUT, .7);
        }
      }
      const fronds = [[-22, -6], [-18, 7], [-10, -14], [10, -14], [18, 7], [22, -6], [0, -17]];
      for (const [dx, dy] of fronds) {
        const fx = topX + dx + sw * .5, fy = topY + dy;
        c.fillStyle = dy < -8 ? '#65bf47' : '#4a9e33';
        c.beginPath(); c.moveTo(topX, topY);
        c.quadraticCurveTo(topX + dx * .55, topY + dy * .2 - 8, fx, fy);
        c.quadraticCurveTo(topX + dx * .55, topY + dy * .2 - 2, topX, topY);
        c.fill(); c.strokeStyle = '#255918'; c.lineWidth = .7; c.stroke();
      }
    }
    else if (k === 'pine') {
      // Majestic Evergreen Pine: sturdy bark trunk with root flare + 5 layered sweeping tiered boughs
      // Root flare and textured trunk
      c.fillStyle = '#442616';
      c.beginPath();
      c.moveTo(-4.5, 0); c.lineTo(-2.8, -12); c.lineTo(2.8, -12); c.lineTo(4.5, 0); c.closePath();
      c.fill();
      c.strokeStyle = '#27140a'; c.lineWidth = .9; c.stroke();
      // Bark grain lines
      c.strokeStyle = '#5a3720'; c.lineWidth = .8; c.beginPath();
      c.moveTo(-1.2, 0); c.lineTo(-1, -11); c.moveTo(1.2, 0); c.lineTo(1, -11); c.stroke();

      // 4 tiered cascading pine foliage boughs
      const tiers = [
        { y: -10, w: 17, h: 14, dark: '#1b3f27', mid: '#285836', hi: '#3c754d' },
        { y: -20, w: 14.5, h: 13, dark: '#1e472c', mid: '#2e663f', hi: '#468658' },
        { y: -29, w: 11.5, h: 12, dark: '#245233', mid: '#357548', hi: '#509664' },
        { y: -38, w: 7.5, h: 13, dark: '#2b5f3b', mid: '#3d8653', hi: '#5eb076' }
      ];
      for (const t of tiers) {
        const w = t.w, y = t.y, h = t.h, topY = y - h, wsw = sw * .4 * (1 - y / -40);
        // Tier shadow underneath
        c.fillStyle = t.dark; c.beginPath();
        c.moveTo(-w, y);
        c.quadraticCurveTo(-w * .5, y + 2, 0, y + 2.5);
        c.quadraticCurveTo(w * .5, y + 2, w, y);
        c.lineTo(wsw, topY); c.closePath();
        c.fill();
        // Top vibrant foliage face
        c.fillStyle = t.mid; c.beginPath();
        c.moveTo(-w, y);
        // Sawtooth pine needle fronds
        for (let i = -4; i <= 4; i++) {
          const fx = (i / 4) * w, fy = y - (i % 2 === 0 ? 0 : 2);
          c.lineTo(fx, fy);
        }
        c.lineTo(w, y); c.lineTo(wsw, topY); c.closePath();
        c.fill();
        c.strokeStyle = ART.OUT; c.lineWidth = .8; c.stroke();
        // Sunlit edge highlights on top needles
        c.strokeStyle = t.hi; c.lineWidth = 1.3; c.beginPath();
        c.moveTo(-w * .7, y - 2); c.lineTo(wsw, topY + 1); c.lineTo(w * .7, y - 2); c.stroke();
      }
      // Woodland pinecones on tier 1 & 2
      if (st === 2) {
        for (const [px, py] of [[-9, -9], [8, -9.5], [-7, -19], [6.5, -19.5]]) {
          ART.ell(c, px, py, 2.2, 3.2, '#5e381c', '#381f0d', .6);
          c.fillStyle = '#875630'; c.fillRect(px - 1, py - 1, 2, 1);
        }
      }
    }
    else {
      // Deciduous Trees: Cherry (🌸), Maple (🍁), Ginkgo (🍂), Peach (🍑), Orange (🍊), Apple (🍎)
      // Sculpted organic trunk with roots and spreading branches
      c.fillStyle = '#5c3722';
      c.beginPath();
      c.moveTo(-5, 0); c.quadraticCurveTo(-3, -12, -2.5, -22);
      c.lineTo(-6, -28); c.lineTo(-4, -28); c.lineTo(-1, -24); // Left branch
      c.lineTo(4, -29); c.lineTo(6, -29); c.lineTo(1.5, -23);  // Right branch
      c.lineTo(3, -12); c.lineTo(5, 0); c.closePath();
      c.fill();
      c.strokeStyle = '#381f11'; c.lineWidth = .9; c.stroke();
      // Trunk bark grain & shadow
      c.strokeStyle = '#7c4d32'; c.lineWidth = 1; c.beginPath();
      c.moveTo(-1.5, -2); c.lineTo(-1, -16); c.moveTo(1.2, -2); c.lineTo(.8, -14); c.stroke();

      // Multi-layered lush canopy cloud puffs
      const colMap = {
        cherry: {
          deep: '#d96c8a', mid: '#f89ab4', light: '#fcc5d6', hi: '#fff0f5',
          blossom: '#ffecf2', center: '#f5cd47'
        },
        maple: {
          deep: '#9c2415', mid: '#cf4622', light: '#ea6e2e', hi: '#f9a73e',
          leaf: '#f39c12'
        },
        ginkgo: {
          deep: '#b47b09', mid: '#eab308', light: '#facc15', hi: '#fef08a',
          leaf: '#fde047'
        },
        peach: {
          deep: '#2f6e3b', mid: '#489956', light: '#68bd76', hi: '#9ae6a7'
        },
        orange: {
          deep: '#1f5c2e', mid: '#318243', light: '#4ea860', hi: '#7ed98f'
        },
        apple: {
          deep: '#2f6627', mid: '#4a8f3b', light: '#6cb556', hi: '#8dd973'
        }
      };
      const pal = colMap[k] || colMap.apple;

      // Canopy puff spheres (layered for depth and isometric fullness)
      const puffs = [
        { x: -11, y: -26, r: 12.5 }, { x: 11, y: -27, r: 12.5 },
        { x: -14, y: -36, r: 11 }, { x: 14, y: -35, r: 11 },
        { x: 0, y: -30, r: 14 }, { x: -6, y: -43, r: 12 }, { x: 6, y: -43, r: 12 },
        { x: 0, y: -48, r: 11 }
      ];

      // Draw volumetric puffs with cast underside shadows & warm top lighting
      for (const p of puffs) {
        const px = p.x + sw * .35 * (1 - p.y / -60), py = p.y, r = p.r;
        // Deep shadow under puff
        ART.ell(c, px, py + 1.5, r, r * .86, pal.deep, ART.OUT, .8);
        // Vibrant midtone foliage body
        ART.ell(c, px, py, r * .92, r * .8, pal.mid);
        // Upper sunlit volume
        ART.ell(c, px - r * .15, py - r * .22, r * .68, r * .54, pal.light);
        // Gloss highlight crown
        ART.ell(c, px - r * .2, py - r * .42, r * .38, r * .26, pal.hi);
      }

      if ((k === 'apple' || k === 'peach' || k === 'orange') && st === 2) {
        const fruitPts = [
          [-10, -24], [9, -25], [-2, -22], [-13, -33], [4, -32],
          [13, -34], [-6, -40], [8, -41], [-1, -47]
        ];
        for (const [ax, ay] of fruitPts) {
          const appX = ax + sw * .35, appY = ay;
          c.strokeStyle = '#4e331c'; c.lineWidth = 1; c.beginPath();
          c.moveTo(appX, appY - 3.8); c.lineTo(appX + 1, appY - 6.5); c.stroke();
          ART.ell(c, appX + 2.5, appY - 6.2, 2, 1.2, '#5ea83c');
          if (k === 'peach') {
            ART.ell(c, appX, appY, 3.7, 3.5, '#ff758f', '#9d174d', .7);
            ART.ell(c, appX - .6, appY - .8, 2.5, 2.2, '#ffb3c6');
            ART.ell(c, appX - 1.1, appY - 1.3, 1.1, 1.0, '#fff0f3');
          } else if (k === 'orange') {
            ART.ell(c, appX, appY, 3.6, 3.5, '#f97316', '#9a3412', .7);
            ART.ell(c, appX - .6, appY - .8, 2.4, 2.2, '#fb923c');
            ART.ell(c, appX - 1.1, appY - 1.3, 1.0, 1.0, '#ffedd5');
          } else {
            ART.ell(c, appX, appY, 3.6, 3.4, '#d8182d', '#7d0d1a', .7);
            ART.ell(c, appX - .6, appY - .8, 2.4, 2.2, '#f03a4e');
            ART.ell(c, appX - 1.2, appY - 1.4, 1, 1, '#ffffff');
          }
        }
      }
      else if (k === 'cherry' && st === 2) {
        // Delicate sakura blossom flowers dotted on canopy
        const flowers = [
          [-8, -25], [7, -27], [-1, -24], [-11, -34], [3, -33],
          [12, -36], [-5, -42], [7, -43], [0, -48]
        ];
        for (const [fx, fy] of flowers) {
          const flX = fx + sw * .35, flY = fy;
          for (let p = 0; p < 5; p++) {
            const ang = (p / 5) * Math.PI * 2;
            ART.ell(c, flX + Math.cos(ang) * 2.2, flY + Math.sin(ang) * 2.2, 1.6, 1.3, pal.blossom, '#e07d9b', .4);
          }
          ART.ell(c, flX, flY, 1.1, 1.1, pal.center);
        }
        // Drifting, fluttering cherry petals in the wind
        for (let i = 0; i < 5; i++) {
          const prog = (T * .28 + i * .2 + o.x * .12) % 1;
          const px = -14 + i * 7 + Math.sin(T * 2 + i) * 6;
          const py = -42 + prog * 44;
          const alpha = Math.sin(prog * Math.PI);
          ART.ell(c, px, py, 2.2, 1.4, 'rgba(255,215,228,' + alpha.toFixed(2) + ')');
        }
      }
      else if ((k === 'maple' || k === 'ginkgo') && st === 2) {
        // Fluttering autumn leaves (crimson-amber for maple, bright gold fan leaves for ginkgo)
        const leafRgb = k === 'ginkgo' ? '250,204,21' : '243,156,18';
        for (let i = 0; i < 4; i++) {
          const prog = (T * .25 + i * .25 + o.x * .15) % 1;
          const px = -12 + i * 8 + Math.cos(T * 1.8 + i) * 5;
          const py = -40 + prog * 42;
          const alpha = Math.sin(prog * Math.PI);
          ART.ell(c, px, py, 2.6, 1.8, 'rgba(' + leafRgb + ',' + alpha.toFixed(2) + ')');
        }
      }
    }
    c.restore();
  }
  // ---------------- v1.24: more decorations ----------------
  const _statues = new Map();
  function statueImg(sp, tint) { // a pet drawn once on its own little canvas, then tinted bronze / gold (source-atop only touches the pet)
    const key = sp + tint; let cv = _statues.get(key); if (cv) return cv;
    cv = document.createElement('canvas'); cv.width = cv.height = 120; const g = cv.getContext('2d');
    g.translate(60, 100); g.scale(1, 1); ART.pet(g, sp, { t: 0, seed: 777, age: 1, mood: 'happy' });
    g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-atop'; g.fillStyle = tint; g.fillRect(0, 0, 120, 120);
    g.globalCompositeOperation = 'source-over'; _statues.set(key, cv); return cv;
  }
  function drawDeco2(c, o, T, f, cx, cy, q, lit) {
    const k = o.k, sh2 = (x0, y0, x1, y1, col) => poly(c, [Q(x0, y0), Q(x1, y0), Q(x1, y1), Q(x0, y1)], col);
    const pole = (x, y, z0, z1, col, lw) => { const a = Q(x, y, z0), b = Q(x, y, z1); c.strokeStyle = col; c.lineWidth = lw || 2; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); };
    const shadow = (rx, ry) => ART.ell(c, q[0], q[1], rx, ry, 'rgba(0,0,0,.13)');
    const emo = (e, z, px) => { const p = Q(cx, cy, z); c.font = (px || 14) + 'px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#000'; c.fillText(e, p[0], p[1]); c.textAlign = 'start'; };
    switch (k) {
      case 'fence': { const [a, b] = [[o.x + .05, cy], [o.x + .95, cy]];
        for (const z of [5, 10]) { const p = Q(a[0], a[1], z), r2 = Q(b[0], b[1], z); c.strokeStyle = '#b07a44'; c.lineWidth = 2.2; c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(r2[0], r2[1]); c.stroke(); }
        for (let i = 0; i <= 2; i++) { const u = i / 2, x = a[0] + (b[0] - a[0]) * u, y = a[1] + (b[1] - a[1]) * u; pole(x, y, 0, 13, '#8a5a33', 2.4); } return true; }
      case 'hedge': blk(c, o.x + .08, o.y + .08, .84, .84, 0, 10, '#5fa24e'); for (let i = 0; i < 4; i++) { const p = Q(o.x + .25 + (i % 2) * .5, o.y + .25 + (i >> 1) * .5, 10); ART.ell(c, p[0], p[1], 5, 3, '#6fb85c'); } return true;
      case 'flowerbed': { const w = 1.8, d = .8; blk(c, o.x + .1, o.y + .1, w, d, 0, 5, '#a8703a'); sh2(o.x + .18, o.y + .18, o.x + .1 + w - .08, o.y + .1 + d - .08, '#6b4a2e');
        const cols = ['#ff6b8a', '#ffd23a', '#b58aff', '#ff9e4a', '#fff'];
        for (let i = 0; i < 8; i++) { const u = (i % 4 + .5) / 4, v = ((i >> 2) + .5) / 2, p = Q(o.x + .1 + w * u, o.y + .1 + d * v, 7); ART.ell(c, p[0], p[1] + 2, 1, 3, '#4f9a44'); ART.ell(c, p[0], p[1] - 1, 2.6, 2.2, cols[i % 5], 'rgba(60,38,25,.5)', .5); } return true; }
      case 'signpost': shadow(6, 3); pole(cx, cy, 0, 26, '#8a5a33', 3);
        for (const [z, dir, col] of [[22, (o.r % 2 ? -1 : 1), '#f2d9a8'], [15, (o.r % 2 ? 1 : -1), '#e8c38a']]) { const p = Q(cx, cy, z); c.save(); c.translate(p[0], p[1]); c.beginPath(); c.moveTo(-8 * dir, -3); c.lineTo(8 * dir, -3); c.lineTo(11 * dir, 0); c.lineTo(8 * dir, 3); c.lineTo(-8 * dir, 3); c.closePath(); c.fillStyle = col; c.fill(); c.strokeStyle = ART.OUT; c.lineWidth = .8; c.stroke(); c.restore(); } return true;
      case 'mailbox': shadow(7, 3); pole(cx, cy, 0, 12, '#555', 3); blk(c, cx - .22, cy - .15, .44, .3, 12, 11, '#e0443a'); { const p = Q(cx + .22, cy, 18); c.fillStyle = '#fff'; c.fillRect(p[0] - 2, p[1] - 1, 4, 2); } return true;
      case 'topiary': shadow(8, 4); blk(c, cx - .2, cy - .2, .4, .4, 0, 6, '#c98a55'); { const p = Q(cx, cy, 14), dir = (o.r % 2) ? -1 : 1; ART.ell(c, p[0], p[1], 8, 7, '#5fa24e', ART.OUT, .8); ART.ell(c, p[0] - 3, p[1] - 10, 2.4, 6, '#5fa24e', ART.OUT, .8); ART.ell(c, p[0] + 3, p[1] - 10, 2.4, 6, '#5fa24e', ART.OUT, .8); ART.ell(c, p[0] + 7 * dir, p[1] + 3, 3, 3, '#6fb85c', ART.OUT, .6); } return true; // a bunny-shaped hedge
      case 'stonelamp': shadow(8, 4); blk(c, cx - .25, cy - .25, .5, .5, 0, 3, '#b8b2a6'); blk(c, cx - .08, cy - .08, .16, .16, 3, 10, '#c9c4b8'); blk(c, cx - .2, cy - .2, .4, .4, 13, 7, '#d8d2c4');
        { const p = Q(cx, cy, 16); if (lit) { c.globalAlpha = .45; ART.ell(c, p[0], p[1], 8, 6, '#ffe68a'); c.globalAlpha = 1; } } blk(c, cx - .28, cy - .28, .56, .56, 20, 3, '#a8a296'); return true;
      case 'flagpole': { shadow(6, 3); pole(cx, cy, 0, 44, '#c9ccd1', 2); const p = Q(cx, cy, 44), w = Math.sin(T * 4 + o.x) * 2, dir = (o.r % 2) ? -1 : 1;
        c.beginPath(); c.moveTo(p[0], p[1]); c.quadraticCurveTo(p[0] + 9 * dir, p[1] + 2 + w, p[0] + 18 * dir, p[1] + w); c.lineTo(p[0] + 18 * dir, p[1] + 11 + w); c.quadraticCurveTo(p[0] + 9 * dir, p[1] + 13 + w, p[0], p[1] + 11); c.closePath(); c.fillStyle = '#ff7aa8'; c.fill(); c.strokeStyle = ART.OUT; c.lineWidth = .8; c.stroke();
        c.font = '7px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#000'; c.fillText('🐾', p[0] + 9 * dir, p[1] + 8 + w * .5); c.textAlign = 'start'; ART.ell(c, p[0], p[1] - 1, 2, 2, '#ffd23a'); return true; }
      case 'picnic': { const w = 1.8, d = .8; shadow(16, 7);
        blk(c, o.x + .2, o.y + .35, w - .2, .3, 6, 2, '#b07a44'); // table top below cloth
        blk(c, o.x + .1, o.y + .1, w, d, 0, 3, '#a8703a');
        sh2(o.x + .25, o.y + .25, o.x + w - .05, o.y + d - .05, '#e8534f'); for (let i = 0; i < 4; i++) { const p = Q(o.x + .3 + i * (w - .4) / 3.5, o.y + .3 + i * (d - .4) / 3.5, 1); ART.ell(c, p[0], p[1], 2.5, 1.3, '#fff'); }
        emo('🧺', 10, 13); return true; }
      case 'phonebooth': shadow(8, 4); blk(c, cx - .3, cy - .3, .6, .6, 0, 30, '#d8343a'); { const p0 = Q(cx - .2, cy + .3, 8), p1 = Q(cx + .2, cy + .3, 26); c.fillStyle = 'rgba(190,230,250,.8)'; c.fillRect(Math.min(p0[0], p1[0]), p1[1], Math.abs(p1[0] - p0[0]), Math.abs(p0[1] - p1[1])); } blk(c, cx - .33, cy - .33, .66, .66, 30, 3, '#b82a30'); emo('☎️', 36, 9); return true;
      case 'well': shadow(10, 5); { const p = Q(cx, cy, 0); ART.ell(c, p[0], p[1] - 4, 11, 6, '#9a948a', ART.OUT, 1); ART.ell(c, p[0], p[1] - 9, 11, 6, '#b8b2a6', ART.OUT, 1); ART.ell(c, p[0], p[1] - 9, 8, 4, '#3a5a7a'); }
        pole(cx - .3, cy, 4, 26, '#8a5a33', 2); pole(cx + .3, cy, 4, 26, '#8a5a33', 2); { const a = Q(cx - .38, cy, 24), b = Q(cx + .38, cy, 24), top = Q(cx, cy, 33); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(top[0], top[1]); c.lineTo(b[0], b[1]); c.closePath(); c.fillStyle = '#c0533f'; c.fill(); c.strokeStyle = ART.OUT; c.lineWidth = .8; c.stroke(); } emo('🪣', 16, 8); return true;
      case 'dogstatue': case 'catstatue': shadow(9, 4); blk(c, cx - .3, cy - .3, .6, .6, 0, 9, '#d8d2c4'); blk(c, cx - .35, cy - .35, .7, .7, 9, 2, '#c9c4b8');
        { const p = Q(cx, cy, 11), im = statueImg(k === 'dogstatue' ? 'shiba' : 'kitten', 'rgba(196,150,80,.8)'), flip = (o.r % 2) ? -1 : 1; c.save(); c.translate(p[0], p[1]); c.scale(flip, 1); c.drawImage(im, -30, -50, 60, 60); c.restore(); } return true; // bronze-tinted pet on a plinth
      case 'sandbox': blk(c, o.x + .1, o.y + .1, 1.8, 1.8, 0, 3, '#c98a55'); sh2(o.x + .2, o.y + .2, o.x + 1.8, o.y + 1.8, '#f2d9a0'); { const p = Q(o.x + 1.3, o.y + 1.2, 3); ART.ell(c, p[0], p[1], 9, 5, '#e8c890', 'rgba(150,110,60,.5)', .6); } emo('🪣', 5, 11); { const p = Q(o.x + .6, o.y + 1.4, 3); c.font = '10px sans-serif'; c.fillStyle = '#000'; c.fillText('🏰', p[0] - 5, p[1]); } return true;
      case 'heartarch': { const [a, b] = [[o.x + .2, cy], [o.x + 1.8, cy]]; pole(a[0], a[1], 0, 26, '#fff', 3); pole(b[0], b[1], 0, 26, '#fff', 3);
        const p = Q(a[0], a[1], 26), r2 = Q(b[0], b[1], 26), m = [(p[0] + r2[0]) / 2, (p[1] + r2[1]) / 2 - 14]; c.beginPath(); c.moveTo(p[0], p[1]); c.quadraticCurveTo(m[0], m[1] - 10, r2[0], r2[1]); c.lineWidth = 4; c.strokeStyle = '#ff9ab8'; c.stroke();
        for (let i = 0; i <= 8; i++) { const u = i / 8, x = (1 - u) * (1 - u) * p[0] + 2 * u * (1 - u) * m[0] + u * u * r2[0], y = (1 - u) * (1 - u) * p[1] + 2 * u * (1 - u) * (m[1] - 10) + u * u * r2[1]; ART.ell(c, x, y, 2.6, 2.3, i % 2 ? '#ff6b9a' : '#fff'); }
        c.font = '14px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#000'; c.fillText('💗', m[0], m[1] + 2); c.textAlign = 'start'; return true; }
      case 'pond': poly(c, [Q(o.x + .15, o.y + .5), Q(o.x + .6, o.y + .12), Q(o.x + 1.5, o.y + .15), Q(o.x + 1.88, o.y + .7), Q(o.x + 1.7, o.y + 1.7), Q(o.x + .9, o.y + 1.9), Q(o.x + .2, o.y + 1.5)], '#8fcbe8', '#b8b2a6', 2.5);
        for (const [u, v] of [[.6, .7], [1.3, 1.2], [1.1, .5]]) { const p = Q(o.x + u, o.y + v); ART.ell(c, p[0], p[1], 4, 2, '#5fa24e'); }
        { const p = Q(o.x + 1 + Math.sin(T * .4) * .35, o.y + 1 + Math.cos(T * .4) * .3); c.font = '12px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#000'; c.fillText('🦆', p[0], p[1]); c.textAlign = 'start'; } return true;
      case 'monument': shadow(9, 4); blk(c, cx - .35, cy - .35, .7, .7, 0, 4, '#b8b2a6'); { const b0 = Q(cx - .18, cy + .18, 4), b1 = Q(cx + .18, cy + .18, 4), t0 = Q(cx - .12, cy + .12, 40), t1 = Q(cx + .12, cy + .12, 40), tp = Q(cx, cy, 46), e0 = Q(cx + .18, cy - .18, 4), e1 = Q(cx + .12, cy - .12, 40);
        poly(c, [b0, b1, t1, t0], '#d8d2c4', ART.OUT, 1); poly(c, [b1, e0, e1, t1], '#c2bcb0', ART.OUT, 1); poly(c, [t0, t1, tp], '#e8e4dc', ART.OUT, 1); poly(c, [t1, e1, tp], '#d0cabe', ART.OUT, 1);
        const m = Q(cx, cy + .18, 16); c.fillStyle = '#c9a227'; c.fillRect(m[0] - 4, m[1] - 5, 8, 6); } return true;
      case 'gazebo': { sh2(o.x + .1, o.y + .1, o.x + 1.9, o.y + 1.9, '#e8dcc4'); blk(c, o.x + .2, o.y + .2, 1.6, 1.6, 0, 2, '#d8c8a8');
        for (const [u, v] of [[.35, .35], [1.65, .35], [1.65, 1.65], [.35, 1.65]]) pole(o.x + u, o.y + v, 2, 26, '#fff', 3);
        const pk = Q(o.x + 1, o.y + 1, 42), cs = [[.1, .1], [1.9, .1], [1.9, 1.9], [.1, 1.9]].map(([u, v]) => Q(o.x + u, o.y + v, 26));
        const faces = [[0, 1, '#e98aa8'], [1, 2, '#d5708f'], [2, 3, '#f0a0ba'], [3, 0, '#df7d9c']];
        faces.sort((a, b) => (cs[a[0]][1] + cs[a[1]][1]) - (cs[b[0]][1] + cs[b[1]][1]));
        for (const [i0, i1, col] of faces) poly(c, [cs[i0], cs[i1], pk], col, ART.OUT, 1);
        ART.ell(c, pk[0], pk[1] - 2, 2.5, 2.5, '#ffd23a'); return true; }
      case 'windmill': {
        blk(c, o.x + .45, o.y + .45, 1.1, 1.1, 0, 12, '#b8afa2');
        blk(c, o.x + .5, o.y + .5, 1, 1, 12, 28, '#f4efe4');
        const tp = Q(o.x + 1, o.y + 1, 52), cs = [[.42, .42], [1.58, .42], [1.58, 1.58], [.42, 1.58]].map(([u, v]) => Q(o.x + u, o.y + v, 40));
        const faces = [[0, 1, '#8c3f2b'], [3, 0, '#9e4832'], [1, 2, '#a8503a'], [2, 3, '#c0633f']];
        faces.sort((a, b) => (cs[a[0]][1] + cs[a[1]][1]) - (cs[b[0]][1] + cs[b[1]][1]));
        for (const [i0, i1, col] of faces) poly(c, [cs[i0], cs[i1], tp], col, ART.OUT, 1);
        const hub = Q(o.x + 1.15, o.y + 1.56, 38), dir = (o.r === 1 || o.r === 2) ? -1 : 1;
        for (let i = 0; i < 4; i++) {
          const a = T * 1.35 * dir + i * Math.PI / 2;
          c.save(); c.translate(hub[0], hub[1]); c.rotate(a);
          c.fillStyle = '#fff8eb'; c.fillRect(-2, -27, 7.5, 23);
          c.strokeStyle = '#7a4b28'; c.lineWidth = 1; c.strokeRect(-2, -27, 7.5, 23);
          c.beginPath(); c.moveTo(-2, -19); c.lineTo(5.5, -19); c.moveTo(-2, -11); c.lineTo(5.5, -11); c.moveTo(0, 0); c.lineTo(0, -27); c.stroke();
          c.restore();
        }
        ART.ell(c, hub[0], hub[1], 3.5, 3.5, '#7a4b28', '#fff', .8);
        const dr = Q(o.x + 1, o.y + 1.52, 0); c.fillStyle = '#7a4b28'; c.fillRect(dr[0] - 3, dr[1] - 10, 6, 10);
        return true;
      }
      case 'goldstatue': { sh2(o.x + .1, o.y + .1, o.x + 1.9, o.y + 1.9, '#e8dcc4'); blk(c, o.x + .45, o.y + .45, 1.1, 1.1, 0, 14, '#d8d2c4'); blk(c, o.x + .4, o.y + .4, 1.2, 1.2, 14, 3, '#c9c4b8');
        const p = Q(o.x + 1, o.y + 1, 17), im = statueImg('shiba', 'rgba(245,197,66,.85)'), flip = (o.r % 2) ? -1 : 1; c.save(); c.translate(p[0], p[1]); c.scale(flip, 1); c.drawImage(im, -54, -90, 108, 108); c.restore();
        for (let i = 0; i < 3; i++) { const t2 = (T * .7 + i / 3) % 1, s2 = Q(o.x + .6 + i * .4, o.y + .6, 20 + t2 * 30); c.globalAlpha = 1 - t2; c.font = '8px sans-serif'; c.fillStyle = '#000'; c.fillText('✨', s2[0], s2[1]); c.globalAlpha = 1; } return true; }
      case 'pet_fountain': {
        // 2x2 Crystal Pet Drinking Fountain
        sh2(o.x + .1, o.y + .1, o.x + 1.9, o.y + 1.9, '#e8f0fe');
        poly(c, [Q(o.x + .1, o.y + .1), Q(o.x + 1.9, o.y + .1), Q(o.x + 1.9, o.y + 1.9), Q(o.x + .1, o.y + 1.9)], '#93c5fd', '#1d4ed8', 1.2);
        ART.ell(c, q[0], q[1], 28, 14, '#dbeafe', '#3b82f6', 1.2);
        ART.ell(c, q[0], q[1] - 3, 24, 11, '#60a5fa');
        // Central marble fountain column
        blk(c, o.x + .8, o.y + .8, .4, .4, 0, 20, '#ffffff');
        ART.ell(c, q[0], q[1] - 22, 12, 6, '#bfdbfe', '#2563eb', 1);
        ART.ell(c, q[0], q[1] - 24, 9, 4.5, '#60a5fa');
        // Water jet splashes
        for (let i = 0; i < 4; i++) {
          const t2 = (T * 1.5 + i * .25) % 1;
          const a = i * Math.PI / 2 + T * .8;
          ART.ell(c, q[0] + Math.cos(a) * t2 * 14, q[1] - 25 - Math.sin(t2 * Math.PI) * 8 + t2 * 18, 2, 2, '#93c5fd');
        }
        // Cute pet drinking bowl at base
        const bq = Q(o.x + 1.45, o.y + 1.45, 1);
        ART.ell(c, bq[0], bq[1], 6, 3.5, '#f59e0b', '#b45309', 1);
        ART.ell(c, bq[0], bq[1] - 1, 4.5, 2.2, '#38bdf8');
        return true;
      }
      case 'pet_statue_hero': {
        // 1x1 Hero Dog Monument
        sh2(o.x + .05, o.y + .05, o.x + .95, o.y + .95, '#d6d3d1');
        blk(c, o.x + .15, o.y + .15, .7, .7, 0, 10, '#78716c');
        blk(c, o.x + .2, o.y + .2, .6, .6, 10, 3, '#a8a29e');
        const p = Q(o.x + .5, o.y + .5, 13), im = statueImg('jindo', 'rgba(217,119,6,.9)');
        c.save(); c.translate(p[0], p[1]); c.scale(1, 1); c.drawImage(im, -44, -75, 88, 88); c.restore();
        // Plaque at base
        const plq = Q(o.x + .5, o.y + .82, 5);
        c.fillStyle = '#fde047'; c.fillRect(plq[0] - 6, plq[1] - 3, 12, 5);
        c.strokeStyle = '#b45309'; c.lineWidth = .8; c.strokeRect(plq[0] - 6, plq[1] - 3, 12, 5);
        return true;
      }
      case 'flower_tunnel': {
        // 3x2 Romantic Rose Flower Tunnel
        sh2(o.x + .1, o.y + .1, o.x + 2.9, o.y + 1.9, '#fce7f3');
        // Trellis arches with creeping climbing roses
        for (let i = 0; i < 3; i++) {
          const ax = o.x + .45 + i * 1.05;
          const a0 = Q(ax, o.y + .2), a1 = Q(ax, o.y + 1.8);
          c.strokeStyle = '#15803d'; c.lineWidth = 3.5;
          c.beginPath(); c.moveTo(a0[0], a0[1]); c.quadraticCurveTo((a0[0] + a1[0]) / 2, (a0[1] + a1[1]) / 2 - 38, a1[0], a1[1]); c.stroke();
          // Roses along arch
          for (let j = 0; j <= 6; j++) {
            const u = j / 6;
            const rx = (1 - u) * a0[0] + u * a1[0], ry = (1 - u) * a0[1] + u * a1[1] - Math.sin(u * Math.PI) * 38;
            ART.ell(c, rx, ry, 3.2, 3.2, j % 2 ? '#ec4899' : '#f43f5e', '#be185d', .8);
            ART.ell(c, rx + .8, ry - .8, 1.2, 1.2, '#fbcfe8');
          }
        }
        // Cobblestone walkway inside tunnel
        poly(c, [Q(o.x + .2, o.y + .8), Q(o.x + 2.8, o.y + .8), Q(o.x + 2.8, o.y + 1.2), Q(o.x + .2, o.y + 1.2)], '#f5ecd8');
        return true;
      }
      case 'camping_zone': {
        // 3x3 Cozy Outdoor Camping Zone with tent, campfire & log seats
        sh2(o.x + .1, o.y + .1, o.x + 2.9, o.y + 2.9, '#fef3c7');
        // Canvas Tent (North side)
        const tx0 = o.x + .4, ty0 = o.y + .4, tw0 = 1.4, td0 = 1.2;
        blk(c, tx0, ty0, tw0, td0, 0, 4, '#ca8a04');
        gable(c, tx0, ty0, tw0, td0, 4, 18, '#0284c7', '#38bdf8');
        // Campfire pit (Center)
        const cfq = Q(o.x + 1.6, o.y + 1.6, 0);
        ART.ell(c, cfq[0], cfq[1], 14, 7, '#44403c', '#1c1917', 1.5);
        // Flickering fire flames
        const flm = Math.sin(T * 8) * 3;
        ART.ell(c, cfq[0], cfq[1] - 8 + flm, 6, 9, '#f97316');
        ART.ell(c, cfq[0], cfq[1] - 6 + flm, 4, 6, '#fde047');
        // Log benches around campfire
        for (const [lx, ly, lw, ld] of [[o.x + .6, o.y + 1.7, .4, .8], [o.x + 2.2, o.y + 1.5, .8, .4]]) {
          blk(c, lx, ly, lw, ld, 0, 6, '#78350f');
        }
        return true;
      }
    }
    return false;
  }
  // ---------------- small facilities ----------------
  function drawDeco(c, o, T) { frameOn(o, D[o.k].w, D[o.k].d); try { drawDeco_(c, o, T); } finally { frameOff(); } }
  function drawDeco_(c, o, T) {
    const f = { w: D[o.k].w, d: D[o.k].d }, cx = o.x + f.w / 2, cy = o.y + f.d / 2, q = Q(cx, cy), lit = S.clock && (S.clock.m >= 1080 || S.clock.m < 360);
    if (o.k === 'bench') {
      ART.ell(c, q[0], q[1], 10, 4, 'rgba(0,0,0,.12)');
      const [a, b] = [[cx - .4, cy], [cx + .4, cy]];
      for (const z of [7, 13]) { const p = Q(a[0], a[1], z), r2 = Q(b[0], b[1], z); c.strokeStyle = '#a8703a'; c.lineWidth = z === 7 ? 4 : 3; c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(r2[0], r2[1]); c.stroke(); }
      for (const p of [a, b]) { const u = Q(p[0], p[1]), v = Q(p[0], p[1], 7); c.strokeStyle = '#5a3a22'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(u[0], u[1]); c.lineTo(v[0], v[1]); c.stroke(); }
    } else if (o.k === 'lamp') {
      const top = Q(cx, cy, 30); c.strokeStyle = '#3a3a44'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(q[0], q[1]); c.lineTo(top[0], top[1]); c.stroke();
      if (lit) { c.globalAlpha = .35; ART.ell(c, q[0], q[1], 16, 7, '#ffe68a'); ART.ell(c, top[0], top[1], 11, 11, '#fff3b0'); c.globalAlpha = 1; }
      ART.ell(c, top[0], top[1], 4.5, 5, lit ? '#ffe68a' : '#f4f1e8', ART.OUT, 1);
    } else if (o.k === 'fountain') {
      poly(c, [Q(o.x + .1, o.y + .1), Q(o.x + 1.9, o.y + .1), Q(o.x + 1.9, o.y + 1.9), Q(o.x + .1, o.y + 1.9)], '#dcc79a');
      ART.ell(c, q[0], q[1], 30, 15, '#c9c4bc', ART.OUT, 1); ART.ell(c, q[0], q[1] - 4, 30, 15, '#e8e4dc', ART.OUT, 1); ART.ell(c, q[0], q[1] - 4, 25, 12, '#6ab8e0');
      c.fillStyle = '#e8e4dc'; c.fillRect(q[0] - 3, q[1] - 22, 6, 18); c.strokeStyle = ART.OUT; c.lineWidth = .8; c.strokeRect(q[0] - 3, q[1] - 22, 6, 18); ART.ell(c, q[0], q[1] - 22, 9, 4, '#e8e4dc', ART.OUT, .8);
      for (let i = 0; i < 6; i++) { const t = (T * .9 + i / 6) % 1, a = i / 6 * 6.28; ART.ell(c, q[0] + Math.cos(a) * t * 18, q[1] - 26 - Math.sin(t * 3.14) * 10 + t * 18 + Math.sin(a) * t * 7, 1.6, 1.6, 'rgba(160,220,255,.9)'); }
    } else if (o.k === 'playground') {
      poly(c, [Q(o.x + .2, o.y + .2), Q(o.x + 2.8, o.y + .2), Q(o.x + 2.8, o.y + 2.8), Q(o.x + .2, o.y + 2.8)], '#f2dfa8', 'rgba(150,120,60,.5)');
      // slide
      const s0 = Q(o.x + .8, o.y + .8, 26), s1 = Q(o.x + .8, o.y + 2.3, 2); c.strokeStyle = '#e8534f'; c.lineWidth = 5; c.beginPath(); c.moveTo(s0[0], s0[1]); c.lineTo(s1[0], s1[1]); c.stroke();
      const l0 = Q(o.x + .8, o.y + .5), l1 = Q(o.x + .8, o.y + .5, 26); c.strokeStyle = '#4a7fb5'; c.lineWidth = 2; c.beginPath(); c.moveTo(l0[0] - 3, l0[1]); c.lineTo(l1[0] - 3, l1[1]); c.moveTo(l0[0] + 3, l0[1]); c.lineTo(l1[0] + 3, l1[1]); c.stroke();
      // swing frame
      const a0 = Q(o.x + 2.2, o.y + .6), a1 = Q(o.x + 2.2, o.y + 2.4), b0 = Q(o.x + 2.2, o.y + .6, 30), b1 = Q(o.x + 2.2, o.y + 2.4, 30); c.strokeStyle = '#6a9a4a'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(a0[0], a0[1]); c.lineTo(b0[0], b0[1]); c.lineTo(b1[0], b1[1]); c.lineTo(a1[0], a1[1]); c.stroke();
      const sw = Math.sin(T * 2.2) * 5, m = Q(o.x + 2.2, o.y + 1.5, 30); c.strokeStyle = '#555'; c.lineWidth = 1; c.beginPath(); c.moveTo(m[0], m[1]); c.lineTo(m[0] + sw, m[1] + 22); c.stroke(); c.fillStyle = '#ffcf3a'; c.fillRect(m[0] + sw - 4, m[1] + 22, 8, 3);
    } else if (drawDeco2(c, o, T, f, cx, cy, q, lit)) { // v1.24 decorations
    } else if (o.k === 'busstop') {
      const x0 = o.x + .25, y0 = o.y + .3, x1 = o.x + f.w - .25, y1 = o.y + f.d - .25;
      poly(c, [Q(x0, y0 - .05), Q(x1 + .1, y0 - .05), Q(x1 + .1, y1 + .1), Q(x0, y1 + .1)], '#d8d2c4'); // paving
      // glass back wall
      poly(c, [Q(x0, y0, 2), Q(x1, y0, 2), Q(x1, y0, 22), Q(x0, y0, 22)], 'rgba(170,215,240,.55)', '#6b7684', 1);
      for (const [x, y] of [[x1, y1], [x1, y0]]) { const u = Q(x, y), v = Q(x, y, 24); c.strokeStyle = '#6b7684'; c.lineWidth = 2; c.beginPath(); c.moveTo(u[0], u[1]); c.lineTo(v[0], v[1]); c.stroke(); }
      const bx0 = x0 + .2, by0 = y0 + .1; blk(c, bx0, by0, x1 - x0 - .4, .35, 6, 2, '#b07a44'); // bench
      blk(c, x0 - .1, y0 - .1, x1 - x0 + .2, y1 - y0 + .2, 23, 3, '#4a7fb5'); // roof
      const pole = [x0, y1 + .15], pu = Q(pole[0], pole[1]), pv = Q(pole[0], pole[1], 36); c.strokeStyle = '#555'; c.lineWidth = 2; c.beginPath(); c.moveTo(pu[0], pu[1]); c.lineTo(pv[0], pv[1]); c.stroke();
      ART.ell(c, pv[0], pv[1], 7, 7, '#ffffff', '#2a6ad9', 2); c.font = 'bold 6px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#2a6ad9'; c.fillText('BUS', pv[0], pv[1] + 2); c.textAlign = 'start';
    }
  }
  // ---------------- stage 3: shops & public buildings ----------------
  function drawCivic(c, o, T) { frameOn(o, D[o.k].w, D[o.k].d); try { civic_(c, o, T); } finally { frameOff(); } }
  function signBoard(c, x, y, z, ic, txt) {
    if (ROT) { const R = ROT; ROT = null; try { signBoard(c, 2 * R.ox + R.W - x, R.oy + R.D - .3, z, ic, txt); } finally { ROT = R; } return; } // turned: the name sign hangs on the back wall we see
    const q = Q(x, y, z); c.font = 'bold 7px sans-serif'; const tw = Math.max(18, c.measureText(txt).width + 16);
    ART.rrect(c, q[0] - tw / 2, q[1] - 8, tw, 12, 4); c.fillStyle = '#fffaf0'; c.fill(); c.strokeStyle = ART.OUT; c.lineWidth = .8; c.stroke();
    c.textAlign = 'center'; c.fillStyle = '#5a3a2a'; c.fillText(ic + ' ' + txt, q[0], q[1] + 1); c.textAlign = 'start';
  }
  function awning(c, x0, x1, y, z, a, b) { if (ROT) return; const n = Math.max(2, Math.round((x1 - x0) / .3)); for (let i = 0; i < n; i++) poly(c, [Q(x0 + i * (x1 - x0) / n, y, z), Q(x0 + (i + 1) * (x1 - x0) / n, y, z), Q(x0 + (i + 1) * (x1 - x0) / n, y + .45, z - 5), Q(x0 + i * (x1 - x0) / n, y + .45, z - 5)], i % 2 ? a : b, ART.OUT, .6); }
  // v1.4: every shop / public building has its own silhouette + one big landmark you can spot from far away
  // (design rule from isometric city builders: shape first, then colour, then props & signs)
  const fS = (c, x0, x1, y, z0, z1, col, st) => ROT ? 0 : poly(c, [Q(x0, y, z1), Q(x1, y, z1), Q(x1, y, z0), Q(x0, y, z0)], col, st === undefined ? ART.OUT : st, .8); // a panel on a south face
  const fE = (c, x, y0, y1, z0, z1, col, st) => ROT ? 0 : poly(c, [Q(x, y0, z1), Q(x, y1, z1), Q(x, y1, z0), Q(x, y0, z0)], col, st === undefined ? ART.OUT : st, .8); // on an east face
  const pole = (c, x, y, z0, z1, col, lw) => { const a = Q(x, y, z0), b = Q(x, y, z1); c.strokeStyle = col; c.lineWidth = lw || 1.6; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); };
  const emo = (c, e, x, y, z, px) => { const q = Q(x, y, z); c.font = (px || 14) + 'px sans-serif'; c.textAlign = 'center'; c.fillText(e, q[0], q[1]); c.textAlign = 'start'; };
  function car(c, x, y, col, kind, T) { // a little parked car (kind: police / ambulance / fire)
    ART.ell(c, ...Q(x + .5, y + .25), 16, 6, 'rgba(0,0,0,.15)');
    blk(c, x, y, 1, .5, 2, 7, col); blk(c, x + .22, y + .06, .55, .38, 9, 6, kind === 'fire' ? col : '#ffffff');
    fS(c, x + .28, x + .72, y + .44, 10, 14, '#9fd3f0'); fE(c, x + .77, y + .1, y + .4, 10, 14, '#9fd3f0');
    for (const wx of [x + .18, x + .8]) { const q = Q(wx, y + .5, 2); ART.ell(c, q[0], q[1], 3, 3, '#333'); }
    if (kind === 'police') { fS(c, x, x + 1, y + .5, 4, 6, '#2f4f8a', null); const q = Q(x + .5, y + .25, 16), on = Math.sin(T * 8) > 0; ART.ell(c, q[0] - 3, q[1], 2.5, 2, on ? '#3a7aff' : '#888'); ART.ell(c, q[0] + 3, q[1], 2.5, 2, on ? '#888' : '#ff3a3a'); }
    if (kind === 'amb') { const q = Q(x + .5, y + .5, 6); c.fillStyle = '#e0303a'; c.fillRect(q[0] - 1, q[1] - 3, 2, 6); c.fillRect(q[0] - 3, q[1] - 1, 6, 2); }
    if (kind === 'fire') { const a = Q(x + .1, y + .25, 16), b = Q(x + .95, y + .25, 18); c.strokeStyle = '#ddd'; c.lineWidth = 2; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
  }
  function dome(c, x, y, z, r, col) { const q = Q(x, y, z); ART.ell(c, q[0], q[1], r, r * .45, sh(col, -.15), ART.OUT, 1); c.beginPath(); c.ellipse(q[0], q[1], r, r * .9, 0, Math.PI, 0); c.closePath(); c.fillStyle = col; c.fill(); c.strokeStyle = ART.OUT; c.lineWidth = 1; c.stroke(); ART.ell(c, q[0] - r * .35, q[1] - r * .5, r * .18, r * .28, 'rgba(255,255,255,.45)'); }
  function civic_(c, o, T) {
    const d = D[o.k], x = o.x, y = o.y, w = d.w, dd = d.d, k = o.k, lit = S.clock && (S.clock.m >= 1080 || S.clock.m < 360), nm = t('tk_' + k);
    poly(c, [Q(x + .1, y + .1), Q(x + w - .1, y + .1), Q(x + w - .1, y + dd - .1), Q(x + .1, y + dd - .1)], d.open ? 'rgba(120,180,80,.25)' : 'rgba(210,198,168,.5)');
    if (d.open) { openLot(c, o, T, lit, nm); return; }
    const bx = x + .3, by = y + .25, bw = w - .6, bd = dd - .95, glow = lit ? '#ffe68a' : '#bfe0f5';
    const path = (x0, x1) => poly(c, [Q(x0, by + bd), Q(x1, by + bd), Q(x1, y + dd - .05), Q(x0, y + dd - .05)], '#e3d6bc');
    if (k === 'conv') { // flat glass box, bright colour band, rooftop "24" box, vending machine
      path(bx + bw / 2 - .3, bx + bw / 2 + .3); blk(c, bx, by, bw, bd, 0, 22, '#f4f6f8');
      fS(c, bx + .1, bx + bw - .1, by + bd, 1, 13, lit ? 'rgba(255,240,180,.95)' : 'rgba(160,215,240,.9)');
      for (let i = 0; i < 4; i++) fS(c, bx + .25 + i * .55, bx + .6 + i * .55, by + bd, 3, 7, ['#ff9a3b', '#6ab04c', '#e0507a', '#4a9be0'][i], null);
      fE(c, bx + bw, by + .2, by + bd - .2, 3, 13, lit ? 'rgba(255,240,180,.9)' : 'rgba(160,215,240,.85)');
      blk(c, bx - .03, by - .03, bw + .06, bd + .06, 14, 4, '#3aa76d'); blk(c, bx - .03, by - .03, bw + .06, bd + .06, 18, 2, '#ff8a3a'); blk(c, bx, by, bw, bd, 20, 2, '#d8dde2');
      blk(c, bx + bw / 2 - .45, by + .4, .9, .3, 22, 11, '#ff8a3a'); { const q = Q(bx + bw / 2, by + .7, 28); c.font = 'bold 9px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#fff'; c.fillText('24h', q[0], q[1]); c.textAlign = 'start'; }
      blk(c, x + w - .5, y + dd - .75, .3, .3, 0, 15, '#e0303a'); fS(c, x + w - .47, x + w - .23, y + dd - .45, 6, 13, '#bfe0f5');
    } else if (k === 'bakery') { // cosy cottage, steep roof, round brick oven chimney, GIANT croissant on the ridge
      path(bx + bw / 2 - .3, bx + bw / 2 + .3); blk(c, bx, by, bw, bd, 0, 20, '#fdf0d8');
      for (const tx of [bx + .05, bx + bw / 2, bx + bw - .05]) pole(c, tx, by + bd, 0, 20, '#8a5a3b', 1.4);
      fS(c, bx + .2, bx + bw / 2 - .3, by + bd, 5, 13, '#ffe9b0'); for (let i = 0; i < 3; i++) { const q = Q(bx + .35 + i * .25, by + bd, 7); ART.ell(c, q[0], q[1], 3.5, 2.4, '#d9913a', '#8a5a2a', .6); }
      door(c, bx + bw / 2 - .21, by + bd, 14, '#8a5a3b'); awning(c, bx + .1, bx + bw - .1, by + bd, 17, '#c8864a', '#fff6e6');
      gable(c, bx, by, bw, bd, 20, 28, '#a0522d', '#fdf0d8');
      blk(c, bx + bw - .7, by + .15, .45, .45, 20, 26, '#b5654a'); smoke(c, bx + bw - .47, by + .37, 50, T, 3);
      { const q = Q(bx + bw / 2, by + bd / 2, 56), bob = Math.sin(T * 2) * 1.5; for (const [dx, dy, r] of [[-12, 6, 5], [-7, 1, 6.5], [0, -1, 7.5], [7, 1, 6.5], [12, 6, 5]]) ART.ell(c, q[0] + dx, q[1] + dy + bob, r, r * .8, '#e8a33a', '#9a5a1a', 1); for (const dx of [-7, 0, 7]) { c.strokeStyle = 'rgba(120,60,10,.6)'; c.lineWidth = 1; c.beginPath(); c.moveTo(q[0] + dx - 2, q[1] - 4 + bob); c.lineTo(q[0] + dx + 2, q[1] + 4 + bob); c.stroke(); } }
      { const tq = Q(x + .6, y + dd - .45); ART.ell(c, tq[0], tq[1] - 7, 6, 3, '#ffffff', ART.OUT, .6); pole(c, x + .6, y + dd - .45, 0, 22, '#8a5a3b', 1.2); const u = Q(x + .6, y + dd - .45, 24); c.beginPath(); c.moveTo(u[0] - 12, u[1] + 4); c.lineTo(u[0], u[1] - 6); c.lineTo(u[0] + 12, u[1] + 4); c.closePath(); c.fillStyle = '#e8534f'; c.fill(); c.stroke(); }
    } else if (k === 'florist') { // little shop + a glass greenhouse with a curved roof, flower buckets outside
      const sw = bw * .5; path(bx + sw / 2 - .25, bx + sw / 2 + .25); blk(c, bx, by, sw, bd, 0, 20, '#f8e6ee'); door(c, bx + sw / 2 - .21, by + bd, 14, '#6ab04c'); gable(c, bx, by, sw, bd, 20, 16, '#e98aa8', '#f8e6ee');
      const gx = bx + sw + .05, gw = bw - sw - .05;
      fS(c, gx, gx + gw, by + bd, 0, 18, 'rgba(210,245,225,.6)', '#ffffff'); fE(c, gx + gw, by, by + bd, 0, 18, 'rgba(200,240,220,.55)', '#ffffff');
      for (let i = 0; i < 4; i++) { const q = Q(gx + .2 + i * (gw - .3) / 3, by + bd - .3, 4); ART.ell(c, q[0], q[1], 5, 4, ['#5fae52', '#e0507a', '#6bb85c', '#ffcf3a'][i]); }
      for (let i = 0; i <= 6; i++) { const u = i / 6, a = Q(gx, by + bd * u, 18 + Math.sin(u * Math.PI) * 10), b = Q(gx + gw, by + bd * u, 18 + Math.sin(u * Math.PI) * 10); c.strokeStyle = 'rgba(255,255,255,.95)'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
      poly(c, [Q(gx, by, 18), Q(gx + gw, by, 18), Q(gx + gw, by + bd / 2, 28), Q(gx, by + bd / 2, 28)], 'rgba(220,250,235,.5)', '#ffffff', 1); poly(c, [Q(gx, by + bd / 2, 28), Q(gx + gw, by + bd / 2, 28), Q(gx + gw, by + bd, 18), Q(gx, by + bd, 18)], 'rgba(230,255,240,.6)', '#ffffff', 1);
      for (let i = 0; i < 5; i++) { const q = Q(x + .45 + i * .5, y + dd - .4); c.fillStyle = '#8a9aa8'; c.fillRect(q[0] - 3, q[1] - 6, 6, 6); for (let j = 0; j < 3; j++) ART.ell(c, q[0] - 2.5 + j * 2.5, q[1] - 8 - (j % 2) * 2, 2.2, 2.2, ['#ff5a7a', '#ffd166', '#b59be0', '#ff9e5a', '#ffffff'][(i + j) % 5]); }
    } else if (k === 'clinic') { // white box, blue stripe, big green-cross sign on the roof, ambulance parked
      path(bx + bw / 2 - .3, bx + bw / 2 + .3); blk(c, bx, by, bw, bd, 0, 26, '#ffffff');
      fS(c, bx, bx + bw, by + bd, 11, 14, '#4aa3c8', null); fE(c, bx + bw, by, by + bd, 11, 14, '#4aa3c8', null);
      for (let i = 0; i < 3; i++) { if (i === 1) continue; winS(c, bx + .15 + i * (bw - .3) / 3, by + bd, 4, .45, 6, lit, '#4aa3c8'); winS(c, bx + .15 + i * (bw - .3) / 3, by + bd, 16, .45, 6, lit, '#4aa3c8'); }
      winS(c, bx + bw / 2 - .2, by + bd, 16, .4, 6, lit, '#4aa3c8'); door(c, bx + bw / 2 - .25, by + bd, 10, '#9fd3f0'); blk(c, bx, by, bw, bd, 26, 2, '#e8eef2');
      { const q = Q(bx + bw / 2, by + bd / 2, 46); ART.ell(c, q[0], q[1], 13, 13, '#ffffff', '#3aa76d', 2); c.fillStyle = '#3aa76d'; c.fillRect(q[0] - 3, q[1] - 9, 6, 18); c.fillRect(q[0] - 9, q[1] - 3, 18, 6); pole(c, bx + bw / 2, by + bd / 2, 28, 34, '#777'); }
      car(c, x + w - 1.1, y + dd - .65, '#ffffff', 'amb', T);
    } else if (k === 'photo') { // the building IS a big camera: dark body, huge lens on the front, flash box, red shutter button
      path(bx + .2, bx + .6); blk(c, bx, by, bw, bd, 0, 26, '#3f4250'); blk(c, bx + .15, by + .15, .8, .7, 26, 8, '#5a5e70'); fS(c, bx + .25, bx + .85, by + .85, 28, 32, '#fffbe0'); // flash
      { const q = Q(bx + bw / 2 + .25, by + bd, 13); for (const [r, col] of [[15, '#22242c'], [12, '#5a6070'], [9, '#2a3a6a'], [6, '#3a6ab5']]) ART.ell(c, q[0], q[1], r, r, col, ART.OUT, .8); ART.ell(c, q[0] - 3, q[1] - 3, 2.5, 2.5, 'rgba(255,255,255,.8)'); }
      { const q = Q(bx + bw - .5, by + .4, 26); ART.ell(c, q[0], q[1] - 3, 5, 3, '#e0303a', ART.OUT, .8); }
      door(c, bx + .2, by + bd, 13, '#b59be0');
      { const q = Q(x + w - .5, y + dd - .45); ART.rrect(c, q[0] - 7, q[1] - 22, 14, 18, 3); c.fillStyle = 'rgba(0,0,0,0)'; c.strokeStyle = '#e98aa8'; c.lineWidth = 2.5; c.stroke(); c.font = '8px sans-serif'; c.textAlign = 'center'; c.fillText('💗', q[0], q[1] - 24); c.textAlign = 'start'; pole(c, x + w - .5, y + dd - .45, 0, 4, '#e98aa8', 2); }
    } else if (k === 'school') { // long red-brick building, white window grid, central clock tower with a bell, flag + hopscotch yard
      path(bx + bw / 2 - .4, bx + bw / 2 + .4); blk(c, bx, by, bw, bd, 0, 28, '#c8664a');
      for (const z of [5, 17]) for (let i = 0; i < 7; i++) { const wx = bx + .15 + i * (bw - .3) / 7; if (Math.abs(wx + .2 - (bx + bw / 2)) < .6) continue; winS(c, wx, by + bd, z, .38, 8, lit && (i + z) % 3 === 0, '#ffffff'); }
      for (const z of [5, 17]) winE(c, bx + bw, by + .5, z, .6, 8, lit, '#ffffff');
      fS(c, bx, bx + bw, by + bd, 14, 15.5, '#f4e8d8', null); hip(c, bx, by, bw, bd, 28, 12, '#8a4a3a');
      const tx = bx + bw / 2 - .5; blk(c, tx, by + bd - 1, 1, 1, 0, 58, '#d9785a'); door(c, tx + .29, by + bd, 16, '#6a3a2a');
      { const q = Q(tx + .5, by + bd, 46); ART.ell(c, q[0], q[1], 7, 7, '#ffffff', ART.OUT, 1); const m = S.clock ? S.clock.m : 480; for (const [len, ang] of [[4, ((m / 60) % 12) / 12], [6, (m % 60) / 60]]) { const a = ang * 6.283 - 1.571; c.strokeStyle = '#333'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(q[0], q[1]); c.lineTo(q[0] + Math.cos(a) * len, q[1] + Math.sin(a) * len); c.stroke(); } }
      { const tp = Q(tx + .5, by + bd - .5, 58); c.beginPath(); c.moveTo(tp[0] - 14, tp[1] + 4); c.lineTo(tp[0], tp[1] - 22); c.lineTo(tp[0] + 14, tp[1] + 4); c.closePath(); c.fillStyle = '#8a4a3a'; c.fill(); c.strokeStyle = ART.OUT; c.stroke(); emo(c, '🔔', tx + .5, by + bd - .5, 62, 9); }
      for (let i = 0; i < 4; i++) poly(c, [Q(x + .4 + i * .35, y + dd - .6), Q(x + .7 + i * .35, y + dd - .6), Q(x + .7 + i * .35, y + dd - .3), Q(x + .4 + i * .35, y + dd - .3)], null, '#ffffff', 1);
      { pole(c, x + w - .35, y + dd - .35, 0, 48, '#777'); const b = Q(x + w - .35, y + dd - .35, 48), fw = Math.sin(T * 3) * 2; c.fillStyle = '#4a9be0'; c.beginPath(); c.moveTo(b[0], b[1]); c.lineTo(b[0] + 13, b[1] + 3 + fw); c.lineTo(b[0], b[1] + 8); c.fill(); }
    } else if (k === 'police') { // pale blue box with a blue-and-white checkered band, gold star over the door, antenna, patrol car
      path(bx + bw / 2 - .3, bx + bw / 2 + .3); blk(c, bx, by, bw, bd, 0, 28, '#e8eef8');
      for (let i = 0; i < 12; i++) { const u0 = bx + i * bw / 12; fS(c, u0, u0 + bw / 12, by + bd, 19, 21.5, i % 2 ? '#ffffff' : '#2f4f8a', null); fS(c, u0, u0 + bw / 12, by + bd, 21.5, 24, i % 2 ? '#2f4f8a' : '#ffffff', null); }
      for (let i = 0; i < 6; i++) { const v0 = by + i * bd / 6; fE(c, bx + bw, v0, v0 + bd / 6, 19, 21.5, i % 2 ? '#ffffff' : '#2f4f8a', null); fE(c, bx + bw, v0, v0 + bd / 6, 21.5, 24, i % 2 ? '#2f4f8a' : '#ffffff', null); }
      for (let i = 0; i < 4; i++) { if (i === 1 || i === 2) continue; winS(c, bx + .2 + i * (bw - .4) / 4, by + bd, 6, .45, 8, lit, '#2f4f8a'); }
      door(c, bx + bw / 2 - .25, by + bd, 14, '#2f4f8a'); blk(c, bx, by, bw, bd, 28, 2, '#c8d0dc');
      emo(c, '⭐', bx + bw / 2, by + bd, 16, 11); pole(c, bx + .4, by + .4, 30, 58, '#777', 1.2); { const q = Q(bx + .4, by + .4, 58); ART.ell(c, q[0], q[1], 2, 2, Math.sin(T * 4) > 0 ? '#ff3a3a' : '#661111'); }
      car(c, x + .35, y + dd - .65, '#ffffff', 'police', T);
    } else if (k === 'fire') { // red brick hall with a tall hose-drying tower, two big red doors, a fire truck peeking out
      const hw = bw - 1; blk(c, bx + 1, by, hw, bd, 0, 28, '#c0443a'); blk(c, bx, by, .95, .95, 0, 64, '#b83a30');
      winS(c, bx + .25, by + .95, 44, .45, 9, lit, '#ffffff'); winE(c, bx + .95, by + .25, 44, .45, 9, lit, '#ffffff');
      { const tp = Q(bx + .47, by + .47, 64); c.beginPath(); c.moveTo(tp[0] - 12, tp[1] + 5); c.lineTo(tp[0], tp[1] - 14); c.lineTo(tp[0] + 12, tp[1] + 5); c.closePath(); c.fillStyle = '#7a2a22'; c.fill(); c.strokeStyle = ART.OUT; c.stroke(); }
      blk(c, bx, by + .95, .95, bd - .95, 0, 28, '#c0443a');
      for (const gx of [bx + 1.1, bx + 1.1 + hw / 2]) { fS(c, gx, gx + hw / 2 - .2, by + bd, 0, 18, '#e8534f'); fS(c, gx + .08, gx + hw / 2 - .28, by + bd, 0, 16, '#8a1a18', null); fS(c, gx + .1, gx + hw / 2 - .3, by + bd, 2, 10, '#e0303a', null); }
      fS(c, bx, bx + bw, by + bd, 20, 23, '#ffffff', null); blk(c, bx, by, bw, bd, 28, 2, '#7a2a22');
      { const q = Q(bx + 1 + hw / 2, by + bd / 2, 32), on = Math.sin(T * 8) > 0; ART.ell(c, q[0] - 4, q[1], 3, 2.4, on ? '#ff3a3a' : '#888'); ART.ell(c, q[0] + 4, q[1], 3, 2.4, on ? '#888' : '#ffb03a'); }
      emo(c, '🧯', x + .4, y + dd - .45, 2, 10);
    } else if (k === 'library') { // classical: steps, white columns, a triangular pediment and a green copper dome
      blk(c, bx - .1, by + bd - .1, bw + .2, .5, 0, 2, '#e8e0d0'); blk(c, bx - .05, by + bd - .1, bw + .1, .35, 2, 2, '#f2ece0');
      blk(c, bx, by, bw, bd - .5, 0, 26, '#efe6d6'); winE(c, bx + bw, by + .3, 8, .6, 12, lit, '#8a7a5a');
      for (let i = 0; i < 5; i++) { const cx = bx + .1 + i * (bw - .3) / 4; blk(c, cx, by + bd - .6, .14, .14, 2, 22, '#ffffff'); }
      door(c, bx + bw / 2 - .21, by + bd - .5, 15, '#8a5a3b');
      blk(c, bx - .08, by + bd - .7, bw + .16, .25, 24, 3, '#f8f4ea');
      poly(c, [Q(bx - .08, by + bd - .45, 27), Q(bx + bw + .08, by + bd - .45, 27), Q(bx + bw / 2, by + bd - .45, 38)], '#f8f4ea', ART.OUT, 1);
      blk(c, bx, by, bw, bd - .5, 26, 2, '#d8cdb8'); dome(c, bx + bw / 2, by + (bd - .5) / 2, 28, 22, '#6ab5a0'); pole(c, bx + bw / 2, by + (bd - .5) / 2, 47, 57, '#c9a227', 1.6);
      emo(c, '📖', bx + bw / 2, by + bd - .45, 30, 8);
    } else if (k === 'training') { // small barn-roof clubhouse at the back + an agility course: A-frame, colourful tunnel, weave poles, a dog jumping
      blk(c, bx, by, bw * .45, bd * .55, 0, 18, '#e6f2e2'); gambrel(c, bx, by, bw * .45, bd * .55, 18, 16, '#4a7fb5', '#e6f2e2'); door(c, bx + bw * .22 - .2, by + bd * .55, 12, '#4a7fb5');
      { const ax = bx + bw * .6, ay = by + .3; poly(c, [Q(ax, ay, 0), Q(ax + .5, ay, 16), Q(ax + .5, ay + .6, 16), Q(ax, ay + .6, 0)], '#ffcf3a', ART.OUT, .8); poly(c, [Q(ax + .5, ay, 16), Q(ax + 1, ay, 0), Q(ax + 1, ay + .6, 0), Q(ax + .5, ay + .6, 16)], '#e8534f', ART.OUT, .8); }
      for (let i = 0; i < 5; i++) { const q = Q(bx + .3 + i * .28, y + dd - 1.2, 0); ART.ell(c, q[0], q[1] - 5, 5, 5 * .9, ['#e8534f', '#ffcf3a', '#4a9be0', '#6ab04c', '#b59be0'][i], ART.OUT, .7); ART.ell(c, q[0], q[1] - 5, 3, 2.8, '#333'); }
      for (let i = 0; i < 5; i++) pole(c, bx + bw * .6 + i * .22, y + dd - .6, 0, 12, i % 2 ? '#ffffff' : '#e8534f', 1.6);
      { const ph = (T * .5) % 1, px = bx + bw * .55 + ph * 1.2, h = Math.sin(ph * Math.PI) * 14, q = Q(px, by + bd * .7, h); c.save(); c.translate(q[0], q[1]); c.scale(.4, .4); ART.pet(c, 'bordercollie', { t: T, mood: 'happy', seed: 4, age: 1, moving: true, dir: 1 }); c.restore(); }
      emo(c, '🦴', bx + bw * .22, by + bd * .27, 40, 13);
    } else if (k === 'pethotel') { // tall 3-floor hotel, arched windows with balconies, red carpet + canopy, a glowing bone sign on the roof
      poly(c, [Q(bx + bw / 2 - .25, by + bd), Q(bx + bw / 2 + .25, by + bd), Q(bx + bw / 2 + .25, y + dd - .05), Q(bx + bw / 2 - .25, y + dd - .05)], '#d9434a');
      blk(c, bx, by, bw, bd, 0, 48, '#fff6e0');
      for (let f = 0; f < 3; f++) { const z = 6 + f * 14; for (let i = 0; i < 4; i++) { const wx = bx + .2 + i * (bw - .4) / 4; if (f === 0 && (i === 1 || i === 2)) continue; winS(c, wx, by + bd, z, .4, 9, lit && (i + f) % 2 === 0, '#b07a44'); if (f) fS(c, wx - .05, wx + .45, by + bd + .02, z - 1, z + 1, '#b07a44', null); } winE(c, bx + bw, by + .3, z, .5, 9, lit && f === 1, '#b07a44'); }
      door(c, bx + bw / 2 - .25, by + bd, 13, '#b07a44'); poly(c, [Q(bx + bw / 2 - .4, by + bd, 16), Q(bx + bw / 2 + .4, by + bd, 16), Q(bx + bw / 2 + .4, by + bd + .5, 13), Q(bx + bw / 2 - .4, by + bd + .5, 13)], '#d9434a', ART.OUT, .8);
      blk(c, bx - .05, by - .05, bw + .1, bd + .1, 48, 3, '#9a6ab5');
      { const q = Q(bx + bw / 2, by + bd / 2, 64), g = lit || Math.sin(T * 2) > 0 ? '#fff3b0' : '#ffffff'; c.fillStyle = g; c.strokeStyle = '#c9962a'; c.lineWidth = 1.2; ART.rrect(c, q[0] - 12, q[1] - 3, 24, 6, 3); c.fill(); c.stroke(); for (const [dx, dy] of [[-12, -3], [-12, 3], [12, -3], [12, 3]]) ART.ell(c, q[0] + dx, q[1] + dy, 4, 4, g, '#c9962a', 1.2); pole(c, bx + bw / 2, by + bd / 2, 51, 58, '#777'); }
      emo(c, '⭐⭐⭐', bx + bw / 2, by + bd, 44, 9);
    } else if (k === 'chapel') { // white chapel, pink roof, tall steeple with a bell, rose window, arched door, flower arch
      path(bx + bw / 2 - .35, bx + bw / 2 + .35); blk(c, bx, by, bw, bd, 0, 30, '#ffffff');
      for (let i = 0; i < 3; i++) { const q = Q(bx + bw + .01, by + .4 + i * (bd - .8) / 2, 14); c.beginPath(); c.ellipse(q[0], q[1], 3, 7, 0, 0, 7); c.fillStyle = lit ? '#ffe68a' : '#bcd8f0'; c.fill(); c.strokeStyle = '#c9962a'; c.stroke(); }
      gable(c, bx, by, bw, bd, 30, 22, '#e98aa8', '#ffffff');
      const sx = bx + bw / 2 - .45; blk(c, sx, by + bd - .9, .9, .9, 0, 56, '#ffffff');
      { const q = Q(sx + .45, by + bd, 40); ART.ell(c, q[0], q[1], 7, 7, '#ffd0e0', '#c9962a', 1.2); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; c.strokeStyle = '#c9962a'; c.lineWidth = .7; c.beginPath(); c.moveTo(q[0], q[1]); c.lineTo(q[0] + Math.cos(a) * 7, q[1] + Math.sin(a) * 7); c.stroke(); } }
      { const q = Q(sx + .45, by + bd, 0); c.beginPath(); c.moveTo(q[0] - 6, q[1]); c.lineTo(q[0] - 6, q[1] - 14); c.arc(q[0], q[1] - 14, 6, Math.PI, 0); c.lineTo(q[0] + 6, q[1]); c.closePath(); c.fillStyle = '#b07a44'; c.fill(); c.strokeStyle = ART.OUT; c.stroke(); }
      { const tp = Q(sx + .45, by + bd - .45, 56); c.beginPath(); c.moveTo(tp[0] - 11, tp[1] + 4); c.lineTo(tp[0], tp[1] - 28); c.lineTo(tp[0] + 11, tp[1] + 4); c.closePath(); c.fillStyle = '#e98aa8'; c.fill(); c.strokeStyle = ART.OUT; c.stroke(); emo(c, '🔔', sx + .45, by + bd - .45, 60, 9); emo(c, '💗', sx + .45, by + bd - .45, 90, 11); }
      { const a = Q(x + w / 2 - .8, y + dd - .3), b = Q(x + w / 2 + .8, y + dd - .3); c.strokeStyle = '#6bb85c'; c.lineWidth = 3; c.beginPath(); c.moveTo(a[0], a[1]); c.quadraticCurveTo((a[0] + b[0]) / 2, a[1] - 40, b[0], b[1]); c.stroke(); for (let i = 0; i <= 8; i++) { const u = i / 8, px = a[0] + (b[0] - a[0]) * u, py = a[1] + (b[1] - a[1]) * u - Math.sin(u * Math.PI) * 20; ART.ell(c, px, py, 2.4, 2.4, i % 2 ? '#ff9ec0' : '#ffffff'); } }
    } else if (k === 'shelter') { // 6x5 warm timber rescue center with twin outdoor exercise yards, doghouses, agility toys, caretaker & 5 playing rescue pets
      path(bx + bw / 2 - .45, bx + bw / 2 + .45);
      // Lush turf exercise yard in the front half
      poly(c, [Q(x + .25, y + 2.1), Q(x + w - .25, y + 2.1), Q(x + w - .25, y + dd - .2), Q(x + .25, y + dd - .2)], '#9ad976', '#6da84e', 1);
      // Central stone path dividing left dog yard & right puppy/cat yard
      poly(c, [Q(x + w / 2 - .45, y + 2.1), Q(x + w / 2 + .45, y + 2.1), Q(x + w / 2 + .45, y + dd - .1), Q(x + w / 2 - .45, y + dd - .1)], '#e5d9c3', '#bca888', .8);
      // Main rescue lodge at the north side
      const lby = y + .2, lbd = 1.95;
      blk(c, bx, lby, bw, lbd, 0, 26, '#fff6eb');
      fS(c, bx, bx + bw, lby + lbd, 0, 7, '#8c5838');
      fE(c, bx + bw, lby, lby + lbd, 0, 7, '#7a4b2e');
      door(c, bx + bw / 2 - .25, lby + lbd, 15, '#6a3e20');
       awning(c, bx + bw / 2 - .7, bx + bw / 2 + .7, lby + lbd, 18, '#d97746', '#fffaf0');
      for (const wx of [bx + .35, bx + 1.2, bx + bw - 1.65, bx + bw - .8]) winS(c, wx, lby + lbd, 8, .45, 9, lit, '#6a3e20');
      hip(c, bx, lby, bw, lbd, 26, 15, '#d97746');
      // Twin wooden doghouses in the yards
      for (const [dx, rcol] of [[x + .45, '#d9534f'], [x + w - 1.25, '#4a9be0']]) {
        blk(c, dx, y + 2.35, .8, .65, 0, 9, '#d89658');
        gable(c, dx, y + 2.35, .8, .65, 9, 6, rcol, '#d89658');
      }
      // Food & water bowls
      for (const [fx, fy, col] of [[x + 1.55, y + 2.55, '#e8534f'], [x + 1.85, y + 2.55, '#4aa3df'], [x + w - 1.6, y + 2.55, '#ffcf3a']]) {
        const fq = Q(fx, fy, 1); ART.ell(c, fq[0], fq[1], 4.5, 2.8, col, ART.OUT, .8); ART.ell(c, fq[0], fq[1] - 1, 3, 1.6, '#fff');
      }
      // Enclosure fences around left and right play pens
      fence(c, x + .25, y + 2.1, x + w / 2 - .45, y + 2.1);
      fence(c, x + w / 2 + .45, y + 2.1, x + w - .25, y + 2.1);
      fence(c, x + .25, y + 2.1, x + .25, y + dd - .2);
      fence(c, x + w - .25, y + 2.1, x + w - .25, y + dd - .2);
      fence(c, x + .25, y + dd - .2, x + w / 2 - .45, y + dd - .2);
      fence(c, x + w / 2 + .45, y + dd - .2, x + w - .25, y + dd - .2);
      // 5 animated rescue dogs & cats playing in the yards
      const spList = ['shiba', 'golden', 'corgi', 'kitten', 'maltese'];
      for (let i = 0; i < 5; i++) {
        const isRight = i >= 3;
        const cx0 = isRight ? x + w * .74 : x + w * .26;
        const cy0 = y + 3.45 + (i % 2) * .45;
        const ang = T * (.75 + i * .15) + i * 1.7;
        const px = cx0 + Math.cos(ang) * .65, py = cy0 + Math.sin(ang) * .35;
        const dir = -Math.sin(ang) > 0 ? 1 : -1;
        const pq = Q(px, py);
        c.save(); c.translate(pq[0], pq[1] - Math.abs(Math.sin(T * 8 + i)) * 2.5); c.scale(.82 * dir, .82);
        ART.pet(c, spList[i], { t: T + i, mood: 'happy', seed: i * 3 + 1, age: 1, moving: true, dir: 1 });
        c.restore();
      }
      // Caretaker tossing treats in the center path (full human scale matching player!)
      const sq = Q(x + w / 2, y + 3.65);
      c.save(); c.translate(sq[0], sq[1]); c.scale(.95, .95);
      ART.human(c, { skin: 1, hair: 3, hcol: '#4a2c11', top: 2, tcol: '#2f7a5a', bot: 1, bcol: '#334155' }, 0, T, false, 'happy', Math.sin(T * 3) > 0 ? 1 : 0, false);
      c.restore();
      emo(c, '🐾', bx + bw / 2, lby + lbd, 36, 12);
    } else if (k === 'aquarium_center') {
      // 6x5 Marine Aquarium Center
      path(bx + bw / 2 - .5, bx + bw / 2 + .5);
      blk(c, bx, by, bw, bd, 0, 32, '#e0f2fe');
      fS(c, bx, bx + bw, by + bd, 0, 8, '#0284c7');
      fE(c, bx + bw, by, by + bd, 0, 8, '#0369a1');
      door(c, bx + bw / 2 - .35, by + bd, 16, '#0284c7');
      // Large panoramic curved ocean glass windows
      for (const wx of [bx + .5, bx + 1.6, bx + bw - 2.1, bx + bw - 1.0]) {
        winS(c, wx, by + bd, 10, .85, 14, true, '#0284c7');
        // Swimming fish silhouettes inside
        const fq = Q(wx + .4, by + bd + .02, 16);
        ART.ell(c, fq[0], fq[1], 4, 2, '#38bdf8');
      }
      hip(c, bx - .1, by - .1, bw + .2, bd + .2, 32, 18, '#0284c7');
      // Dolphin rooftop mascot
      emo(c, '🐬', bx + bw / 2, by + bd / 2, 54, 18);
      awning(c, bx + bw / 2 - .9, bx + bw / 2 + .9, by + bd, 20, '#0284c7', '#ffffff');
    } else if (k === 'pet_themepark') {
      // 7x6 Pet Theme Park & Carousel Carnival
      poly(c, [Q(x + .15, y + .15), Q(x + w - .15, y + .15), Q(x + w - .15, y + dd - .15), Q(x + .15, y + dd - .15)], '#fef08a', '#ca8a04', 1.5);
      // Entrance Arch & Bunting Flags
      pole(c, x + .6, y + dd - .4, 0, 30, '#e11d48', 3);
      pole(c, x + w - .6, y + dd - .4, 0, 30, '#e11d48', 3);
      const a0 = Q(x + .6, y + dd - .4, 30), a1 = Q(x + w - .6, y + dd - .4, 30);
      c.strokeStyle = '#f59e0b'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(a0[0], a0[1]); c.quadraticCurveTo((a0[0] + a1[0]) / 2, a0[1] - 18, a1[0], a1[1]); c.stroke();
      for (let i = 0; i <= 8; i++) {
        const u = i / 8, fx = (1 - u) * a0[0] + u * a1[0], fy = (1 - u) * a0[1] + u * a1[1] - Math.sin(u * Math.PI) * 18;
        poly(c, [[fx, fy], [fx + 4, fy + 7], [fx - 4, fy + 7]], ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b'][i % 4]);
      }
      // Carousel Pavilion in Center
      const cx0 = x + w / 2, cy0 = y + dd / 2 - .3;
      blk(c, cx0 - 1.6, cy0 - 1.6, 3.2, 3.2, 0, 6, '#fed7aa');
      poly(c, [Q(cx0 - 1.8, cy0 - 1.8, 6), Q(cx0 + 1.8, cy0 - 1.8, 6), Q(cx0 + 1.8, cy0 + 1.8, 6), Q(cx0 - 1.8, cy0 + 1.8, 6)], '#fdba74');
      for (let i = 0; i < 4; i++) {
        const ang = i * Math.PI / 2 + T * .8;
        const px = cx0 + Math.cos(ang) * 1.1, py = cy0 + Math.sin(ang) * 1.1;
        pole(c, px, py, 6, 28, '#f59e0b', 2);
        const pq = Q(px, py, 14 + Math.sin(T * 3 + i) * 4);
        c.font = '14px sans-serif'; c.textAlign = 'center'; c.fillText(['🎠', '🦄', '🐕', '🐱'][i], pq[0], pq[1]);
      }
      // Circus tent conic roof
      const rk = Q(cx0, cy0, 48);
      const cs = [[cx0 - 2, cy0 - 2], [cx0 + 2, cy0 - 2], [cx0 + 2, cy0 + 2], [cx0 - 2, cy0 + 2]].map(([u, v]) => Q(u, v, 28));
      for (let i = 0; i < 4; i++) poly(c, [cs[i], cs[(i + 1) % 4], rk], i % 2 ? '#f43f5e' : '#ffffff', ART.OUT, 1);
      emo(c, '🎡', x + w - 1.4, y + 1.4, 0, 24);
    } else if (k === 'cat_cafe') {
      // 4x4 Cozy Cat Cafe Lounge
      path(bx + bw / 2 - .4, bx + bw / 2 + .4);
      blk(c, bx, by, bw, bd, 0, 26, '#fffbeb');
      fS(c, bx, bx + bw, by + bd, 0, 7, '#d97706');
      door(c, bx + bw / 2 - .25, by + bd, 14, '#b45309');
      winS(c, bx + .4, by + bd, 8, .55, 10, true, '#b45309');
      winS(c, bx + bw - 1.0, by + bd, 8, .55, 10, true, '#b45309');
      // Cat ear triangular roof gables
      gable(c, bx, by, bw, bd, 26, 18, '#f59e0b', '#fef3c7');
      const earL = Q(bx + .6, by + bd, 44), earR = Q(bx + bw - .6, by + bd, 44);
      poly(c, [[earL[0] - 8, earL[1]], [earL[0], earL[1] - 12], [earL[0] + 6, earL[1]]], '#d97706', ART.OUT, 1);
      poly(c, [[earR[0] - 6, earR[1]], [earR[0], earR[1] - 12], [earR[0] + 8, earR[1]]], '#d97706', ART.OUT, 1);
      awning(c, bx + bw / 2 - .8, bx + bw / 2 + .8, by + bd, 18, '#f59e0b', '#ffffff');
      emo(c, '🐾', bx + bw / 2, by + bd, 32, 10);
    } else if (k === 'pet_bakery') {
      // 4x3 Artisan Pet Bakery
      path(bx + bw / 2 - .35, bx + bw / 2 + .35);
      blk(c, bx, by, bw, bd, 0, 24, '#fdf2f8');
      fS(c, bx, bx + bw, by + bd, 0, 7, '#db2777');
      door(c, bx + bw / 2 - .22, by + bd, 13, '#9d174d');
      winS(c, bx + .35, by + bd, 7, .5, 9, true, '#9d174d');
      winS(c, bx + bw - .9, by + bd, 7, .5, 9, true, '#9d174d');
      hip(c, bx - .08, by - .08, bw + .16, bd + .16, 24, 16, '#ec4899');
      awning(c, bx + .2, bx + bw - .2, by + bd, 16, '#f472b6', '#ffffff');
      // Bakery Chimney with rising sweet aroma
      blk(c, bx + bw - .7, by + .3, .4, .4, 24, 14, '#be185d');
      for (let i = 0; i < 3; i++) {
        const ph = (T * 1.2 + i * .35) % 1;
        const sq0 = Q(bx + bw - .5, by + .5, 40 + ph * 18);
        ART.ell(c, sq0[0] + Math.sin(T * 2 + i) * 3, sq0[1], 3 + ph * 2, 2.5 + ph * 1.5, 'rgba(255,255,255,.65)');
      }
      emo(c, '🧁', bx + bw / 2, by + bd, 30, 9);
    } else if (k === 'zoo') {
      // Zoo is decomposed into individual depth-sorted layers via collectZoo
      return;
    }
    const sgz = { conv: 16, bakery: 22, florist: 20, clinic: 20, photo: 30, school: 30, police: 16, fire: 24, library: 20, training: 20, pethotel: 18, chapel: 20, shelter: 26, zoo: 32 }[k] || 20;
    if (k !== 'zoo') signBoard(c, k === 'photo' ? bx + .9 : bx + bw / 2, k === 'shelter' ? y + 2.15 : by + bd, sgz, d.sign || d.ic, nm);
  }

  // ================= GRAND SAFARI ZOO: INDIVIDUAL DEPTH-SORTED COLLECT =================
  const ZOO_BADGE_MAP = {
    savanna: '사바나 사파리',
    panda: '판다 대나무 숲',
    elephant: '코끼리 쉼터',
    tiger: '호랑이 정글 협곡',
    bear: '갈색곰 바위 언덕',
    lagoon: '열대 하마 라군',
    monkey: '원숭이 정글 섬',
    polar: '극지 펭귄 빙하'
  };

  function collectZoo(list, c, o, T, addHit) {
    const x = o.x, y = o.y, w = 26, dd = 22, ZT = T || 0;
    const recentFeed = S && S.zoo && S.zoo.lastFed && (Date.now() - S.zoo.lastFed < 15000);

    // 1. BASE GROUND LAYER: Lawn, avenues, promenade, pavers (strictly lowest depth x + y - 10)
    // Characters walking in the zoo will ALWAYS be drawn ON TOP of this ground layer!
    list.push({
      depth: x + y - 10,
      fn: () => {
        poly(c, [Q(x + .08, y + .08), Q(x + w - .08, y + .08), Q(x + w - .08, y + dd - .08), Q(x + .08, y + dd - .08)], '#7ec858', '#356622', 2);
        for (let v = 1; v < dd - 1; v += 2) {
          poly(c, [Q(x + .2, y + v), Q(x + w - .2, y + v), Q(x + w - .2, y + v + 1), Q(x + .2, y + v + 1)], 'rgba(255,255,255,.06)');
        }
        // South-North central promenade avenue (u: 10.6..15.4)
        poly(c, [Q(x + 10.6, y + .4), Q(x + 15.4, y + .4), Q(x + 15.4, y + dd - .1), Q(x + 10.6, y + dd - .1)], '#e5d8c1', '#a89474', 1.4);
        // East-West cross avenues
        poly(c, [Q(x + .4, y + 6.8), Q(x + w - .4, y + 6.8), Q(x + w - .4, y + 8.4), Q(x + .4, y + 8.4)], '#e5d8c1', '#a89474', 1.4);
        poly(c, [Q(x + .4, y + 12.6), Q(x + w - .4, y + 12.6), Q(x + w - .4, y + 14.2), Q(x + .4, y + 14.2)], '#e5d8c1', '#a89474', 1.4);
        // South Entrance Plaza
        poly(c, [Q(x + 6.5, y + dd - 3.2), Q(x + 19.5, y + dd - 3.2), Q(x + 19.5, y + dd - .08), Q(x + 6.5, y + dd - .08)], '#dbccb2', '#9c8665', 1.4);
        // Decorative promenade pavers
        for (let vp = 1.2; vp < dd - 3.2; vp += 1.8) {
          poly(c, [Q(x + 11.2, y + vp), Q(x + 14.8, y + vp), Q(x + 14.8, y + vp + 1.1), Q(x + 11.2, y + vp + 1.1)], '#efe5d4', 'rgba(130,105,75,.38)', .9);
        }
      }
    });

    // Helper: Draw Enclosure
    const drawEnclosure = (hx, hy, hw, hd, groundCol, rimCol, badgeIc, badgeKey, mainSp) => {
      blk(c, hx, hy, hw, hd, 0, 6, rimCol || '#9c8d78');
      poly(c, [Q(hx + .18, hy + .18, 6.2), Q(hx + hw - .18, hy + .18, 6.2), Q(hx + hw - .18, hy + hd - .18, 6.2), Q(hx + .18, hy + hd - .18, 6.2)], groundCol, 'rgba(60,45,25,.38)', 1);
      const postCol = '#5c3d24', railCol = '#8c6239';
      for (let u = 0; u <= hw; u += 1.4) pole(c, hx + Math.min(hw, u), hy, 6, 24, postCol, 2.6);
      for (let v = 0; v <= hd; v += 1.4) {
        pole(c, hx, hy + Math.min(hd, v), 6, 24, postCol, 2.6);
        pole(c, hx + hw, hy + Math.min(hd, v), 6, 24, postCol, 2.6);
      }
      for (const rz of [13, 21]) {
        for (const [ax, ay, bx2, by2] of [[hx, hy, hx + hw, hy], [hx, hy, hx, hy + hd], [hx + hw, hy, hx + hw, hy + hd]]) {
          const p0 = Q(ax, ay, rz), p1 = Q(bx2, by2, rz);
          c.strokeStyle = railCol; c.lineWidth = 2.0; c.beginPath(); c.moveTo(p0[0], p0[1]); c.lineTo(p1[0], p1[1]); c.stroke();
        }
      }
      fS(c, hx + .12, hx + hw - .12, hy + hd, 6, 22, 'rgba(185,232,250,.38)', 'rgba(90,145,175,.8)');
      for (let u = 1.8; u < hw - .8; u += 1.8) pole(c, hx + u, hy + hd, 6, 22, '#5c3d24', 2);
      const gf0 = Q(hx + .1, hy + hd, 22), gf1 = Q(hx + hw - .1, hy + hd, 22);
      c.strokeStyle = '#5c3d24'; c.lineWidth = 3; c.beginPath(); c.moveTo(gf0[0], gf0[1]); c.lineTo(gf1[0], gf1[1]); c.stroke();

      // Signpost with safe localized text (User Request 5: 절대 원시 키가 나오지 않음)
      const rawTxt = t('zooBadge_' + badgeKey);
      const badgeTxt = (rawTxt && rawTxt !== ('zooBadge_' + badgeKey) && !rawTxt.startsWith('zooBadge_')) ? rawTxt : (ZOO_BADGE_MAP[badgeKey] || '사파리 구역');
      const sx = hx + .85, sy = hy + hd + .25;
      pole(c, sx, sy, 0, 32, '#5c3d24', 2.6);
      const sq = Q(sx, sy, 35);
      c.font = 'bold 9px sans-serif';
      const tw = Math.max(42, c.measureText(badgeTxt).width + 22);
      ART.rrect(c, sq[0] - tw / 2, sq[1] - 9, tw, 16, 5);
      c.fillStyle = '#fff9e6'; c.fill(); c.strokeStyle = '#5c3d24'; c.lineWidth = 1.4; c.stroke();
      c.textAlign = 'center'; c.fillStyle = '#3d2714'; c.fillText(badgeIc + ' ' + badgeTxt, sq[0], sq[1] + 2); c.textAlign = 'start';

      if (addHit && mainSp) {
        addHit({
          kind: 'zoo_animal',
          sp: mainSp,
          name: badgeTxt,
          desc: t('zooPetDesc_' + mainSp) || (badgeTxt + '의 사랑스러운 동물들을 관찰하고 먹이를 줄 수 있어요.'),
          habitat: badgeTxt,
          x0: sq[0] - tw / 2 - 4,
          x1: sq[0] + tw / 2 + 4,
          y0: sq[1] - 14,
          y1: sq[1] + 16
        });
      }
      return badgeTxt;
    };

    // Helper: Draw Zoo Tree
    const drawZooTree = (tx, ty, kind) => {
      const bq = Q(tx, ty, 6.2);
      ART.ell(c, bq[0], bq[1], 22, 10, 'rgba(0,0,0,.16)');
      pole(c, tx, ty, 6.2, 48, '#6e4726', 6);
      const tq = Q(tx, ty, 52);
      if (kind === 'acacia') {
        ART.ell(c, tq[0], tq[1], 36, 13, ART.grad(c, tq[0], tq[1], 36, '#4d8c32'), ART.OUT, 1.4);
        ART.ell(c, tq[0] - 14, tq[1] - 8, 25, 9.5, ART.grad(c, tq[0] - 14, tq[1] - 8, 25, '#63ab42'), ART.OUT, 1.2);
        ART.ell(c, tq[0] + 13, tq[1] - 6, 23, 9, ART.grad(c, tq[0] + 13, tq[1] - 6, 23, '#74bd52'), ART.OUT, 1.2);
      } else if (kind === 'palm') {
        for (let a = 0; a < 6; a++) {
          const ang = a * 1.05 + Math.sin(ZT * 1.5 + a) * .08;
          c.strokeStyle = '#2f855a'; c.lineWidth = 4.2; c.lineCap = 'round'; c.beginPath();
          c.moveTo(tq[0], tq[1]); c.quadraticCurveTo(tq[0] + Math.cos(ang) * 18, tq[1] - 11, tq[0] + Math.cos(ang) * 30, tq[1] + Math.sin(ang) * 13 + 7); c.stroke();
        }
        ART.ell(c, tq[0] - 3, tq[1] + 2, 4.5, 4, '#744210', ART.OUT, 1);
        ART.ell(c, tq[0] + 3, tq[1] + 2, 4.5, 4, '#744210', ART.OUT, 1);
      } else if (kind === 'pine') {
        for (let l = 0; l < 3; l++) {
          const py = tq[1] + 12 - l * 14, r = 24 - l * 5;
          c.beginPath(); c.moveTo(tq[0] - r, py); c.lineTo(tq[0], py - 24); c.lineTo(tq[0] + r, py); c.closePath();
          c.fillStyle = ['#2f6b3c', '#3b824a', '#489c59'][l]; c.fill(); c.strokeStyle = ART.OUT; c.lineWidth = 1.2; c.stroke();
        }
      }
    };

    // Helper: Draw Zoo Animal with Sleep Lying-Down & Side-Profile Walk & Click Hit
    const drawZooAnimal = (sp, ax, ay, az, T0, seed, extra, habitatName) => {
      const cycle = (T0 * 0.45 + seed * 2.3) % 16;
      let act = 'walk';
      let isMoving = true;
      let mood = 'calm';
      let emote = null;

      if (recentFeed) {
        act = 'eat'; isMoving = false; mood = 'happy'; emote = ['🍖', '🌿', '🍎', '🐟'][seed % 4];
      } else if (cycle < 6.0) {
        act = 'walk'; isMoving = true; mood = 'calm';
      } else if (cycle < 9.5) {
        act = 'idle'; isMoving = false; mood = Math.sin(T0 + seed) > 0 ? 'happy' : 'calm';
        if (Math.sin(T0 * 0.8 + seed * 3) > 0.85) emote = ['✨', '🎵', '👀'][seed % 3];
      } else if (cycle < 12.0) {
        act = 'eat'; isMoving = false; mood = 'happy'; emote = ['🌿', '🍖', '🌾', '🍉'][seed % 4];
      } else {
        // User Request 6: 엎드려 편안하게 잠자는 사랑스러운 모습
        act = 'sleep'; isMoving = false; mood = 'sleep'; emote = '💤';
      }

      const walkR = (extra && extra.rx) || .85, walkD = (extra && extra.ry) || .5;
      const phase = T0 * (0.8 + (seed % 3) * .2) + seed * 3.1;
      const mx = act === 'walk' ? ax + Math.cos(phase * .6) * walkR : ax + Math.cos(seed * 3) * (walkR * 0.4);
      const my = act === 'walk' ? ay + Math.sin(phase * .6) * walkD : ay + Math.sin(seed * 3) * (walkD * 0.4);
      const dx = -Math.sin(phase * .6) * walkR;
      const dir = dx >= 0 ? 1 : -1;
      const sc = ((extra && extra.sc) || 1.0) * 1.1;
      const q = Q(mx, my, az || 6.4);

      c.save();
      c.translate(q[0], q[1]);
      c.scale(sc, sc);
      ART.zooPet(c, sp, {
        t: T0 + seed * .7,
        mood,
        seed,
        moving: isMoving,
        dir,
        act
      });
      c.restore();

      if (emote) {
        const ey = q[1] - 38 * sc;
        c.font = (act === 'sleep' ? '12px' : '14px') + ' sans-serif';
        c.textAlign = 'center';
        const bob = act === 'eat' ? Math.sin(T0 * 6) * 1.5 : act === 'sleep' ? -Math.abs(Math.sin(T0 * 2)) * 2 : 0;
        c.fillText(emote, q[0], ey + bob);
        c.textAlign = 'start';
      }

      // User Request 4: 동물 클릭 시 설명/그림/먹이주기 모달 등록
      if (addHit) {
        const petNm = t('zooPetName_' + sp) || sp;
        const petDesc = t('zooPetDesc_' + sp) || (petNm + '의 생태와 서식지를 관찰할 수 있어요.');
        addHit({
          kind: 'zoo_animal',
          sp,
          name: petNm,
          desc: petDesc,
          habitat: habitatName || '사파리 동물원',
          x0: q[0] - 24 * sc,
          x1: q[0] + 24 * sc,
          y0: q[1] - 44 * sc,
          y1: q[1] + 10
        });
      }
    };

    // 2. HABITAT 1: AFRICAN SAVANNA (NW: x+0.5, y+0.5, w:10.0, d:6.2)
    const s1x = x + .5, s1y = y + .5, s1w = 10.0, s1d = 6.2;
    list.push({
      depth: s1x + s1y + s1d + 1,
      fn: () => {
        const hName = drawEnclosure(s1x, s1y, s1w, s1d, '#ead293', '#a88f68', '🦁', 'savanna', 'lion');
        const wh1 = Q(s1x + 7.2, s1y + 4.6, 6.4);
        ART.ell(c, wh1[0], wh1[1], 44, 19, '#4ea8de', '#8c734b', 2);
        ART.ell(c, wh1[0] - 10, wh1[1] - 3, 20, 7, 'rgba(255,255,255,.35)');
        blk(c, s1x + .5, s1y + .5, 3.2, 2.2, 6.2, 22, '#9c8567');
        blk(c, s1x + .8, s1y + .7, 2.2, 1.4, 28.2, 14, '#b0997a');
        fS(c, s1x + 1.1, s1x + 2.8, s1y + 2.7, 6.2, 20, '#2d2318');
        drawZooTree(s1x + 8.0, s1y + 1.8, 'acacia');
        drawZooTree(s1x + 4.8, s1y + 1.4, 'acacia');
        drawZooAnimal('lion', s1x + 1.9, s1y + 1.5, 42.5, ZT, 1, { rx: .25, ry: .18, sc: 1.08 }, hName);
        drawZooAnimal('giraffe', s1x + 6.0, s1y + 2.5, 6.4, ZT, 4, { rx: .85, ry: .5, sc: 1.18 }, hName);
        drawZooAnimal('giraffe', s1x + 8.2, s1y + 3.4, 6.4, ZT + 1.5, 5, { rx: .7, ry: .45, sc: .96 }, hName);
        drawZooAnimal('lioness', s1x + 3.0, s1y + 4.2, 6.4, ZT, 2, { rx: .95, ry: .55, sc: 1.0 }, hName);
        drawZooAnimal('zebra', s1x + 5.2, s1y + 5.2, 6.4, ZT, 6, { rx: .85, ry: .4, sc: .98 }, hName);
      }
    });

    // 3. HABITAT 2: PANDA BAMBOO SANCTUARY (NE: x+15.5, y+0.5, w:10.0, d:6.2)
    const s2x = x + 15.5, s2y = y + .5, s2w = 10.0, s2d = 6.2;
    list.push({
      depth: s2x + s2y + s2d + 1,
      fn: () => {
        const hName = drawEnclosure(s2x, s2y, s2w, s2d, '#8ccf7e', '#769c6e', '🐼', 'panda', 'panda');
        blk(c, s2x + .6, s2y + .5, 3.4, 2.1, 6.2, 30, '#fdf6e2');
        hip(c, s2x + .4, s2y + .35, 3.8, 2.4, 36.2, 18, '#2d6a4f');
        door(c, s2x + 2.0, s2y + 2.6, 20, '#7c3f10');
        blk(c, s2x + 5.2, s2y + 1.8, 2.6, 1.8, 6.2, 12, '#b07d48');
        for (let bi = 0; bi < 11; bi++) {
          const bx3 = s2x + 4.6 + (bi % 6) * .85, by3 = s2y + .7 + Math.floor(bi / 6) * .8;
          pole(c, bx3, by3, 6.2, 48 + (bi % 3) * 8, '#2f855a', 3.6);
          const bq = Q(bx3, by3, 44 + (bi % 3) * 7);
          ART.ell(c, bq[0] - 7, bq[1], 9, 3.8, '#48bb78', ART.OUT, .8);
          ART.ell(c, bq[0] + 7, bq[1] - 4, 9, 3.8, '#68d391', ART.OUT, .8);
        }
        drawZooAnimal('redpanda', s2x + 6.4, s2y + 2.6, 18.5, ZT, 11, { rx: .55, ry: .3, sc: .92 }, hName);
        drawZooAnimal('panda', s2x + 2.8, s2y + 4.2, 6.4, ZT, 8, { rx: .8, ry: .48, sc: 1.08 }, hName);
        drawZooAnimal('panda', s2x + 7.2, s2y + 4.8, 6.4, ZT + 1.8, 9, { rx: .75, ry: .45, sc: 1.02 }, hName);
        drawZooAnimal('redpanda', s2x + 4.2, s2y + 5.2, 6.4, ZT + 1.4, 12, { rx: .7, ry: .35, sc: .88 }, hName);
      }
    });

    // 4. HABITAT 3: ELEPHANT & RHINO OASIS (Mid-West: x+0.5, y+7.8, w:10.0, d:4.8)
    const s3x = x + .5, s3y = y + 7.8, s3w = 10.0, s3d = 4.8;
    list.push({
      depth: s3x + s3y + s3d + 1,
      fn: () => {
        const hName = drawEnclosure(s3x, s3y, s3w, s3d, '#dfb98c', '#9c7a56', '🐘', 'elephant', 'elephant');
        const mw3 = Q(s3x + 7.2, s3y + 2.8, 6.4);
        ART.ell(c, mw3[0], mw3[1], 38, 16, '#63b3ed', '#8c6d46', 1.8);
        blk(c, s3x + .5, s3y + .45, 3.0, 1.8, 6.2, 28, '#c99e6e');
        hip(c, s3x + .35, s3y + .35, 3.3, 2.0, 34.2, 14, '#8c5830');
        drawZooTree(s3x + 8.2, s3y + 1.1, 'palm');
        drawZooAnimal('elephant', s3x + 3.4, s3y + 2.8, 6.4, ZT, 13, { rx: .8, ry: .45, sc: 1.16 }, hName);
        drawZooAnimal('rhino', s3x + 7.5, s3y + 3.5, 6.4, ZT + 2.1, 15, { rx: .8, ry: .38, sc: 1.05 }, hName);
        drawZooAnimal('elephant', s3x + 5.2, s3y + 3.8, 6.4, ZT + 1.2, 14, { rx: .65, ry: .38, sc: .82 }, hName);
      }
    });

    // 5. HABITAT 4: SIBERIAN TIGER CANYON (Mid-East: x+15.5, y+7.8, w:10.0, d:4.8)
    const s4x = x + 15.5, s4y = y + 7.8, s4w = 10.0, s4d = 4.8;
    list.push({
      depth: s4x + s4y + s4d + 1,
      fn: () => {
        const hName = drawEnclosure(s4x, s4y, s4w, s4d, '#9ec484', '#718076', '🐯', 'tiger', 'tiger');
        blk(c, s4x + .5, s4y + .45, 3.5, 1.9, 6.2, 28, '#718096');
        blk(c, s4x + .9, s4y + .6, 2.2, 1.4, 34.2, 16, '#8a99ad');
        fS(c, s4x + 1.6, s4x + 2.8, s4y + 2.35, 6.2, 32, '#63b3ed', null);
        const wfPool = Q(s4x + 2.2, s4y + 2.8, 6.4);
        ART.ell(c, wfPool[0], wfPool[1], 28, 12, '#63b3ed', '#4a5568', 1.6);
        drawZooTree(s4x + 8.3, s4y + 1.1, 'pine');
        drawZooAnimal('whitetiger', s4x + 5.8, s4y + 2.6, 6.4, ZT + 1.6, 18, { rx: .85, ry: .42, sc: 1.04 }, hName);
        drawZooAnimal('tiger', s4x + 3.2, s4y + 3.6, 6.4, ZT, 17, { rx: .9, ry: .45, sc: 1.06 }, hName);
        drawZooAnimal('tiger', s4x + 7.2, s4y + 3.9, 6.4, ZT + 2.9, 19, { rx: .7, ry: .35, sc: .8 }, hName);
      }
    });

    // 6. CENTRAL FOUNTAIN & PLAZA (Center: x+13, y+10.2)
    // Depth: x + 13 + y + 10.2 -> Character walking north/south sorts naturally!
    const fqx = x + 13, fqy = y + 10.2;
    list.push({
      depth: fqx + fqy + 1.2,
      fn: () => {
        const fq = Q(fqx, fqy, 0);
        ART.ell(c, fq[0], fq[1], 50, 24, '#b8afa0', ART.OUT, 1.8);
        ART.ell(c, fq[0], fq[1] - 5, 50, 24, '#dcd4c6', ART.OUT, 1.5);
        ART.ell(c, fq[0], fq[1] - 6, 43, 20, '#4ea8de', '#3182ce', 1.2);
        c.fillStyle = '#cfc6b6'; c.fillRect(fq[0] - 6, fq[1] - 32, 12, 26); c.strokeStyle = ART.OUT; c.lineWidth = 1.2; c.strokeRect(fq[0] - 6, fq[1] - 32, 12, 26);
        ART.ell(c, fq[0], fq[1] - 32, 24, 11, '#e2dbd0', ART.OUT, 1.4);
        ART.ell(c, fq[0], fq[1] - 33, 19, 8.5, '#63b3ed');
        for (let wi = 0; wi < 8; wi++) {
          const wa = wi * .785 + ZT * 2.2, wr = 16 + Math.sin(ZT * 5 + wi) * 6;
          c.strokeStyle = 'rgba(210,245,255,.92)'; c.lineWidth = 2.2; c.beginPath();
          c.moveTo(fq[0], fq[1] - 46); c.quadraticCurveTo(fq[0] + Math.cos(wa) * wr * .6, fq[1] - 62, fq[0] + Math.cos(wa) * wr, fq[1] - 28 + Math.sin(wa) * 6); c.stroke();
        }
        emo(c, '🦁', fqx, fqy, 48, 22);
      }
    });

    // 7. HABITAT 5: TROPICAL HIPPO & CROCODILE LAGOON (SW: x+0.5, y+13.4, w:9.2, d:4.0)
    const s5x = x + .5, s5y = y + 13.4, s5w = 9.2, s5d = 4.0;
    list.push({
      depth: s5x + s5y + s5d + 1,
      fn: () => {
        const hName = drawEnclosure(s5x, s5y, s5w, s5d, '#38b2ac', '#688a78', '🐊', 'lagoon', 'hippo');
        const isl5 = Q(s5x + 3.2, s5y + 1.8, 6.5);
        ART.ell(c, isl5[0], isl5[1], 48, 17, '#f6e0b5', '#c9ad7c', 1.6);
        drawZooTree(s5x + 1.1, s5y + .8, 'palm');
        drawZooAnimal('flamingo', s5x + 3.8, s5y + 1.5, 6.5, ZT + .5, 25, { rx: .45, ry: .25, sc: .96 }, hName);
        drawZooAnimal('croc', s5x + 2.4, s5y + 2.1, 6.5, ZT, 22, { rx: .65, ry: .28, sc: 1.02 }, hName);
        drawZooAnimal('hippo', s5x + 6.5, s5y + 2.4, 6.5, ZT + 1.1, 24, { rx: .55, ry: .28, sc: 1.08 }, hName);
        drawZooAnimal('flamingo', s5x + 7.4, s5y + 3.0, 6.5, ZT + 2.7, 26, { rx: .45, ry: .25, sc: .94 }, hName);
      }
    });

    // 8. HABITAT 6: GRIZZLY BEAR MOUNTAIN RIDGE (SE-Mid: x+16.3, y+13.4, w:9.2, d:4.0)
    const s6x = x + 16.3, s6y = y + 13.4, s6w = 9.2, s6d = 4.0;
    list.push({
      depth: s6x + s6y + s6d + 1,
      fn: () => {
        const hName = drawEnclosure(s6x, s6y, s6w, s6d, '#a3b899', '#637859', '🐻', 'bear', 'bear');
        blk(c, s6x + .6, s6y + .4, 3.2, 1.8, 6.2, 24, '#6b7280');
        blk(c, s6x + 1.0, s6y + .6, 2.0, 1.2, 30.2, 12, '#9ca3af');
        drawZooTree(s6x + 7.8, s6y + 1.0, 'pine');
        drawZooAnimal('bear', s6x + 2.8, s6y + 2.0, 6.5, ZT + 2.2, 21, { rx: .6, ry: .3, sc: 1.08 }, hName);
        drawZooAnimal('bear', s6x + 6.5, s6y + 2.8, 6.5, ZT + .8, 20, { rx: .65, ry: .35, sc: .92 }, hName);
      }
    });

    // 9. HABITAT 7: POLAR PENGUIN & SEAL GLACIER POOL (South-East: x+16.9, y+18.0, w:8.6, d:3.6)
    const s8x = x + 16.9, s8y = y + 18.0, s8w = 8.6, s8d = 3.6;
    list.push({
      depth: s8x + s8y + s8d + 1,
      fn: () => {
        const hName = drawEnclosure(s8x, s8y, s8w, s8d, '#3182ce', '#6b8aa8', '🐧', 'polar', 'penguin');
        blk(c, s8x + .5, s8y + .4, 2.8, 1.4, 6.2, 20, '#e2f1ff');
        blk(c, s8x + .8, s8y + .5, 1.6, 1.0, 26.2, 12, '#ffffff');
        const floe6 = Q(s8x + 5.8, s8y + 1.8, 6.5);
        ART.ell(c, floe6[0], floe6[1], 36, 14, '#f0f8ff', '#a3c9e8', 1.6);
        drawZooAnimal('penguin', s8x + 1.6, s8y + 1.1, 38.5, ZT, 27, { rx: .35, ry: .2, sc: .96 }, hName);
        drawZooAnimal('seal', s8x + 6.8, s8y + 1.6, 6.5, ZT + 2.9, 31, { rx: .45, ry: .22, sc: .94 }, hName);
        drawZooAnimal('penguin', s8x + 5.0, s8y + 1.9, 6.5, ZT + 1.3, 28, { rx: .55, ry: .28, sc: .94 }, hName);
        drawZooAnimal('seal', s8x + 3.2, s8y + 2.4, 6.5, ZT + .7, 30, { rx: .55, ry: .26, sc: 1.02 }, hName);
      }
    });

    // 10A. GRAND SAFARI ENTRANCE - LEFT TICKET PAVILION
    const gx = x + 9.6, gy = y + dd - 3.2, gw = 6.8, gd = 2.2;
    list.push({
      depth: gx + 1.9 + gy + gd,
      fn: () => {
        // Left Ticket Pavilion (solid building)
        blk(c, gx, gy, 1.9, gd, 0, 56, '#f5e6cc');
        hip(c, gx - .15, gy - .15, 2.2, gd + .3, 56, 20, '#2b8a3e');
        winS(c, gx + .4, gy + gd, 16, 1.1, 16, true, '#5c3d24');
        awning(c, gx + .15, gx + 1.75, gy + gd, 36, '#2b8a3e', '#fffdf0');
      }
    });

    // 10B. GRAND SAFARI ENTRANCE - RIGHT SOUVENIR/FEED KIOSK & ZOOKEEPER
    list.push({
      depth: gx + gw + gy + gd,
      fn: () => {
        // Right Souvenir / Feed Shop (solid building)
        blk(c, gx + gw - 1.9, gy, 1.9, gd, 0, 56, '#f5e6cc');
        hip(c, gx + gw - 2.05, gy - .15, 2.2, gd + .3, 56, 20, '#d97724');
        winS(c, gx + gw - 1.5, gy + gd, 16, 1.1, 16, true, '#5c3d24');
        awning(c, gx + gw - 1.75, gx + gw - .15, gy + gd, 36, '#d97724', '#fffdf0');

        // Zookeeper in khaki uniform stationed at the kiosk
        const zkX = gx + gw - 0.95, zkY = gy + gd + 0.35, zkq = Q(zkX, zkY, 0);
        c.save(); c.translate(zkq[0], zkq[1]);
        ART.human(c, { skin: '#f9d3b4', hair: '#3b2a20', hs: 0, shirt: '#d4a359', pants: '#5e503f', hat: '#8a6236' }, 0, ZT, false, 'happy', 1, false);
        c.restore();
      }
    });

    // 11. HIGH OVERHEAD SAFARI ARCH & GRAND ISOMETRIC BILLBOARD SIGN
    // Depth is placed at the archway baseline so characters walking through the walkway are correctly layered!
    list.push({
      depth: gx + gw / 2 + gy + 1.0,
      fn: () => {
        // Overhead bridge arch connecting the towers (high up at z: 48..64)
        blk(c, gx + 1.5, gy + .3, gw - 3.0, 1.2, 48, 16, '#8c5a32');

        // Grand 3D Isometric Billboard Sign (angled along isometric X axis)
        const xA = gx + 1.3, xB = gx + gw - 1.3, signY = gy + gd - .05;
        const zTop = 86, zBot = 62;
        const pTL = Q(xA, signY, zTop), pTR = Q(xB, signY, zTop);
        const pBR = Q(xB, signY, zBot), pBL = Q(xA, signY, zBot);

        // Sign background shadow & wooden mounting posts
        poly(c, [pTL, pTR, pBR, pBL], '#21562b', '#133519', 2.8);

        // Inner golden bevel border
        const inA = (xA * 39 + xB) / 40, inB = (xA + xB * 39) / 40;
        const ipTL = Q(inA, signY, zTop - 2.5), ipTR = Q(inB, signY, zTop - 2.5);
        const ipBR = Q(inB, signY, zBot + 2.5), ipBL = Q(inA, signY, zBot + 2.5);
        poly(c, [ipTL, ipTR, ipBR, ipBL], '#fffdf2', '#e0a243', 1.6);

        // Diagonal affine shear: baseline matches building slope, upright vertical text
        const dx = pTR[0] - pTL[0], dy = pTR[1] - pTL[1], L = Math.hypot(dx, dy);
        const midX = (pTL[0] + pBR[0]) / 2, midY = (pTL[1] + pBR[1]) / 2;
        c.save();
        c.transform(dx / L, dy / L, 0, 1, midX, midY);
        c.font = 'bold 12px sans-serif';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillStyle = '#1e5628';
        c.fillText('🦁 GRAND SAFARI ZOO 🦒', 0, 0);
        c.restore();
      }
    });
  }
  // open lots: town gate, dog park, weekend market, clock tower, lookout tower
  function openLot(c, o, T, lit, nm) {
    const d = D[o.k], x = o.x, y = o.y, w = d.w, dd = d.d, k = o.k;
    if (k === 'gate') {
      for (const px of [x + .3, x + w - .3]) { const a = Q(px, y + .5), b2 = Q(px, y + .5, 40); c.strokeStyle = '#8a5a33'; c.lineWidth = 4; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b2[0], b2[1]); c.stroke(); }
      const a = Q(x + .3, y + .5, 40), b2 = Q(x + w - .3, y + .5, 40); c.strokeStyle = '#b98757'; c.lineWidth = 3; c.beginPath(); c.moveTo(a[0], a[1]); c.quadraticCurveTo((a[0] + b2[0]) / 2, (a[1] + b2[1]) / 2 - 14, b2[0], b2[1]); c.stroke();
      const m = Q(x + w / 2, y + .5, 36); ART.rrect(c, m[0] - 34, m[1] - 9, 68, 16, 6); c.fillStyle = '#fff3d6'; c.fill(); c.strokeStyle = '#8a5a33'; c.lineWidth = 1.5; c.stroke();
      c.font = 'bold 8px sans-serif'; c.textAlign = 'center'; c.fillStyle = '#c0504e'; c.fillText('🐾 PET TOWN 🐾', m[0], m[1] + 2); c.textAlign = 'start'; flowers(c, x + .1, y + .8, 4, 1); flowers(c, x + w - 1, y + .8, 4, 3); return;
    }
    if (k === 'dogpark') {
      poly(c, [Q(x + .3, y + .3), Q(x + w - .3, y + .3), Q(x + w - .3, y + dd - .3), Q(x + .3, y + dd - .3)], '#8fd06a');
      fence(c, x + .3, y + .3, x + w - .3, y + .3); fence(c, x + w - .3, y + .3, x + w - .3, y + dd - .3); fence(c, x + .3, y + .3, x + .3, y + dd - .3); fence(c, x + .3, y + dd - .3, x + w / 2 - .6, y + dd - .3); fence(c, x + w / 2 + .6, y + dd - .3, x + w - .3, y + dd - .3);
      blk(c, x + .7, y + .7, .8, .7, 0, 10, '#c8864a'); gable(c, x + .7, y + .7, .8, .7, 10, 7, '#d9534f', '#c8864a');
      for (let i = 0; i < 3; i++) { const a = Q(x + 2.5 + i * .6, y + 2, 7), b2 = Q(x + 2.9 + i * .6, y + 2, 7); c.strokeStyle = ['#ffd166', '#4a9be0', '#e8534f'][i]; c.lineWidth = 2; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b2[0], b2[1]); c.stroke(); }
      for (let i = 0; i < 2; i++) { const a = T * .6 + i * 3.1, px = x + w / 2 + Math.cos(a) * 1.4, py = y + dd / 2 + .4 + Math.sin(a) * 1.1, q = Q(px, py), dir = -Math.sin(a) - Math.cos(a) > 0 ? 1 : -1; c.save(); c.translate(q[0], q[1] - Math.abs(Math.sin(T * 9 + i)) * 2); c.scale(.5 * dir, .5); ART.pet(c, ['corgi', 'shiba'][i], { t: T, mood: 'happy', seed: 3 + i, age: 1, moving: true, dir }); c.restore(); }
      return;
    }
    if (k === 'market') {
      for (let i = 0; i < 3; i++) { const sx = x + .25 + i * 1.25, sy = y + .5, col = ['#e24a3b', '#4a9be0', '#6ab04c'][i];
        blk(c, sx, sy + .9, 1, .5, 0, 7, '#b07a44'); const q = Q(sx + .5, sy + 1.15, 8); c.font = '9px sans-serif'; c.textAlign = 'center'; c.fillText(['🍎🥕', '🧸🎀', '🌷🪴'][i], q[0], q[1]); c.textAlign = 'start';
        for (const px of [sx + .05, sx + .95]) { const a = Q(px, sy + .5), b2 = Q(px, sy + .5, 26); c.strokeStyle = '#8a5a33'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b2[0], b2[1]); c.stroke(); }
        awning(c, sx, sx + 1, sy + .4, 28, col, '#ffffff'); }
      signBoard(c, x + w / 2, y + dd - .2, 4, '🛒', nm); return;
    }
    if (k === 'clocktower') {
      poly(c, [Q(x + .2, y + .2), Q(x + w - .2, y + .2), Q(x + w - .2, y + dd - .2), Q(x + .2, y + dd - .2)], '#dcc79a', 'rgba(120,95,60,.4)');
      blk(c, x + .9, y + .9, 1.2, 1.2, 0, 70, '#e8dcc8'); blk(c, x + .8, y + .8, 1.4, 1.4, 70, 4, '#b85a4a');
      const tp = Q(x + 1.5, y + 1.5, 74); c.beginPath(); c.moveTo(tp[0] - 16, tp[1] + 4); c.lineTo(tp[0], tp[1] - 26); c.lineTo(tp[0] + 16, tp[1] + 4); c.closePath(); c.fillStyle = '#b85a4a'; c.fill(); c.strokeStyle = ART.OUT; c.stroke();
      const cq = Q(x + 1.5, y + 2.1, 56), m = S.clock ? S.clock.m : 480; ART.ell(c, cq[0], cq[1], 9, 9, '#ffffff', ART.OUT, 1.2);
      for (const [len, ang] of [[5, ((m / 60) % 12) / 12], [7.5, (m % 60) / 60]]) { const a = ang * 6.283 - 1.571; c.strokeStyle = '#333'; c.lineWidth = len > 6 ? 1 : 1.8; c.beginPath(); c.moveTo(cq[0], cq[1]); c.lineTo(cq[0] + Math.cos(a) * len, cq[1] + Math.sin(a) * len); c.stroke(); }
      flowers(c, x + .2, y + dd - .5, 8, 1); return;
    }
    if (k === 'lookout') {
      for (const [px, py] of [[x + .2, y + .2], [x + w - .2, y + .2], [x + .2, y + dd - .2], [x + w - .2, y + dd - .2]]) { const a = Q(px, py), b2 = Q(x + w / 2 + (px - x - w / 2) * .45, y + dd / 2 + (py - y - dd / 2) * .45, 80); c.strokeStyle = '#8a5a33'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b2[0], b2[1]); c.stroke(); }
      for (const z of [26, 52]) { const r = 1 - z / 80 * .55; poly(c, [Q(x + w / 2 - r, y + dd / 2 - r, z), Q(x + w / 2 + r, y + dd / 2 - r, z), Q(x + w / 2 + r, y + dd / 2 + r, z), Q(x + w / 2 - r, y + dd / 2 + r, z)], null, '#8a5a33', 1.4); }
      blk(c, x + .35, y + .35, w - .7, dd - .7, 80, 3, '#c8864a'); fence(c, x + .35, y + dd - .35, x + w - .35, y + dd - .35);
      const q = Q(x + w / 2, y + dd / 2, 94); c.font = '14px sans-serif'; c.textAlign = 'center'; c.fillText('🔭', q[0], q[1]); c.textAlign = 'start';
    }
  }
  const HOUSE_TOP = { cottage: 70, tower: 118, family: 88, yard: 72, barn: 92, twostory: 112, row: 88, villa: 132 }; // roof top of the bigger houses (px) -> tags float just above
  function occTag(c, o) {
    if (!D[o.k] || D[o.k].cat !== 'house') return;
    const q = Q(o.x + 2.5, o.y + 2.5, HOUSE_TOP[o.k] || 90), txt = (o.n || 0) + '/' + capOf(o), full = (o.n || 0) >= capOf(o);
    c.font = 'bold 9px sans-serif'; const tw = c.measureText(txt).width + 22;
    ART.rrect(c, q[0] - tw / 2, q[1] - 8, tw, 14, 7); c.fillStyle = full ? '#e8f7de' : 'rgba(255,255,255,.92)'; c.fill(); c.strokeStyle = full ? '#5cae3c' : '#b8a07a'; c.lineWidth = 1; c.stroke();
    c.textAlign = 'center'; c.fillStyle = '#5a3a2a'; c.fillText('👤' + txt, q[0], q[1] + 2.5); c.textAlign = 'start';
  }
  function lvBadge(c, o) {
    const L = lvOf(o); if (L < 2 || !D[o.k] || (D[o.k].cat !== 'civic' && D[o.k].cat !== 'house')) return;
    const f = fpOf(o.k, o.r), open = D[o.k].open, z = D[o.k].cat === 'house' ? (HOUSE_TOP[o.k] || 90) + 18 : open ? 34 : (D[o.k].h || 24) + 16 + D[o.k].w * 2.4 + (o.k === 'chapel' ? 40 : 0), q = Q(o.x + f.w / 2, o.y + f.d / 2, z);
    c.font = 'bold 8px sans-serif'; const bw = c.measureText('⭐'.repeat(L - 1) + ' Lv' + L).width + 12;
    ART.rrect(c, q[0] - bw / 2, q[1] - 9, bw, 14, 7); c.fillStyle = L === 3 ? '#fff0b8' : '#ffffff'; c.fill(); c.strokeStyle = L === 3 ? '#e0a020' : '#c9962a'; c.lineWidth = 1.2; c.stroke();
    c.textAlign = 'center'; c.fillStyle = '#7a4f2e'; c.fillText('⭐'.repeat(L - 1) + ' Lv' + L, q[0], q[1] + 1); c.textAlign = 'start';
    frameOn(o, D[o.k].w, D[o.k].d); try { const d = D[o.k]; flowers(c, o.x + .1, o.y + d.d - .45, L === 3 ? 8 : 4, o.x + L); if (L === 3 && d.cat === 'civic' && !d.open) for (const lx of [o.x + .15, o.x + d.w - .15]) { const a = Q(lx, o.y + d.d - .2), b2 = Q(lx, o.y + d.d - .2, 26); c.strokeStyle = '#3a3a44'; c.lineWidth = 1.6; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b2[0], b2[1]); c.stroke(); ART.ell(c, b2[0], b2[1], 3.5, 4, '#ffe68a', ART.OUT, .8); } } finally { frameOff(); }
  }
  function drawObj(c, o, T, ghost) { const d = D[o.k]; if (!d) return; drawObj_(c, o, T, ghost); if (!ghost) { occTag(c, o); lvBadge(c, o); } }
  function drawObj_(c, o, T, ghost) { const d = D[o.k]; if (!d) return; if (d.cat === 'house') drawHouse(c, { x: o.x, y: o.y, v: KINDS.indexOf(o.k), cw: o.cw || 0, cr: o.cr || 0, r: o.r }, T); else if (d.cat === 'tree') drawTree(c, o, T, ghost); else if (d.cat === 'civic') drawCivic(c, o, T); else drawDeco(c, o, T); }
  const depthOf = o => { const f = fpOf(o.k, o.r), d = D[o.k]; if (d && d.cat === 'house') return o.x + o.y + 4.2; if (d && d.cat === 'civic' && !d.open) return o.x + o.y + f.w / 2 + f.d / 2 + .3; return o.x + o.y + f.w + f.d - 1.02; };
  // the ghost while choosing a spot: footprint tiles (green = fine, red = not here) + the building, half see-through
  function drawGhost(c, g, T) {
    const f = fpOf(g.k, g.r), bad = canPlace(S, g.k, g.x, g.y, g.r, g.mv);
    for (let u = 0; u < f.w; u++) for (let v = 0; v < f.d; v++) poly(c, [Q(g.x + u + .05, g.y + v + .05), Q(g.x + u + .95, g.y + v + .05), Q(g.x + u + .95, g.y + v + .95), Q(g.x + u + .05, g.y + v + .95)], bad ? 'rgba(230,70,60,.45)' : 'rgba(80,200,90,.45)', bad ? '#c0302a' : '#2e8a3a', 1.2);
    if (g.k === 'zone') { const L = laneOf({ x: g.x, y: g.y, w: f.w, d: f.d, r: g.r }); poly(c, [Q(L.x, L.y), Q(L.x + L.w, L.y), Q(L.x + L.w, L.y + L.d), Q(L.x, L.y + L.d)], 'rgba(230,218,194,.8)'); }
    if (D[g.k] && (D[g.k].cat === 'big' || D[g.k].cat === 'zone')) { // a big lot: outline + the building's icon and name floating over it
      const q = Q(g.x + f.w / 2, g.y + f.d / 2); poly(c, [Q(g.x, g.y), Q(g.x + f.w, g.y), Q(g.x + f.w, g.y + f.d), Q(g.x, g.y + f.d)], null, bad ? '#c0302a' : '#2e8a3a', 4);
      c.font = '64px sans-serif'; c.textAlign = 'center'; c.fillText(D[g.k].ic, q[0], q[1] - 10); c.font = 'bold 26px sans-serif'; c.lineWidth = 6; c.strokeStyle = '#fff'; c.lineJoin = 'round'; c.strokeText(t('tk_' + g.k), q[0], q[1] + 26); c.fillStyle = '#5a3a2a'; c.fillText(t('tk_' + g.k), q[0], q[1] + 26); c.textAlign = 'start';
    } else { c.globalAlpha = .6; drawObj(c, { k: g.k, x: g.x, y: g.y, r: g.r, cw: 1, cr: 0, pd: -99 }, T, true); c.globalAlpha = 1; }
    return !bad;
  }
  // ---------------- the pet that follows its owner around the village ----------------
  const follows = () => (S.follow || {});
  function followStep(dt, actors, mkActor, alive, meActor) {
    const map = follows();
    for (const who in map) {
      const pid = map[who], p = S.home && (S.home.pets || []).find(q => q.id === pid); if (!p) continue;
      const owner = who === CFG.id ? meActor : actors.get('u' + who); if (!owner) continue;
      const id = 'fw_' + who; alive.add(id);
      let a = actors.get(id); if (!a) a = mkActor(id, 'fpet', owner.x - .6, owner.y + .4, { pet: p, trail: [] });
      a.pet = p; a.t += dt;
      const tr = a.trail; if (!tr.length || Math.hypot(tr[tr.length - 1].x - owner.x, tr[tr.length - 1].y - owner.y) > .15) tr.push({ x: owner.x, y: owner.y }); while (tr.length > 60) tr.shift();
      const tgt = tr.length > 6 ? tr[tr.length - 6] : { x: owner.x - .5, y: owner.y + .3 }, dx = tgt.x - a.x, dy = tgt.y - a.y, d = Math.hypot(dx, dy);
      if (d > 6) { a.x = tgt.x; a.y = tgt.y; } // owner went through a door / teleported
      else if (d > .35) { const sp = Math.min(d, (owner.speed || 2.4) * 1.15 * dt * (d > 1.2 ? 1.6 : 1)); a.x += dx / d * sp; a.y += dy / d * sp; a.moving = true; if (Math.abs(dx - dy) > .05) a.dir = dx - dy > 0 ? 1 : -1; }
      else a.moving = false;
      a.hidden = !!owner.hidden;
    }
  }
  function drawFollower(c, a, T) {
    const sx = ISO.wx(a.x, a.y), sy = ISO.wy(a.x, a.y), p = a.pet, sz = .6 * (p.grow != null && G.ageOf ? .6 + .4 * G.ageOf(p) : 1);
    ART.ell(c, sx, sy, 10, 4, 'rgba(0,0,0,.14)');
    c.save(); c.translate(sx, sy - (a.moving ? Math.abs(Math.sin(T * 10)) * 1.5 : 0)); c.scale(sz * (a.dir || 1), sz); ART.pet(c, p.sp, { t: T, mood: 'happy', seed: p.coat, age: p.grow != null ? G.ageOf(p) : 1, moving: a.moving, dir: a.dir || 1, wear: p.wear }); c.restore();
    if (!a.moving && Math.sin(T * .7 + (a.pet.coat || 0)) > .97) { c.font = '11px sans-serif'; c.textAlign = 'center'; c.fillText('💕', sx + 6, sy - 30); c.textAlign = 'start'; }
  }
  // ---------------- residential zones: ground (under everything) + entrance sign ----------------
  // any paved tile near the shop's walls? (then world.js repaints the walls over the road)
  let _rn = null, _rnKey = '';
  const roadNearShop = () => { const R = roadSet(S), k = R.size + ':' + (S.town && S.town.rv) + ':' + Wd() + 'x' + Hd(); if (k !== _rnKey) { _rnKey = k; const W = Wd(), H = Hd(); _rn = false; for (const q of R) { const [x, y] = q.split(',').map(Number); if (x >= -12 && x <= W + 2 && y >= -12 && y <= H + 2) { _rn = true; break; } } } return _rn; };
  function ground(c, T) {
    const W = Wd(), H = Hd();
    const R = roadSet(S); // road tiles the player paved
    const rstyles = (S && S.town && S.town.rstyle) || {};
    // Helper to draw a road tile at (x, y) with the chosen road style
    const drawRoadTile = (x, y, style) => {
      const st = style || 'cobble';
      if (st === 'brick') {
        poly(c, [Q(x, y), Q(x + 1, y), Q(x + 1, y + 1), Q(x, y + 1)], '#b85d43');
        const bricks = [
          [0.04, 0.04, 0.48, 0.30], [0.52, 0.04, 0.96, 0.30],
          [0.04, 0.36, 0.30, 0.64], [0.34, 0.36, 0.74, 0.64], [0.78, 0.36, 0.96, 0.64],
          [0.04, 0.70, 0.48, 0.96], [0.52, 0.70, 0.96, 0.96]
        ];
        for (let i = 0; i < bricks.length; i++) {
          const [u0, v0, u1, v1] = bricks[i];
          const col = ['#cf6a4e', '#c2593f', '#d9785b', '#b54e35'][(x + y + i) % 4];
          poly(c, [Q(x + u0, y + v0), Q(x + u1, y + v0), Q(x + u1, y + v1), Q(x + u0, y + v1)], col, 'rgba(235,215,195,.45)', .7);
        }
      } else if (st === 'wood') {
        poly(c, [Q(x, y), Q(x + 1, y), Q(x + 1, y + 1), Q(x, y + 1)], '#8c5a32');
        for (let i = 0; i < 4; i++) {
          const v0 = i * 0.25 + 0.02, v1 = (i + 1) * 0.25 - 0.02;
          const col = ['#b8824e', '#ad7642', '#c48d58', '#a36d3a'][(x + y + i) % 4];
          poly(c, [Q(x + .02, y + v0), Q(x + .98, y + v0), Q(x + .98, y + v1), Q(x + .02, y + v1)], col, 'rgba(55,30,12,.45)', .8);
          for (const ux of [0.12, 0.88]) {
            const np = Q(x + ux, y + (v0 + v1) * .5);
            ART.ell(c, np[0], np[1], 1.1, .8, 'rgba(50,28,10,.55)');
          }
        }
      } else if (st === 'marble') {
        poly(c, [Q(x, y), Q(x + 1, y), Q(x + 1, y + 1), Q(x, y + 1)], '#ede6d8');
        poly(c, [Q(x + .05, y + .05), Q(x + .95, y + .05), Q(x + .95, y + .95), Q(x + .05, y + .95)], (x + y) % 2 ? '#faf6ee' : '#f2ece1', '#d4af37', 1);
        poly(c, [Q(x + .5, y + .22), Q(x + .78, y + .5), Q(x + .5, y + .78), Q(x + .22, y + .5)], 'rgba(212,175,55,.22)', 'rgba(185,148,40,.45)', .7);
      } else if (st === 'step') {
        poly(c, [Q(x, y), Q(x + 1, y), Q(x + 1, y + 1), Q(x, y + 1)], 'rgba(125,192,84,.55)');
        for (const [ux, vy, rx, ry, col] of [[.32, .34, 7.5, 4.2, '#dcd3c2'], [.70, .68, 8.2, 4.5, '#cfc5b4'], [.28, .76, 4.5, 2.5, '#e3dacb']]) {
          const p = Q(x + ux, y + vy);
          ART.ell(c, p[0], p[1] + 1, rx, ry, 'rgba(40,55,20,.22)');
          ART.ell(c, p[0], p[1], rx, ry, col, 'rgba(90,75,55,.45)', .8);
        }
        if ((x * 3 + y * 5) % 3 === 0) {
          const fp = Q(x + .75, y + .26);
          ART.ell(c, fp[0], fp[1], 2.2, 1.8, '#ffd166');
        }
      } else if (st === 'pink') {
        poly(c, [Q(x, y), Q(x + 1, y), Q(x + 1, y + 1), Q(x, y + 1)], '#f3ccd8');
        const stones = [[0.05, 0.05, 0.46, 0.46], [0.54, 0.05, 0.95, 0.46], [0.05, 0.54, 0.46, 0.95], [0.54, 0.54, 0.95, 0.95]];
        for (let sIdx = 0; sIdx < 4; sIdx++) {
          const [u0, v0, u1, v1] = stones[sIdx];
          const col = ['#fde2ea', '#f9d0dc', '#fff0f5', '#f5c2d1'][(x + y + sIdx) % 4];
          poly(c, [Q(x + u0, y + v0), Q(x + u1, y + v0), Q(x + u1, y + v1), Q(x + u0, y + v1)], col, 'rgba(165,95,115,.35)', .8);
        }
      } else {
        poly(c, [Q(x, y), Q(x + 1, y), Q(x + 1, y + 1), Q(x, y + 1)], '#d8ccb8');
        const stones = [
          [0.05, 0.05, 0.45, 0.45],
          [0.55, 0.05, 0.95, 0.45],
          [0.05, 0.55, 0.45, 0.95],
          [0.55, 0.55, 0.95, 0.95]
        ];
        for (let sIdx = 0; sIdx < 4; sIdx++) {
          const [u0, v0, u1, v1] = stones[sIdx];
          const hash = Math.abs(Math.sin((x + u0) * 17.1 + (y + v0) * 31.7) * 43758.5453);
          const col = ['#e4d9c6', '#d6c8b4', '#dfd3c0', '#cfc2ad'][(Math.floor(hash * 10)) % 4];
          const pts = [Q(x + u0, y + v0), Q(x + u1, y + v0), Q(x + u1, y + v1), Q(x + u0, y + v1)];
          poly(c, pts, col, 'rgba(55,38,20,.38)', .9);
          const h0 = Q(x + u0 + .02, y + v0 + .02), h1 = Q(x + u1 - .02, y + v0 + .02);
          c.beginPath(); c.moveTo(h0[0], h0[1]); c.lineTo(h1[0], h1[1]);
          c.strokeStyle = 'rgba(255,255,255,.32)'; c.lineWidth = .9; c.stroke();
        }
      }
    };
    // 1. Draw residential zones FIRST so player roads paved inside or across zone borders draw cleanly on top!
    for (const z of zonesOf(S)) {
      poly(c, [Q(z.x, z.y), Q(z.x + z.w, z.y), Q(z.x + z.w, z.y + z.d), Q(z.x, z.y + z.d)], 'rgba(135,196,80,.5)');
      const L = laneOf(z);
      for (let lx = L.x; lx < L.x + L.w; lx++) {
        for (let ly = L.y; ly < L.y + L.d; ly++) {
          drawRoadTile(lx, ly, rstyles[lx + ',' + ly] || 'cobble');
        }
      }
      const hedge = (x0, y0, x1, y1) => {
        const n = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0) / .5));
        for (let i = 0; i <= n; i++) {
          const hx = x0 + (x1 - x0) * i / n, hy = y0 + (y1 - y0) * i / n;
          if (R.has(Math.floor(hx) + ',' + Math.floor(hy)) || R.has(Math.floor(hx - .1) + ',' + Math.floor(hy - .1))) continue;
          const q = Q(hx, hy);
          ART.ell(c, q[0], q[1] + 1, 7, 3.5, 'rgba(25,45,15,.2)');
          ART.ell(c, q[0], q[1] - 3, 6, 4.6, i % 2 ? '#4f9c42' : '#5fb350', 'rgba(30,60,20,.6)', .8);
          ART.ell(c, q[0] - 1.5, q[1] - 5, 2.5, 1.8, 'rgba(255,255,255,.28)');
        }
      };
      if (isVertZone(z)) {
        hedge(z.x, z.y, z.x, z.y + z.d); hedge(z.x + z.w, z.y, z.x + z.w, z.y + z.d);
        for (const yy of [z.y, z.y + z.d]) { hedge(z.x, yy, L.x, yy); hedge(L.x + L.w, yy, z.x + z.w, yy); }
      } else {
        hedge(z.x, z.y, z.x + z.w, z.y); hedge(z.x, z.y + z.d, z.x + z.w, z.y + z.d);
        for (const xx of [z.x, z.x + z.w]) { hedge(xx, z.y, xx, L.y); hedge(xx, L.y + L.d, xx, z.y + z.d); }
      }
    }
    // 2. Draw player-paved roads on top
    {
      for (const k of R) {
        const [x, y] = k.split(',').map(Number);
        if (x >= 0 && x < W && y >= 0 && y < H) continue;
        const st = rstyles[k] || 'cobble';
        const n = (dx, dy) => R.has((x + dx) + ',' + (y + dy));
        drawRoadTile(x, y, st);
        if (st !== 'step') {
          c.strokeStyle = st === 'pink' ? 'rgba(175,95,120,.55)' : st === 'marble' ? 'rgba(185,148,40,.65)' : 'rgba(100,75,45,.65)';
          c.lineWidth = 1.3;
          for (const [on, a, b2] of [
            [!n(0, -1), Q(x, y), Q(x + 1, y)],
            [!n(0, 1), Q(x, y + 1), Q(x + 1, y + 1)],
            [!n(-1, 0), Q(x, y), Q(x, y + 1)],
            [!n(1, 0), Q(x + 1, y), Q(x + 1, y + 1)]
          ]) if (on) { c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b2[0], b2[1]); c.stroke(); }
        }
      }
    }
  }
  function collect(c, T, addHit) {
    const out = [];
    if (typeof S !== 'undefined' && S && S.town && S.town.objs) {
      for (const o of S.town.objs) {
        if (o.k === 'zoo') {
          collectZoo(out, c, o, T, addHit);
        }
      }
    }
    for (const z of zonesOf(S)) {
      const L = laneOf(z);
      const signs = isVertZone(z)
        ? [[L.x - .4, z.y - .5], [L.x + L.w + .4, z.y + z.d + .5]]
        : [[z.x - .5, L.y - .4], [z.x + z.w + .5, L.y + L.d + .4]];
      for (const [sx, sy] of signs) out.push({ depth: sx + sy + 1, fn: () => {
        const a = Q(sx, sy), b2 = Q(sx, sy, 30); c.strokeStyle = '#7a4e32'; c.lineWidth = 3; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b2[0], b2[1]); c.stroke();
        const txt = '🏘️ ' + t('tZoneName'); c.font = 'bold 9px sans-serif'; const tw = c.measureText(txt).width + 14;
        ART.rrect(c, b2[0] - tw / 2, b2[1] - 14, tw, 16, 5); c.fillStyle = '#fff3d6'; c.fill(); c.strokeStyle = '#8a5a33'; c.lineWidth = 1.4; c.stroke();
        c.textAlign = 'center'; c.fillStyle = '#5a3a2a'; c.fillText(txt, b2[0], b2[1] - 3); c.textAlign = 'start';
        if (addHit) addHit({ kind: 'tzonesign', x0: b2[0] - tw / 2, x1: b2[0] + tw / 2, y0: b2[1] - 16, y1: a[1] + 4 });
      } });
    }
    return out;
  }
  // the road tool's preview: the first point and the straight L-shaped run to where you tap next
  function roadLine(a, b) { const out = []; const sx = Math.sign(b.x - a.x), sy = Math.sign(b.y - a.y); let x = a.x, y = a.y; out.push([x, y]); while (x !== b.x) { x += sx; out.push([x, y]); } while (y !== b.y) { y += sy; out.push([x, y]); } return out; }
  function drawRoadTool(c, st) {
    if (!st || !st.a) return; const col = st.erase ? 'rgba(230,70,60,.55)' : 'rgba(80,170,230,.55)';
    const p = Q(st.a.x + .5, st.a.y + .5); poly(c, [Q(st.a.x, st.a.y), Q(st.a.x + 1, st.a.y), Q(st.a.x + 1, st.a.y + 1), Q(st.a.x, st.a.y + 1)], col, '#ffffff', 2);
    c.font = '16px sans-serif'; c.textAlign = 'center'; c.fillText(st.erase ? '🧽' : '📍', p[0], p[1] - 8); c.textAlign = 'start';
  }
  // ---------------- villagers out and about (v1.3): visual only, each phone runs its own ----------------
  // they leave a house with people in it, walk to a shop / public building / fountain..., stay a while, come back out with what they got, and go home
  const VISIT = { bakery: '🥐', conv: '🛍️', florist: '💐', clinic: '💊', dogpark: '🐕', photo: '📸', school: '📚', police: '👮', fire: '🚒', library: '📖', market: '🛒', training: '🎓', pethotel: '🏨', clocktower: '🕰️', lookout: '🔭', chapel: '💒', gate: '👋', fountain: '💦', playground: '🛝', bench: '☕', shelter: '🐾', zoo: '🦁', aquarium_center: '🐬', pet_themepark: '🎡', cat_cafe: '🐱', pet_bakery: '🧁', pet_fountain: '⛲', camping_zone: '⛺' };
  const V = []; let vSeq = 0, vT = 2;
  function visitSpot(o) { // [tile to walk to, goes inside?]
    const d = D[o.k], f = fpOf(o.k, o.r);
    if (o.k === 'zoo') {
      // User Request 10: Real villagers walk in and stroll across all zoo habitat viewing walkways!
      const spots = [
        [5, 9],    // Savanna viewing fence (lions, giraffes, zebras)
        [5, 15],   // Panda Bamboo Forest & Jungle fence
        [13, 11],  // Central Safari Oasis plaza fountain
        [19, 7],   // Safari Elephant & Rhino viewing deck
        [19, 14],  // Bear Kopje & Siberian Tiger overlook
        [13, 16],  // Lagoon & Glacier Penguin pool walkway
        [12, 19]   // Grand Safari entrance pavilion
      ];
      const [u, v] = spots[Math.floor(Math.random() * spots.length)];
      return [{ x: o.x + u, y: o.y + v }, false];
    }
    if (o.k === 'pet_themepark') {
      return [{ x: o.x + 1 + Math.floor(Math.random() * (d.w - 2)), y: o.y + 1 + Math.floor(Math.random() * (d.d - 2)) }, false];
    }
    if (d.cat === 'civic' && !d.open) return [rotPt(o, Math.floor(d.w / 2), d.d - 1, d.w, d.d), true];
    if (o.k === 'gate') return [rotPt(o, Math.floor(d.w / 2), 0, d.w, d.d), false];
    if (d.cat === 'civic') return [rotPt(o, Math.floor(d.w / 2), d.d, d.w, d.d), false];
    return [{ x: o.x + Math.floor(f.w / 2), y: o.y + f.d }, false];
  }
  function villagerStep(dt, actors, mkActor, alive, goTo) {
    if (typeof S === 'undefined' || !S || !S.town || !S.clock) return;
    const m = S.clock.m, want = m < 7 * 60 || m >= 22 * 60 ? 0 : Math.min(14, Math.floor(pop(S) / 3));
    vT -= dt;
    if (V.length < want && vT <= 0) {
      vT = 2 + Math.random() * 4;
      const home = pickHome(S), dests = S.town.objs.filter(o => VISIT[o.k]);
      if (home && dests.length) {
        const dst = dests[Math.floor(Math.random() * dests.length)], [spot, inside] = visitSpot(dst), hd = doorOf(home), id = 'vil' + (++vSeq);
        const a = mkActor(id, 'vil', hd.x + .5, hd.y + .5, { look: ART.randomHuman(vSeq * 7919 + home.id), speed: 1.2 + Math.random() * .5, baseSpeed: 1.4, home: home.id, st: 'go', age: 0, emo: VISIT[dst.k], inside, dstK: dst.k });
        // Strolling with pets!
        if (dst.k === 'dogpark' || dst.k === 'zoo' || dst.k === 'pet_themepark' || dst.k === 'cat_cafe' || Math.random() < .42) {
          a.pet = ['shiba', 'corgi', 'pomeranian', 'kitten', 'bichon', 'maltese', 'ragdoll'][vSeq % 7];
        }
        goTo(a, spot.x, spot.y, () => {
          a.st = 'in'; a.tt = (dst.k === 'zoo' ? 9 : 5) + Math.random() * 8; a.hidden = a.inside; if (!a.inside) a.emoT = 7;
          // 동물원 관람 및 먹이주기 효과
          if (dst.k === 'zoo') {
            S.coins += 50;
            S.zoo = S.zoo || { visitors: 0, coins: 0, fed: {} };
            S.zoo.visitors = (S.zoo.visitors || 0) + 1;
            S.zoo.coins = (S.zoo.coins || 0) + 50;
            a.emo = ['🥩', '🌿', '🍎', '🐟', '🎋', '💕', '✨'][Math.floor(Math.random() * 7)];
            a.mood = 'happy';
            if (S.town) S.town.hap = Math.min(100, (S.town.hap || 75) + 0.15);
          }
        });
        V.push(id);
      }
    }
    // 유기동물 보관소 전담 직원의 자동 케어 (밥주기, 놀아주기, 청소하기 자동 유지)
    if (S.shelter && S.shelter.pets && S.shelter.pets.length > 0) {
      for (const p of S.shelter.pets) {
        p.hunger = 100;
        p.clean = 100;
        p.happy = 100;
        p.stress = 0;
        p.bored = 0;
      }
    }
    for (let i = V.length - 1; i >= 0; i--) {
      const id = V[i], a = actors.get(id); if (!a) { V.splice(i, 1); continue; }
      alive.add(id); a.age += dt; if (a.emoT > 0) a.emoT -= dt;
      if (a.st === 'in') {
        a.tt -= dt;
        if (a.tt <= 0) {
          // 유기동물 보관소 방문 시 하루 2~3회 주민 입양 발생 (직원이 손님에게 추천 및 판매/입양)
          if (a.dstK === 'shelter' && S.shelter && S.shelter.pets && S.shelter.pets.length > 0) {
            S.shelter.day = S.shelter.day || (S.clock ? S.clock.day : 1);
            if (S.shelter.day !== (S.clock ? S.clock.day : 1)) { S.shelter.day = S.clock.day; S.shelter.adoptionsToday = 0; }
            if ((S.shelter.adoptionsToday || 0) < 3 && Math.random() < .6) {
              const petIdx = Math.floor(Math.random() * S.shelter.pets.length);
              const adopted = S.shelter.pets.splice(petIdx, 1)[0];
              if (adopted) {
                S.shelter.adoptionsToday = (S.shelter.adoptionsToday || 0) + 1;
                S.shelter.totalAdopted = (S.shelter.totalAdopted || 0) + 1;
                const fee = 600 + Math.floor(Math.random() * 400);
                S.coins += fee;
                a.pet = adopted.sp;
                if (typeof toast === 'function') {
                  const rawStaff = (S.shelter.staff && S.shelter.staff.name) || '미소';
                  const staffName = rawStaff === '미소' ? t('shelterStaffDefaultName') : rawStaff;
                  const spN = typeof spName === 'function' ? spName(adopted.sp) : adopted.sp;
                  const pName = t('stray_' + adopted.sp) && ['길강아지', '길고양이', '길토끼', '길쥐', '길동물'].includes(adopted.name) ? t('stray_' + adopted.sp) : adopted.name;
                  toast(t('shelterVillagerAdoptToast', { staff: staffName, name: pName, sp: spN, fee }));
                }
              }
            }
          }
          a.hidden = false; a.st = 'back'; a.emoT = 5;
          const h = S.town.objs.find(o => o.id === a.home), hd = h ? doorOf(h) : { x: a.x, y: a.y };
          goTo(a, hd.x, hd.y, () => { a.st = 'done'; });
        }
      }
      if (a.st === 'done' || a.age > 150 || (want === 0 && a.st !== 'back' && a.age > 20)) { actors.delete(id); V.splice(i, 1); }
    }
    // 길가에 돌아다니는 길동물 (길강아지, 길토끼, 길쥐, 길고양이) 시뮬레이션
    strayStep(dt, actors, mkActor, alive, goTo);
  }
  // 길거리 유기동물 (길강아지, 길토끼, 길쥐, 길고양이)
  const STRAY_SP = [
    { sp: 'shiba', k: 'stray_shiba', name: '길강아지', icon: '🐕' },
    { sp: 'kitten', k: 'stray_kitten', name: '길고양이', icon: '🐈' },
    { sp: 'rabbit_white', k: 'stray_rabbit_white', name: '길토끼', icon: '🐇' },
    { sp: 'hamster', k: 'stray_hamster', name: '길쥐', icon: '🐹' }
  ];
  const ST = []; let stSeq = 0, stT = 1;
  function strayStep(dt, actors, mkActor, alive, goTo) {
    if (typeof S === 'undefined' || !S || !S.town) return;
    const W = Wd(S), H = Hd(S);
    // User Request 4: 동물원 입장료 수금은 자동으로 진행
    if (S.zoo && (S.zoo.coins || 0) > 0) {
      S.coins += S.zoo.coins;
      S.zoo.coins = 0;
    }
    // User Request 1: 길뿐만 아니라 집/건물/상점 안만 아니면 마을 어디든 잔디/마당/공원 등 야외 전역 탐색
    const isValidStraySpot = (x, y) => {
      // 1. 마을 전체 야외 범위 제한 (-14 .. 36, -10 .. 34)
      if (x < -14 || x > 36 || y < -10 || y > 34) return false;
      // 2. 가게 내부 및 유리벽/외벽 주변 절대 금지 (상점 침입 방지)
      if (x >= -2 && x <= W + 2 && y >= -2 && y <= H + 2) return false;
      // 3. 공공 대형 시설 및 호수/기념비 등 내부 금지
      if (inBig(x, y)) return false;
      if (S.cafe && S.cafe.built && typeof CAFE_POS === 'function') {
        const cp = CAFE_POS(S); if (x >= cp.x - 1 && x <= cp.x + cp.w && y >= cp.y - 1 && y <= cp.y + cp.d) return false;
      }
      if (S.hosp && S.hosp.built && typeof HOSP_POS === 'function') {
        const hp = HOSP_POS(S); if (x >= hp.x - 1 && x <= hp.x + hp.w && y >= hp.y - 1 && y <= hp.y + hp.d) return false;
      }
      // 4. 주민 가옥 및 배치된 건물/시설 부지 내부 금지
      for (const o of (S.town && S.town.objs) || []) {
        const g = fpOf(o.k, o.r);
        if (x >= o.x && x < o.x + g.w && y >= o.y && y < o.y + g.d) return false;
      }
      return true;
    };
    const validSpots = [];
    for (let sx = -10; sx <= 32; sx += 2) {
      for (let sy = -6; sy <= 28; sy += 2) {
        if (isValidStraySpot(sx, sy)) validSpots.push([sx, sy]);
      }
    }
    if (!validSpots.length) return;
    stT -= dt;
    if (ST.length < 4 && stT <= 0) {
      stT = 3 + Math.random() * 5;
      const [rx, ry] = validSpots[Math.floor(Math.random() * validSpots.length)];
      const def = STRAY_SP[Math.floor(Math.random() * STRAY_SP.length)];
      const id = 'stray_' + (++stSeq);
      mkActor(id, 'stray', rx + .5, ry + .5, {
        strayInfo: def,
        sp: def.sp,
        speed: .85 + Math.random() * .35,
        baseSpeed: .9,
        age: 0,
        pauseT: 1
      });
      ST.push(id);
    }
    for (let i = ST.length - 1; i >= 0; i--) {
      const id = ST[i], a = actors.get(id);
      if (!a) { ST.splice(i, 1); continue; }
      alive.add(id); a.age += dt;
      const cx = Math.floor(a.x), cy = Math.floor(a.y);
      // 만약 상점 내부나 건물 안으로 벗어났다면 유효한 야외 타일로 안전하게 재배치
      if (!isValidStraySpot(cx, cy)) {
        const [rx, ry] = validSpots[Math.floor(Math.random() * validSpots.length)];
        a.x = rx + .5; a.y = ry + .5; a.path = []; a.fx = null; a.fy = null; a.moving = false;
      }
      if (!a.moving && (!a.path || !a.path.length)) {
        a.pauseT = (a.pauseT || 0) - dt;
        if (a.pauseT <= 0) {
          a.pauseT = 1.6 + Math.random() * 3.2;
          // 인접한 야외 타일(풀밭, 잔디, 길, 광장)로 자연스럽게 산책 이동
          const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]]
            .filter(([nx, ny]) => isValidStraySpot(nx, ny));
          if (neighbors.length) {
            const next = neighbors[Math.floor(Math.random() * neighbors.length)];
            a.path = [{ x: next[0] + .5, y: next[1] + .5 }];
          }
        }
      }
      // 보호소가 지어져 있고 보호소에 자리가 있으면 길거리 유기동물도 자동 구조
      const hasShelter = has(S, 'shelter') > 0;
      const hasRescueStaff = Object.keys(S.staff || {}).some(k => ['care', 'porter'].includes(staffRoleOf(k)));
      if (a.age > 12 && hasShelter && hasRescueStaff) {
        S.shelter = S.shelter || { pets: [], seq: 1, staff: { name: '미소', lv: 1 }, adoptionsToday: 0, totalAdopted: 0 };
        S.shelter.pets = S.shelter.pets || [];
        if (S.shelter.pets.length < 12 && Math.random() < dt * 0.08) {
          const def = a.strayInfo || { sp: a.sp || 'shiba', k: 'stray_default', name: '길동물', icon: '🐾' };
          const sname = def.k ? t(def.k) : def.name;
          const np = (typeof G !== 'undefined' && G.mkPetPublic) ? G.mkPetPublic(S, def.sp) : {
            id: 'sh_' + Date.now() + '_' + Math.floor(Math.random() * 999),
            sp: def.sp,
            name: sname,
            coat: Math.floor(Math.random() * 999) + 1,
            sex: Math.random() < .5 ? 'm' : 'f',
            trait: 'calm',
            lv: 1, exp: 0, stars: 0
          };
          np.grow = 1; np.rescued = true;
          np.hunger = 35; np.clean = 30; np.stress = 55; np.bored = 45; np.happy = 50;
          S.shelter.pets.push(np);
          if (S.book) S.book[def.sp] = 1;
          if (typeof toast === 'function') {
            const rawStaff = (S.shelter.staff && S.shelter.staff.name) || '미소';
            const staffName = rawStaff === '미소' ? t('shelterStaffDefaultName') : rawStaff;
            toast(t('shelterAutoRescueToast', { staff: staffName, icon: def.icon, name: np.name, sp: sname }));
          }
          actors.delete(id); ST.splice(i, 1); continue;
        }
      }
      if (a.age > 180) { actors.delete(id); ST.splice(i, 1); }
    }
  }
  // ---------------- fishing at the lake ----------------
  const FISH = [
    { id: 'crucian', icon: '🐟', w: 44, c: [40, 90] }, { id: 'carp', icon: '🐠', w: 22, c: [120, 220] }, { id: 'catfish', icon: '🐡', w: 9, c: [260, 420] },
    { id: 'boot', icon: '👢', w: 12, c: [5, 5] }, { id: 'chest', icon: '🧰', w: 3, c: [600, 1500] }, { id: 'axolotl', icon: '🦎', w: 1, c: [0, 0] }, { id: 'shell', icon: '🐚', w: 9, c: [30, 60] } ];
  const FISH_MAX = 12;
  function apply(s, a, by) {
    { const r = applyTown(s, a, by); if (r !== undefined) return r; }
    if (a.t === 'follow') { s.follow = s.follow || {}; if (a.pid) s.follow[a.who] = a.pid; else delete s.follow[a.who]; return { ok: 1 }; }
    if (a.t === 'fishcast') {
      if (!(s.village && s.village.lake)) return { err: 'gone' };
      const day = s.clock ? s.clock.day : 1, f = s.fish = s.fish || { day, n: 0, log: {} }; if (f.day !== day) { f.day = day; f.n = 0; }
      if (f.n >= FISH_MAX) return { err: 'fishTired' };
      f.n++; if (!a.hit) return { ok: 1, fish: null, left: FISH_MAX - f.n };
      const tot = FISH.reduce((q, x) => q + x.w, 0); let r = Math.random() * tot, k = FISH[0]; for (const x of FISH) { r -= x.w; if (r <= 0) { k = x; break; } }
      let coins = k.c[0] + Math.floor(Math.random() * (k.c[1] - k.c[0] + 1)), pet = false;
      if (k.id === 'axolotl') { const h = s.home; if (h && (h.items || []).some(it => it.k === 'aquarium') && (h.pets || []).length < HOME_LV[h.lv].pets) { const np = G.mkPetPublic(s, 'axolotl'); np.grow = 1; h.pets.push(np); pet = true; } else coins = 1500; } // lives in the home aquarium; no room -> a finder's reward
      if (k.id === 'chest' && s.x) s.x.tickets = (s.x.tickets || 0) + 1;
      s.coins += coins; f.log[k.id] = (f.log[k.id] || 0) + 1;
      return { ok: 1, fish: k.id, icon: k.icon, coins, pet, left: FISH_MAX - f.n };
    }
    return undefined;
  }
  return { houses, drawHouse, houseSolid, followStep, drawFollower, apply, FISH, FISH_MAX,
    roadSet, roadNearShop, roadLine, drawRoadTool, ROAD_COST, ROAD_TYPES, pathRects, maxR, rotPt, ground, collect, zonesOf, laneOf, zoneAt, zoneCost, zoneLots, villagerStep, lvOf, capOf, upNeed, upCost, canUp, LV_MAX, pow, has, inBig, bigBuilt, ensure, stats, tick, custK, maxAdd, spendK, bestPop, mood, pickHome, doorOf, canPlace, fpOf, kindCost, unlockedK, drawObj, depthOf, drawGhost, stageOf, pop, cap, countOf, occFrac, nearFree, fitShop, clearBuildingOverlaps,
    objs: () => (typeof S !== 'undefined' && S && S.town && S.town.objs) || [] };
})();
Object.assign(I18N.ko, {
  followBtn: '🐾 데리고 다니기', followStop: '🏠 집에 두기', followOn: '{n}와(과) 함께 산책해요 🐾', followOff: '{n}을(를) 집에 두었어요', followNoAqua: '물에 사는 아이는 데리고 다닐 수 없어요',
  fishTitle: '🎣 호수 낚시', fishDesc: '찌가 흔들리다 ❗가 뜨면 바로 당기세요! (오늘 {n}번 남음)', fishCast: '🎣 던지기', fishPull: '❗ 당기기!', fishWait: '기다리는 중… 🌊', fishEarly: '너무 빨리 당겼어요… 🐟💨', fishLate: '놓쳤어요! 조금 더 빨리 💨', fishTired: '오늘은 낚시를 많이 했어요. 내일 또 해요 😴',
  fishGot: '{i} {n}을(를) 잡았어요! 🪙{c}', fishGotPet: '🦎 액솔로틀을 잡았어요! 집 수족관에 넣어줬어요 ✨', fishNeedLake: '호수를 지으면 낚시할 수 있어요 🦢', fishDock: '🎣 낚시하기',
  fish_crucian: '붕어', fish_carp: '잉어', fish_catfish: '메기', fish_boot: '낡은 장화', fish_chest: '보물상자', fish_axolotl: '액솔로틀', fish_shell: '조개'
});
Object.assign(I18N.ru, {
  followBtn: '🐾 Взять с собой', followStop: '🏠 Оставить дома', followOn: 'Гуляем вместе с {n} 🐾', followOff: '{n} остался дома', followNoAqua: 'Водных питомцев нельзя взять с собой',
  fishTitle: '🎣 Рыбалка на озере', fishDesc: 'Когда появится ❗ — тяни! (сегодня осталось {n})', fishCast: '🎣 Забросить', fishPull: '❗ Тянуть!', fishWait: 'Ждём… 🌊', fishEarly: 'Слишком рано… 🐟💨', fishLate: 'Упустили! Чуть быстрее 💨', fishTired: 'На сегодня хватит рыбалки 😴',
  fishGot: 'Поймали: {i} {n}! 🪙{c}', fishGotPet: '🦎 Поймали аксолотля! Он в домашнем аквариуме ✨', fishNeedLake: 'Постройте озеро, чтобы рыбачить 🦢', fishDock: '🎣 Рыбачить',
  fish_crucian: 'Карась', fish_carp: 'Карп', fish_catfish: 'Сом', fish_boot: 'Старый сапог', fish_chest: 'Сундук', fish_axolotl: 'Аксолотль', fish_shell: 'Ракушка'
});
