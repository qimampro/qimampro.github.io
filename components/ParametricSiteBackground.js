/* ParametricSiteBackground: data-driven decorative backgrounds for the 15 site cards (QIMAM). Pure SVG + CSS, no dependencies. */
(function () {
  if (window.ParametricSiteBackground) return;
  var NS = 'http://www.w3.org/2000/svg', W = 400, H = 140;
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)');
  function reduced() { return !!(RM && RM.matches); }
  function seed(n) { return function () { n = (n * 9301 + 49297) % 233280; return n / 233280; }; }
  function p(d, c, w, o, cls, extra) { return '<path d="' + d + '" stroke="' + c + '" stroke-width="' + (w || 1) + '" fill="none" opacity="' + (o == null ? 1 : o) + '"' + (cls ? ' class="' + cls + '"' : '') + (extra || '') + '/>'; }
  function c(x, y, r, fill, o, cls, stroke) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" ' + (stroke ? 'stroke="' + stroke + '" fill="none"' : 'fill="' + fill + '"') + ' opacity="' + (o == null ? 1 : o) + '"' + (cls ? ' class="' + cls + '"' : '') + '/>'; }
  function mover(path, r, fill, dur, begin) { return '<circle r="' + r + '" fill="' + fill + '"><animateMotion dur="' + dur + 's" begin="' + (begin || 0) + 's" repeatCount="indefinite" path="' + path + '"/></circle>'; }

  /* Icons: tiny inline strokes (24x24 grid) */
  var ICON = {
    arch: 'M5 21V11a7 7 0 0 1 14 0v10M9 21v-6a3 3 0 0 1 6 0v6M3 21h18',
    scale: 'M12 3v18M7 21h10M5 7h14M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0z',
    compass: 'M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20zM15.5 8.5l-2 5l-5 2l2-5z',
    cpu: 'M7 7h10v10H7zM10 10h4v4h-4zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4',
    facade: 'M4 21V5l8-3l8 3v16M8 21v-4h8v4M8 8h3v4H8zM13 8h3v4h-3z',
    towers: 'M3 21h18M5 21V9l5-3v15M14 21V3l5 3v15M8 11v1M8 15v1M17 9v1M17 13v1M17 17v1',
    weave: 'M12 2l5 5l-5 5l-5-5zM12 12l5 5l-5 5l-5-5zM2 12l5-5M22 12l-5-5M2 12l5 5M22 12l-5 5',
    sun: 'M12 7a5 5 0 1 0 0 10a5 5 0 1 0 0-10zM12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1',
    route: 'M6 19a2 2 0 1 0 0-4a2 2 0 1 0 0 4zM18 9a2 2 0 1 0 0-4a2 2 0 1 0 0 4zM8 17h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7',
    needle: 'M20 4L7 17M17 3l4 4M5 19l-2 2M7 17c-3 2-4 5-1 5s4-6 9-6s6 3 6 3',
    sprout: 'M12 21v-9M12 12c0-4 3-7 8-7c0 5-3 8-8 7zM12 15c0-3-2-6-7-6c0 4 3 7 7 6z',
    book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M9 7h6M9 10h4',
    cup: 'M4 9h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6zM17 11h2a2 2 0 0 1 0 4h-2M8 2c-1 2 1 3 0 5M12 2c-1 2 1 3 0 5',
    bolt: 'M13 2L4 14h7l-1 8l9-12h-7z',
    pulse: 'M12 21l-8-8a5 5 0 0 1 8-6a5 5 0 0 1 8 6zM3 12h4l2-3l3 6l2-3h7'
  };

  /* Data-driven configuration: one entry per site card (keys match SITES[].key) */
  var CONFIG = {
    sufrah:      { type: 'hijazi-arches',   icon: 'arch',    colors: ['#D4A24C', '#8A5230', '#B5532F'], pattern: 'mashrabiya lattice + arches', motion: 'draw + drift', glow: 0.16, speed: 1,   pointer: 'parallax' },
    ghamdi:      { type: 'legal-columns',   icon: 'scale',   colors: ['#C9A24D', '#8E8E8E', '#3A3A3A'], pattern: 'vertical rhythm + fine grid', motion: 'arc flow + swing', glow: 0.12, speed: 0.8, pointer: 'parallax' },
    masar:       { type: 'journey-path',    icon: 'compass', colors: ['#2E8B62', '#C9A24D', '#123B2B'], pattern: 'waypoints + concentric arcs', motion: 'travel', glow: 0.14, speed: 0.9, pointer: 'parallax' },
    tuwaiq:      { type: 'neural-network',  icon: 'cpu',     colors: ['#22D3EE', '#3B82F6', '#8B5CF6'], pattern: 'nodes + circuit lines', motion: 'signal pulses', glow: 0.2, speed: 1.3, pointer: 'parallax' },
    rawasheen:   { type: 'facade-perspective', icon: 'facade', colors: ['#D8C3A0', '#F1E8D6', '#8A6142'], pattern: 'perspective grid + rawashin', motion: 'draw', glow: 0.14, speed: 0.9, pointer: 'parallax' },
    rakayez:     { type: 'blueprint-growth', icon: 'towers', colors: ['#5B7FB0', '#C9A24D', '#D8C3A0'], pattern: 'blueprint grid + massing', motion: 'rising curve', glow: 0.14, speed: 1, pointer: 'parallax' },
    sadu:        { type: 'sadu-weave',      icon: 'weave',   colors: ['#C2492E', '#E0782F', '#C9A24D'], pattern: 'woven bands + diamonds', motion: 'weave slide', glow: 0.16, speed: 1, pointer: 'parallax' },
    sudair:      { type: 'solar-field',     icon: 'sun',     colors: ['#F2B93B', '#1F7A4D', '#22D3EE'], pattern: 'solar arcs + panel grid', motion: 'energy flow', glow: 0.18, speed: 1, pointer: 'parallax' },
    zubaida:     { type: 'dune-route',      icon: 'route',   colors: ['#D8B98A', '#C9A24D', '#2BB3A8'], pattern: 'dunes + stations', motion: 'travel', glow: 0.14, speed: 0.9, pointer: 'parallax' },
    asala:       { type: 'editorial-fabric', icon: 'needle', colors: ['#E8D5B0', '#8C2236', '#C9A24D'], pattern: 'drape curves + measure', motion: 'flow', glow: 0.14, speed: 0.8, pointer: 'parallax' },
    suqya:       { type: 'community-growth', icon: 'sprout', colors: ['#3BAA6B', '#C9A24D', '#EFE8D8'], pattern: 'linked circles + leaves', motion: 'grow + breathe', glow: 0.14, speed: 0.9, pointer: 'parallax' },
    turath:      { type: 'arabesque',       icon: 'book',    colors: ['#C9A24D', '#2C4A86', '#E6D3A3'], pattern: '8-point star lattice', motion: 'slow rotate', glow: 0.16, speed: 0.6, pointer: 'parallax' },
    rowad:       { type: 'coffee-steam',    icon: 'cup',     colors: ['#C68B4E', '#E8D2B0', '#6B4128'], pattern: 'steam curves + beans', motion: 'rise', glow: 0.16, speed: 0.9, pointer: 'parallax' },
    hail:        { type: 'power-pulse',     icon: 'bolt',    colors: ['#FF6A1A', '#B3261E', '#8A8A8A'], pattern: 'hex grid + diagonals', motion: 'pulse', glow: 0.18, speed: 1.4, pointer: 'parallax' },
    saudihealth: { type: 'medical-ecg',     icon: 'pulse',   colors: ['#22D3EE', '#2ECC9A', '#EAF6FF'], pattern: 'ecg + linked circles', motion: 'ecg trace', glow: 0.14, speed: 1, pointer: 'parallax' }
  };

  /* Pattern generators: return { l1: back layer, l2: front layer } SVG strings */
  var GEN = {
    'hijazi-arches': function (k) {
      var a = k[0], b = k[1], r = k[2], l1 = '', l2 = '', i, j;
      for (i = 0; i < 9; i++) for (j = 0; j < 5; j++) { var x = 8 + i * 16, y = 6 + j * 16; l1 += p('M' + x + ' ' + (y + 8) + 'l8-8l8 8l-8 8z', b, .8, .55); }
      for (i = 0; i < 6; i++) { var X = 170 + i * 40; l2 += p('M' + X + ' 140V92Q' + X + ' 62 ' + (X + 18) + ' 58Q' + (X + 36) + ' 62 ' + (X + 36) + ' 92V140', i % 2 ? r : a, 1.1, .8, 'a-draw', ' style="animation-delay:' + (i * .35) + 's"'); }
      l2 += p('M0 120C80 96 140 132 220 110S360 92 400 106', a, .8, .5, 'a-flow');
      return { l1: '<g opacity=".5">' + l1 + '</g>', l2: l2 };
    },
    'legal-columns': function (k) {
      var a = k[0], g = k[1], l1 = '', l2 = '', i;
      for (i = 0; i <= 40; i++) l1 += p('M' + (i * 10) + ' 0V140', g, .4, .18);
      for (i = 0; i <= 14; i++) l1 += p('M0 ' + (i * 10) + 'H400', g, .4, .12);
      for (i = 0; i < 7; i++) l2 += p('M' + (150 + i * 34) + ' 140V40', i % 3 ? g : a, i % 3 ? .8 : 1.2, .6);
      l2 += p('M120 140A130 130 0 0 1 380 140', a, 1, .7, 'a-flow') + p('M150 140A100 100 0 0 1 350 140', g, .8, .5, 'a-flow rev');
      l2 += '<g class="a-swing" style="transform-origin:72px 46px">' + p('M72 30V96M48 96H96M40 46H104M40 46l-12 26h24zM104 46l-12 26h24z', a, 1.1, .55) + '</g>';
      return { l1: l1, l2: l2 };
    },
    'journey-path': function (k) {
      var g = k[0], a = k[1], l1 = '', l2 = '', i, path = 'M10 118C70 118 80 60 150 66S240 112 300 84S370 30 395 34';
      for (i = 1; i < 7; i++) l1 += c(320, 110, i * 22, 0, .35 - i * .04, '', g);
      l2 += p(path, a, 1.2, .8, 'a-dots');
      [[10, 118], [150, 66], [300, 84], [395, 34]].forEach(function (q, n) { l2 += c(q[0], q[1], 4, a, .9, 'a-pulse', null) + c(q[0], q[1], 9, 0, .5, 'a-ring', a); });
      l2 += '<g class="a-spin" style="transform-origin:60px 40px">' + c(60, 40, 22, 0, .5, '', g) + p('M60 14V66M34 40H86M60 24l5 16l-5 16l-5-16z', a, .9, .7) + '</g>';
      l2 += mover(path, 2.6, '#fff', 9);
      return { l1: l1, l2: l2 };
    },
    'neural-network': function (k) {
      var A = k[0], B = k[1], C = k[2], R = seed(7), pts = [], l1 = '', l2 = '', i, j;
      for (i = 0; i < 22; i++) pts.push([R() * 400, 8 + R() * 124]);
      for (i = 0; i < pts.length; i++) for (j = i + 1; j < pts.length; j++) { var dx = pts[i][0] - pts[j][0], dy = pts[i][1] - pts[j][1]; if (dx * dx + dy * dy < 5200) l1 += p('M' + pts[i][0].toFixed(1) + ' ' + pts[i][1].toFixed(1) + 'L' + pts[j][0].toFixed(1) + ' ' + pts[j][1].toFixed(1), B, .7, .45); }
      pts.forEach(function (q, n) { l2 += c(q[0].toFixed(1), q[1].toFixed(1), n % 4 ? 1.8 : 3, n % 3 ? A : C, .9, n % 4 ? '' : 'a-pulse'); });
      var cir = ['M0 30H90V70H180', 'M400 110H300V60H230', 'M0 100H60V128H140'];
      cir.forEach(function (d, n) { l2 += p(d, A, 1, .55) + p(d, '#fff', 1.4, .9, 'a-signal', ' style="animation-delay:' + (n * .9) + 's"'); });
      return { l1: l1, l2: l2 };
    },
    'facade-perspective': function (k) {
      var s = k[0], iv = k[1], b = k[2], l1 = '', l2 = '', i;
      for (i = -10; i <= 20; i++) l1 += p('M' + (200 + i * 4) + ' 40L' + (i * 30 - 100) + ' 140', s, .5, .25);
      for (i = 0; i < 6; i++) l1 += p('M0 ' + (60 + i * i * 3) + 'H400', s, .4, .2);
      l2 += p('M230 140V30H380V140M250 140V70Q250 50 270 50Q290 50 290 70V140', iv, 1, .6, 'a-draw');
      for (i = 0; i < 3; i++) { var y = 46 + i * 30; l2 += p('M310 ' + y + 'h50v20h-50zM318 ' + y + 'v20M326 ' + y + 'v20M334 ' + y + 'v20M342 ' + y + 'v20M350 ' + y + 'v20', b, .8, .7, 'a-draw', ' style="animation-delay:' + (.4 + i * .3) + 's"'); }
      return { l1: l1, l2: l2 };
    },
    'blueprint-growth': function (k) {
      var n = k[0], a = k[1], s = k[2], l1 = '', l2 = '', i;
      for (i = 0; i <= 40; i++) l1 += p('M' + (i * 10) + ' 0V140', n, .4, i % 5 ? .14 : .3);
      for (i = 0; i <= 14; i++) l1 += p('M0 ' + (i * 10) + 'H400', n, .4, i % 5 ? .14 : .3);
      [[200, 80, 30], [236, 52, 26], [268, 30, 34], [308, 64, 24], [338, 44, 30]].forEach(function (q, m) { l2 += p('M' + q[0] + ' 140V' + q[1] + 'H' + (q[0] + q[2]) + 'V140', m % 2 ? s : n, 1, .7, 'a-draw', ' style="animation-delay:' + (m * .25) + 's"'); });
      for (i = 0; i < 4; i++) l2 += p('M0 ' + (128 - i * 10) + 'H' + (120 + i * 40), a, .6, .4);
      l2 += p('M20 126C90 120 120 96 170 84S260 40 390 14', a, 1.4, .9, 'a-flow') + c(390, 14, 3, a, 1, 'a-pulse');
      return { l1: l1, l2: l2 };
    },
    'sadu-weave': function (k) {
      var r = k[0], o = k[1], g = k[2], band = '', i, l2 = '';
      for (i = 0; i < 30; i++) { var x = i * 28; band += p('M' + x + ' 40l14-14l14 14l-14 14z', i % 2 ? r : g, 1, .8) + p('M' + x + ' 92l14-10l14 10l-14 10z', o, .9, .7); }
      band += p('M0 64' + Array.apply(null, Array(30)).map(function (_, n) { return 'l7 -7l7 7'; }).join(''), g, .8, .6) + p('M0 70' + Array.apply(null, Array(30)).map(function () { return 'l7 7l7 -7'; }).join(''), r, .8, .6);
      for (i = 0; i < 5; i++) l2 += p('M0 ' + (112 + i * 6) + 'C100 ' + (104 + i * 6) + ' 140 ' + (122 + i * 6) + ' 220 ' + (112 + i * 6) + 'S340 ' + (104 + i * 6) + ' 400 ' + (114 + i * 6), i % 2 ? o : r, .7, .45);
      return { l1: '<g class="a-slide">' + band + '</g>', l2: l2 };
    },
    'solar-field': function (k) {
      var y = k[0], g = k[1], cy = k[2], l1 = '', l2 = '', i, j;
      for (i = 1; i < 7; i++) l1 += p('M' + (380 - i * 26) + ' 140A' + (i * 26) + ' ' + (i * 26) + ' 0 0 1 ' + (380 + i * 26) + ' 140', y, .8, .5 - i * .05, i % 2 ? 'a-flow' : '');
      for (i = 0; i < 7; i++) for (j = 0; j < 3; j++) { var x = 30 + i * 30 + j * 10, Y = 84 + j * 18; l2 += p('M' + x + ' ' + Y + 'h24l-6 14h-24z', g, .9, .7); }
      l2 += p('M0 60C80 54 160 70 250 50S360 40 400 44', cy, 1, .55, 'a-flow');
      for (i = 0; i < 6; i++) l2 += c(60 + i * 60, 30 + (i % 3) * 12, 1.6, y, .9, 'a-float', null).replace('/>', ' style="animation-delay:' + (i * .7) + 's"/>');
      l2 += c(380, 140, 14, y, .9) ;
      return { l1: l1, l2: l2 };
    },
    'dune-route': function (k) {
      var s = k[0], g = k[1], t = k[2], l1 = '', l2 = '', i, path = 'M8 120C70 110 90 70 160 80S260 120 310 76S370 40 396 30';
      for (i = 0; i < 6; i++) l1 += p('M0 ' + (100 + i * 8) + 'C80 ' + (80 + i * 8) + ' 140 ' + (120 + i * 8) + ' 220 ' + (98 + i * 8) + 'S340 ' + (84 + i * 8) + ' 400 ' + (100 + i * 8), s, .8, .5 - i * .06);
      l2 += p(path, g, 1.2, .9, 'a-dots');
      [[8, 120], [160, 80], [310, 76], [396, 30]].forEach(function (q) { l2 += c(q[0], q[1], 3.5, t, 1, 'a-pulse') + c(q[0], q[1], 8, 0, .5, 'a-ring', t); });
      l2 += '<g class="a-spin" style="transform-origin:70px 34px">' + c(70, 34, 18, 0, .55, '', s) + p('M70 12V56M48 34H92M70 20l4 14l-4 14l-4-14z', g, .9, .8) + '</g>' + mover(path, 2.4, '#fff', 10);
      return { l1: l1, l2: l2 };
    },
    'editorial-fabric': function (k) {
      var ch = k[0], bu = k[1], g = k[2], l1 = '', l2 = '', i;
      for (i = 0; i < 9; i++) l1 += p('M' + (-40 + i * 14) + ' 140C' + (60 + i * 10) + ' ' + (60 - i * 4) + ' ' + (180 + i * 6) + ' ' + (150 - i * 6) + ' ' + (420) + ' ' + (20 + i * 10), i % 3 ? ch : bu, .7, .4, 'a-wave', ' style="animation-delay:' + (i * .3) + 's"');
      l2 += p('M150 24H392', g, .8, .7);
      for (i = 0; i <= 24; i++) l2 += p('M' + (150 + i * 10) + ' 24v' + (i % 5 ? 4 : 9), g, .7, .7);
      l2 += p('M140 116C220 90 300 130 396 96', ch, 1, .7, 'a-dash');
      l2 += p('M354 50L394 34M390 30l6 6M354 50c-12 8-30 4-38 14', g, 1, .8);
      return { l1: l1, l2: l2 };
    },
    'community-growth': function (k) {
      var gr = k[0], g = k[1], iv = k[2], l1 = '', l2 = '', i, nodes = [[180, 70], [230, 40], [280, 76], [330, 44], [370, 90], [240, 110], [300, 118]];
      nodes.forEach(function (a, m) { nodes.forEach(function (b, n) { if (n > m && Math.hypot(a[0] - b[0], a[1] - b[1]) < 80) l1 += p('M' + a[0] + ' ' + a[1] + 'L' + b[0] + ' ' + b[1], g, .7, .45); }); });
      nodes.forEach(function (a, m) { l2 += c(a[0], a[1], 12 + (m % 3) * 4, 0, .55, 'a-breathe', m % 2 ? gr : iv).replace('/>', ' style="animation-delay:' + (m * .5) + 's"/>') + c(a[0], a[1], 2.4, g, .95); });
      l2 += p('M10 130C60 126 90 100 120 80S150 40 170 28', gr, 1.3, .85, 'a-draw');
      for (i = 0; i < 4; i++) { var x = 40 + i * 30, y = 120 - i * 22; l2 += p('M' + x + ' ' + y + 'c8-12 20-12 22-2c-8 8-16 8-22 2z', gr, .9, .7); }
      return { l1: l1, l2: l2 };
    },
    'arabesque': function (k) {
      var g = k[0], n = k[1], l1 = '', l2 = '', i, j;
      function star(x, y, r) { var s = r * 0.42, d = 'M' + x + ' ' + (y - r) + 'L' + (x + s) + ' ' + (y - s) + 'L' + (x + r) + ' ' + y + 'L' + (x + s) + ' ' + (y + s) + 'L' + x + ' ' + (y + r) + 'L' + (x - s) + ' ' + (y + s) + 'L' + (x - r) + ' ' + y + 'L' + (x - s) + ' ' + (y - s) + 'Z'; var e = 'M' + (x - s * 1.7) + ' ' + (y - s * 1.7) + 'L' + (x + s * 1.7) + ' ' + (y - s * 1.7) + 'L' + (x + s * 1.7) + ' ' + (y + s * 1.7) + 'L' + (x - s * 1.7) + ' ' + (y + s * 1.7) + 'Z'; return d + e; }
      for (i = 0; i < 12; i++) for (j = 0; j < 5; j++) l1 += p(star(i * 36 + (j % 2) * 18, j * 32, 15), j % 2 ? n : g, .6, .4);
      l2 += '<g class="a-spin slow" style="transform-origin:330px 70px">' + p(star(330, 70, 44), g, 1, .75) + c(330, 70, 52, 0, .5, '', g) + '</g>';
      l2 += p('M190 140V90Q190 56 224 50Q258 56 258 90V140', g, 1, .55, 'a-draw');
      return { l1: '<g class="a-drift">' + l1 + '</g>', l2: l2 };
    },
    'coffee-steam': function (k) {
      var ca = k[0], be = k[1], d = k[2], l1 = '', l2 = '', i;
      for (i = 0; i < 5; i++) l1 += p('M0 ' + (96 + i * 9) + 'C90 ' + (84 + i * 9) + ' 150 ' + (110 + i * 9) + ' 240 ' + (96 + i * 9) + 'S360 ' + (86 + i * 9) + ' 400 ' + (98 + i * 9), i % 2 ? ca : d, .8, .5);
      for (i = 0; i < 4; i++) { var x = 250 + i * 34; l2 += p('M' + x + ' 120C' + (x - 14) + ' 96 ' + (x + 14) + ' 80 ' + x + ' 56S' + (x - 12) + ' 24 ' + (x + 4) + ' 8', be, 1, .7, 'a-steam', ' style="animation-delay:' + (i * .8) + 's"'); }
      [[70, 40, -20], [120, 60, 25], [40, 74, 10]].forEach(function (q) { l2 += '<g transform="translate(' + q[0] + ' ' + q[1] + ') rotate(' + q[2] + ')">' + '<ellipse rx="12" ry="8" stroke="' + ca + '" fill="none" opacity=".75"/>' + p('M-10 2C-4 -4 4 4 10 -2', ca, .9, .75) + '</g>'; });
      return { l1: l1, l2: l2 };
    },
    'power-pulse': function (k) {
      var o = k[0], r = k[1], g = k[2], l1 = '', l2 = '', i, j;
      for (i = 0; i < 18; i++) for (j = 0; j < 6; j++) { var x = i * 24 + (j % 2) * 12, y = j * 21; l1 += p('M' + x + ' ' + (y - 8) + 'l7 4v8l-7 4l-7-4v-8z', g, .6, .25); }
      for (i = 0; i < 6; i++) l2 += p('M' + (120 + i * 46) + ' 140L' + (200 + i * 46) + ' 0', i % 2 ? r : o, i % 2 ? 1 : 1.4, .55, 'a-flow', ' style="animation-delay:' + (i * .2) + 's"');
      l2 += p('M0 100H90L104 72L118 124L132 86L142 100H230', o, 1.4, .9, 'a-signal');
      l2 += p('M300 120A60 60 0 0 1 390 60', r, 1, .6, 'a-flow rev');
      return { l1: l1, l2: l2 };
    },
    'medical-ecg': function (k) {
      var cy = k[0], gr = k[1], wh = k[2], l1 = '', l2 = '', i, ecg = 'M0 92H70L80 92L88 76L96 108L108 44L120 124L130 92H200L210 84L218 92H400';
      for (i = 1; i < 5; i++) l1 += p('M' + (300 - i * 30) + ' 140A' + (i * 30) + ' ' + (i * 30) + ' 0 0 1 ' + (300 + i * 30) + ' 140', cy, .8, .35);
      [[250, 40], [300, 26], [350, 46], [330, 90]].forEach(function (a, m, arr) { if (m) l1 += p('M' + arr[m - 1][0] + ' ' + arr[m - 1][1] + 'L' + a[0] + ' ' + a[1], gr, .8, .5); l1 += c(a[0], a[1], 9, 0, .6, '', gr) + c(a[0], a[1], 2.2, wh, .9); });
      l2 += p(ecg, cy, .8, .3) + p(ecg, wh, 1.6, .95, 'a-ecg');
      l2 += p('M372 22l16 6v14c0 10-7 16-16 20c-9-4-16-10-16-20V28z', gr, 1.1, .75);
      return { l1: l1, l2: l2 };
    }
  };

  var CSS = '' +
    '.psb{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;border-radius:inherit}' +
    '.psb svg{position:absolute;inset:0;width:100%;height:100%;display:block}' +
    '.psb .psb-art{-webkit-mask-image:linear-gradient(270deg,rgba(0,0,0,.28),rgba(0,0,0,.4) 38%,#000 78%);mask-image:linear-gradient(270deg,rgba(0,0,0,.28),rgba(0,0,0,.4) 38%,#000 78%)}' +
    '.psb .psb-glow{position:absolute;inset:-20%;background:radial-gradient(60% 70% at 12% 100%,var(--psb-a),transparent 70%),radial-gradient(50% 60% at 95% 0%,var(--psb-b),transparent 70%);opacity:calc(var(--psb-g,.15) * 1.8);animation:psbGlow 6s ease-in-out infinite}' +
    '.psb .l1,.psb .l2{transition:transform .9s cubic-bezier(.2,.7,.2,1),opacity .6s ease;will-change:transform}' +
    '.psb .l1{opacity:.78;transform:translate(calc(var(--px,0)*-6px),calc(var(--py,0)*-4px))}' +
    '.psb .l2{opacity:.92;transform:translate(calc(var(--px,0)*10px),calc(var(--py,0)*6px))}' +
    '.psb-host:hover .psb .l1,.psb-host.psb-touch .psb .l1{opacity:.8}' +
    '.psb-host:hover .psb .l2,.psb-host.psb-touch .psb .l2{opacity:.95}' +
    '.psb ~ *{position:relative;z-index:1}' +
    '.psb-text{position:relative;isolation:isolate}' +
    '.psb-text>div:not(.psb){text-shadow:0 1px 10px rgba(0,0,0,.65)}' +
    '.psb .psb-ic{position:absolute;inset:auto auto 14px 14px;width:26px;height:26px;opacity:.85;animation:psbIc 6s ease-in-out infinite;transition:opacity .5s,transform .7s cubic-bezier(.2,.7,.2,1)}' +
    '.psb-host:hover .psb .psb-ic{opacity:.95;transform:translateY(-2px)}' +
    '.psb-spot{position:absolute;inset:0;pointer-events:none;z-index:2;border-radius:inherit;opacity:0;transition:opacity .45s ease;background:radial-gradient(220px circle at var(--mx,50%) var(--my,50%),var(--psb-s),transparent 62%);mix-blend-mode:screen}' +
    '.psb-host:hover .psb-spot,.psb-host.psb-touch .psb-spot{opacity:1}' +
    '.psb .a-draw{stroke-dasharray:420;stroke-dashoffset:420;animation:psbDraw calc(7s/var(--psb-v,1)) cubic-bezier(.6,0,.3,1) infinite alternate}' +
    '.psb .a-flow{stroke-dasharray:6 10;animation:psbFlow calc(6s/var(--psb-v,1)) linear infinite}' +
    '.psb .a-flow.rev{animation-direction:reverse}' +
    '.psb .a-dots{stroke-dasharray:1 7;stroke-linecap:round;animation:psbFlow calc(5s/var(--psb-v,1)) linear infinite}' +
    '.psb .a-dash{stroke-dasharray:4 6;animation:psbFlow calc(8s/var(--psb-v,1)) linear infinite}' +
    '.psb .a-signal{stroke-dasharray:22 400;animation:psbSig calc(4.2s/var(--psb-v,1)) linear infinite}' +
    '.psb .a-ecg{stroke-dasharray:90 600;animation:psbEcg calc(3.6s/var(--psb-v,1)) linear infinite}' +
    '.psb .a-steam{stroke-dasharray:140;stroke-dashoffset:140;animation:psbSteam calc(5s/var(--psb-v,1)) ease-in-out infinite}' +
    '.psb .a-pulse{transform-box:fill-box;transform-origin:center;animation:psbPulse calc(3s/var(--psb-v,1)) ease-in-out infinite}' +
    '.psb .a-ring{transform-box:fill-box;transform-origin:center;animation:psbRing calc(3s/var(--psb-v,1)) ease-out infinite}' +
    '.psb .a-breathe{transform-box:fill-box;transform-origin:center;animation:psbBreathe calc(5s/var(--psb-v,1)) ease-in-out infinite}' +
    '.psb .a-float{transform-box:fill-box;animation:psbFloat calc(6s/var(--psb-v,1)) ease-in-out infinite}' +
    '.psb .a-spin{animation:psbSpin calc(40s/var(--psb-v,1)) linear infinite}.psb .a-spin.slow{animation-duration:calc(80s/var(--psb-v,1))}' +
    '.psb .a-swing{animation:psbSwing calc(6s/var(--psb-v,1)) ease-in-out infinite}' +
    '.psb .a-slide{animation:psbSlide calc(26s/var(--psb-v,1)) linear infinite}' +
    '.psb .a-drift{animation:psbDrift calc(30s/var(--psb-v,1)) ease-in-out infinite alternate}' +
    '.psb .a-wave{animation:psbWave calc(9s/var(--psb-v,1)) ease-in-out infinite alternate}' +
    '@keyframes psbDraw{0%{stroke-dashoffset:420}60%,100%{stroke-dashoffset:0}}' +
    '@keyframes psbFlow{to{stroke-dashoffset:-160}}' +
    '@keyframes psbSig{from{stroke-dashoffset:22}to{stroke-dashoffset:-400}}' +
    '@keyframes psbEcg{from{stroke-dashoffset:90}to{stroke-dashoffset:-600}}' +
    '@keyframes psbSteam{0%{stroke-dashoffset:140;opacity:0}30%{opacity:.8}70%{stroke-dashoffset:0;opacity:.5}100%{stroke-dashoffset:-140;opacity:0}}' +
    '@keyframes psbPulse{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.35)}}' +
    '@keyframes psbRing{0%{opacity:.6;transform:scale(.6)}100%{opacity:0;transform:scale(1.8)}}' +
    '@keyframes psbBreathe{0%,100%{transform:scale(.92)}50%{transform:scale(1.08)}}' +
    '@keyframes psbFloat{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-10px);opacity:1}}' +
    '@keyframes psbSpin{to{transform:rotate(360deg)}}' +
    '@keyframes psbSwing{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}' +
    '@keyframes psbSlide{to{transform:translateX(-56px)}}' +
    '@keyframes psbDrift{to{transform:translate(-18px,6px)}}' +
    '@keyframes psbWave{to{transform:translateY(6px)}}' +
    '.psb .psb-art{animation:psbAmb 9s ease-in-out infinite}' +
        '@keyframes psbAmb{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-10px,-4px) scale(1.06)}}' +
    '@keyframes psbGlow{0%,100%{filter:brightness(1)}50%{filter:brightness(1.6)}}' +
    '@keyframes psbIc{0%,100%{transform:translateY(0);opacity:.7}50%{transform:translateY(-3px);opacity:1}}' +
        '.psb-off .psb *{animation-play-state:paused!important}' +
    '@media (prefers-reduced-motion:reduce){.psb .l1,.psb .l2{transform:none!important}}' +
    '@media (max-width:640px){.psb .psb-ic{width:22px;height:22px;inset:auto auto 12px 12px}}';

  function hexA(h, a) { var n = parseInt(h.slice(1), 16); return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')'; }

  function build(el) {
    var key = el.getAttribute('data-psb'), cfg = CONFIG[key];
    if (!cfg || el.__psb) return; el.__psb = 1;
    var k = cfg.colors, g = GEN[cfg.type](k);
    el.setAttribute('aria-hidden', 'true');
    el.style.setProperty('--psb-a', hexA(k[0], .55)); el.style.setProperty('--psb-b', hexA(k[1], .45));
    el.style.setProperty('--psb-g', cfg.glow); el.style.setProperty('--psb-v', cfg.speed);
    el.innerHTML = '<div class="psb-glow"></div><svg class="psb-art" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true"><g class="l1" stroke-linecap="round" stroke-linejoin="round">' + g.l1 + '</g><g class="l2" stroke-linecap="round" stroke-linejoin="round">' + g.l2 + '</g></svg>' +
      '<svg class="psb-ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + ICON[cfg.icon] + '" fill="none" stroke="' + k[0] + '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    if (el.parentElement) el.parentElement.classList.add('psb-text');
    var host = el.closest('a') || el.parentElement; if (!host) return;
    host.classList.add('psb-host');
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    var spot = document.createElement('div'); spot.className = 'psb-spot'; spot.setAttribute('aria-hidden', 'true');
    spot.style.setProperty('--psb-s', hexA(k[0], cfg.glow + .08)); host.appendChild(spot);
    var svg = el.querySelector('svg'), raf = 0, last = null;
    function apply() { raf = 0; if (!last) return; var r = host.getBoundingClientRect(), x = (last.clientX - r.left) / r.width, y = (last.clientY - r.top) / r.height;
      host.style.setProperty('--mx', (x * 100).toFixed(1) + '%'); host.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      if (!reduced()) { el.style.setProperty('--px', ((x - .5) * 2).toFixed(3)); el.style.setProperty('--py', ((y - .5) * 2).toFixed(3)); } }
    function move(e) { last = e; if (!raf) raf = requestAnimationFrame(apply); }
    host.addEventListener('pointermove', move, { passive: true });
    host.addEventListener('pointerleave', function () { el.style.setProperty('--px', 0); el.style.setProperty('--py', 0); }, { passive: true });
    var tt; host.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') { move(e); host.classList.add('psb-touch'); clearTimeout(tt); tt = setTimeout(function () { host.classList.remove('psb-touch'); }, 1400); } }, { passive: true });
    function setRun(on) { host.classList.toggle('psb-off', !on); try { if (on) svg.unpauseAnimations(); else svg.pauseAnimations(); } catch (e) {} }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es.forEach(function (e) { setRun(e.isIntersecting); }); }, { rootMargin: '80px' }).observe(host);
    else setRun(true);
  }

  function scan() {
    if (!document.getElementById('psb-css') && document.head) { var s = document.createElement('style'); s.id = 'psb-css'; s.textContent = CSS; document.head.appendChild(s); }
    var els = document.querySelectorAll('.psb[data-psb]'); for (var i = 0; i < els.length; i++) build(els[i]);
  }
  window.ParametricSiteBackground = { CONFIG: CONFIG, GEN: GEN, ICON: ICON, scan: scan };
  setInterval(scan, 700); document.addEventListener('DOMContentLoaded', scan);
})();
