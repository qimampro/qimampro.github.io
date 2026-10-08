(function () {
  var MOCK = 'https://qimampro.github.io/gallery/mockups/';
  var PAGE = 'https://qimampro.github.io/gallery/';
  var SITE = 'https://qimampro.github.io/samples/';
  var MW = 1448, MH = 1086;

  /* screen rect measured from each mockup: [L, T, W, H, radius] in mockup pixels */
  var RECT = {
    sufrah:           [204, 128, 1032, 535, 3],
    sanad:            [208, 127, 998, 536, 3],
    masar_alharamain: [206, 127, 1033, 536, 3],
    tuwaiq:           [226, 141, 962, 511, 3],
    rawasheen:        [204, 127, 1032, 537, 3],
    rawaa:            [205, 126, 1031, 537, 3],
    sadu_studio:      [213, 129, 989, 522, 3],
    sudair:           [207, 128, 1030, 535, 3],
    darb_zubaidah:    [205, 128, 1032, 536, 3],
    asalah:           [206, 128, 1031, 535, 3],
    alataa:           [205, 127, 1031, 536, 3],
    kunooz:           [207, 126, 1020, 534, 3],
    alrowad_cafe:     [206, 128, 993, 532, 3],
    nukhbat_alquwa:   [204, 127, 1033, 536, 3],
    alriayah:         [204, 128, 1032, 535, 3]
  };

  var SITES = [
    ['sufrah',           'سُفرة البلد', 'مطعم حجازي'],
    ['sanad',            'مكتب سند للمحاماة', 'محاماة واستشارات'],
    ['masar_alharamain', 'مسار الحرمين', 'حج وعمرة'],
    ['tuwaiq',           'طويق للذكاء الاصطناعي', 'ذكاء اصطناعي'],
    ['rawasheen',        'رواشين للعمارة', 'هندسة معمارية'],
    ['rawaa',            'رواء للتطوير العقاري', 'تطوير عقاري'],
    ['sadu_studio',      'استوديو سدو', 'تصميم وهوية'],
    ['sudair',           'سدير للطاقة المتجددة', 'طاقة متجددة'],
    ['darb_zubaidah',    'درب زبيدة', 'سفر وسياحة'],
    ['asalah',           'أصالة للأزياء', 'أزياء'],
    ['alataa',           'جمعية العطاء والنماء', 'جمعية خيرية'],
    ['kunooz',           'كنوز التراث الإسلامي', 'كتب وتحف نادرة'],
    ['alrowad_cafe',     'كافي الرواد', 'مقهى ومطعم'],
    ['nukhbat_alquwa',   'نخبة القوة', 'نادي رياضي'],
    ['alriayah',         'مجمع الرعاية الصحية السعودي', 'مجمع صحي']
  ];

  var OPEN = '\u0627\u0641\u062a\u062d \u0627\u0644\u0645\u0648\u0642\u0639';
  var VIEW = 'استعرض الموقع';

  var s = document.createElement('style');
  s.id = 'qimam-patch-css';
  s.textContent = [
    /* 46s cycle: 10s pause at top, 20s down, 10s pause at bottom, 6s back up */
    '@keyframes gscrRun{',
    '  0%,21.74%    {transform:translateY(0)}',
    '  65.22%,86.96%{transform:translateY(var(--d))}',
    '  100%         {transform:translateY(0)}',
    '}',
    '.gscr-s img{animation-duration:46s!important;animation-timing-function:cubic-bezier(.45,0,.3,1)!important}',
    '@keyframes qsRun{',
    '  0%,21.74%    {transform:translateY(0)}',
    '  65.22%,86.96%{transform:translateY(var(--d))}',
    '  100%         {transform:translateY(0)}',
    '}',
    '.qs-t img{animation-duration:46s!important;animation-timing-function:cubic-bezier(.45,0,.3,1)!important}',
    '@keyframes qimRun{',
    '  0%,21.74%    {transform:translateY(0)}',
    '  65.22%,86.96%{transform:translateY(var(--qd,0px))}',
    '  100%         {transform:translateY(0)}',
    '}',
    '#qimam-mockups{padding:92px 0 76px}',
    '#qimam-mockups .mk-inner{max-width:1500px;margin:0 auto;padding:0 28px}',
    '#qimam-mockups .mk-head{text-align:center;margin-bottom:56px}',
    '#qimam-mockups .mk-head .eyebrow{justify-content:center;margin-bottom:16px}',
    '#qimam-mockups .mk-head h2{font-size:clamp(28px,4vw,46px);margin:0 0 12px}',
    '#qimam-mockups .mk-head p{opacity:.6;max-width:520px;margin:0 auto}',
    '#qimam-mockups .mk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(440px,1fr));gap:34px}',
    '#qimam-mockups .mk-card{display:block;color:inherit;text-decoration:none;cursor:pointer;',
    '  border-radius:20px;overflow:hidden;background:#09090b;',
    '  box-shadow:0 24px 70px -20px rgba(0,0,0,.6);',
    '  transition:transform .45s cubic-bezier(.2,0,.1,1),box-shadow .45s}',
    '#qimam-mockups .mk-card:hover{transform:translateY(-10px) scale(1.012);',
    '  box-shadow:0 42px 104px -26px rgba(0,0,0,.78)}',
    '#qimam-mockups .mk-card:active{transform:translateY(-4px) scale(.998);transition-duration:.12s}',
    '#qimam-mockups .mk-card:focus-visible{outline:2px solid var(--accent,#d4af6a);outline-offset:4px}',
    '#qimam-mockups .mk-shot{position:relative;width:100%;overflow:hidden;background:#000;',
    '  cursor:pointer}',
    /* glow sweep + open badge on hover */
    '#qimam-mockups .mk-shot:after{content:"";position:absolute;inset:0;z-index:3;pointer-events:none;',
    '  background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.14) 50%,transparent 65%);',
    '  transform:translateX(-120%);transition:transform .75s cubic-bezier(.3,0,.2,1)}',
    '#qimam-mockups .mk-card:hover .mk-shot:after{transform:translateX(120%)}',
    '#qimam-mockups .mk-open{position:absolute;z-index:4;inset:auto 0 0 0;display:flex;',
    '  align-items:center;justify-content:center;gap:10px;padding:14px 0 16px;',
    '  font-size:14px;font-weight:700;color:#fff;pointer-events:none;',
    '  background:linear-gradient(transparent,rgba(0,0,0,.82));',
    '  opacity:0;transform:translateY(10px);transition:opacity .35s,transform .35s}',
    '#qimam-mockups .mk-card:hover .mk-open{opacity:1;transform:translateY(0)}',
    '#qimam-mockups .mk-open i{font-style:normal;display:inline-flex;width:26px;height:26px;',
    '  border-radius:50%;align-items:center;justify-content:center;',
    '  background:rgba(255,255,255,.16);backdrop-filter:blur(6px)}',
    '#qimam-mockups .qim-clip{position:absolute;overflow:hidden;z-index:2;background:#0b0b0d}',
    '#qimam-mockups .qim-clip>img{position:absolute;top:0;left:0;width:100%;height:auto;display:block;',
    '  animation:qimRun 46s cubic-bezier(.45,0,.3,1) infinite;will-change:transform}',
    '#qimam-mockups .qim-frame{position:absolute;top:0;left:0;width:100%;height:auto;display:block;',
    '  z-index:1;pointer-events:none}',
    '#qimam-mockups .mk-meta{padding:20px 24px 22px;text-align:right}',
    '#qimam-mockups .mk-meta small{display:block;opacity:.5;font-size:13px;margin-bottom:6px}',
    '#qimam-mockups .mk-meta h3{margin:0 0 10px;font-size:21px}',
    '#qimam-mockups .mk-go{font-size:14px;opacity:.75;display:inline-flex;align-items:center;gap:8px}',
    '#qimam-mockups .mk-card:hover .mk-go{opacity:1}',
    '@media(max-width:900px){#qimam-mockups .mk-grid{grid-template-columns:1fr;gap:26px}}'
  ].join('\n');

  function keepCss() {
    if (!document.getElementById('qimam-patch-css')) document.head.appendChild(s);
  }

  function sizeShot(shot) {
    var W = shot.clientWidth;
    if (!W) return;
    var r = RECT[shot.getAttribute('data-slug')];
    if (!r) return;
    var k = W / MW;
    shot.style.height = (MH * k) + 'px';
    var clip = shot.querySelector('.qim-clip');
    if (!clip) return;
    var cw = r[2] * k, ch = r[3] * k;
    clip.style.left = (r[0] * k) + 'px';
    clip.style.top = (r[1] * k) + 'px';
    clip.style.width = cw + 'px';
    clip.style.height = ch + 'px';
    clip.style.borderRadius = Math.max(1, r[4] * k) + 'px';
    var img = clip.querySelector('img');
    if (img && img.naturalWidth) {
      var disp = cw * img.naturalHeight / img.naturalWidth;
      img.style.setProperty('--qd', (disp > ch ? -(disp - ch) : 0) + 'px');
    }
  }

  function layoutAll() {
    var n = document.querySelectorAll('#qimam-mockups .mk-shot');
    for (var i = 0; i < n.length; i++) sizeShot(n[i]);
  }

  function buildSection() {
    var sec = document.createElement('section');
    sec.id = 'qimam-mockups';
    sec.innerHTML = '<div class="mk-inner"><div class="mk-head">'
      + '<p class="eyebrow">معرض الأعمال</p>'
      + '<h2>نماذج مواقع قمم</h2>'
      + '<p>15 موقعاً بهوية بصرية متكاملة، اضغط على أي نموذج لفتحه</p>'
      + '</div><div class="mk-grid">'
      + SITES.map(function (m) {
          return '<a class="mk-card" href="' + SITE + m[0] + '.html" target="_blank" rel="noopener">'
            + '<div class="mk-shot" data-slug="' + m[0] + '"></div>'
            + '<div class="mk-meta"><small>' + m[2] + '</small><h3>' + m[1] + '</h3>'
            + '<span class="mk-go">' + VIEW + ' ←</span></div></a>';
        }).join('')
      + '</div></div>';

    var shots = sec.querySelectorAll('.mk-shot');
    for (var i = 0; i < shots.length; i++) {
      (function (shot) {
        var slug = shot.getAttribute('data-slug');

        var clip = document.createElement('div');
        clip.className = 'qim-clip';
        var page = document.createElement('img');
        page.alt = '';
        page.loading = 'lazy';
        page.addEventListener('load', function () { sizeShot(shot); });
        page.src = PAGE + slug + '.webp';
        clip.appendChild(page);
        shot.appendChild(clip);

        var badge = document.createElement('span');
        badge.className = 'mk-open';
        badge.innerHTML = '<i>\u2197</i>' + OPEN;
        shot.appendChild(badge);

        var frame = document.createElement('img');
        frame.className = 'qim-frame';
        frame.alt = '';
        frame.loading = 'lazy';
        frame.addEventListener('load', function () { sizeShot(shot); });
        frame.src = MOCK + slug + '.webp';
        shot.appendChild(frame);
      })(shots[i]);
    }
    return sec;
  }

  function tick() {
    keepCss();
    if (!document.getElementById('qimam-mockups')) {
      var pkgs = document.getElementById('packages');
      if (pkgs && pkgs.parentNode) {
        pkgs.parentNode.insertBefore(buildSection(), pkgs);
        setTimeout(layoutAll, 60);
        setTimeout(layoutAll, 600);
      }
    }
  }

  tick();
  var t = setInterval(tick, 400);
  setTimeout(function () { clearInterval(t); }, 60000);

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(layoutAll, 160);
  });
})();
