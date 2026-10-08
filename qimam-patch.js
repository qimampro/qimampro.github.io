(function () {
  var BASE = 'https://qimampro.github.io/gallery/';
  var PAGE = BASE + 'pages/';

  /* screen rect inside the 1448x1086 mockup, as fractions of container WIDTH */
  var RL = 178 / 1448, RT = 92 / 1448, RW = 1090 / 1448, RH = 603 / 1448;

  var SITES = [
    ['sufrah',           'سُفرة البلد',                 'مطعم حجازي'],
    ['sanad',            'مكتب سند للمحاماة',   'محاماة واستشارات'],
    ['masar_alharamain', 'مسار الحرمين',             'حج وعمرة'],
    ['tuwaiq',           'طويق للذكاء الاصطناعي', 'ذكاء اصطناعي'],
    ['rawasheen',        'رواشين للعمارة', 'هندسة معمارية'],
    ['rawaa',            'رواء للتطوير العقاري', 'تطوير عقاري'],
    ['sadu_studio',      'استوديو سدو',                   'تصميم وهوية'],
    ['sudair',           'سدير للطاقة المتجددة', 'طاقة متجددة'],
    ['darb_zubaidah',    'درب زبيدة',                               'سفر وسياحة'],
    ['asalah',           'أصالة للأزياء',       'أزياء نسائية'],
    ['alataa',           'جمعية العطاء والنماء', 'جمعية خيرية'],
    ['kunooz',           'كنوز التراث الإسلامي', 'تحف وكتب نادرة'],
    ['alrowad_cafe',     'كافي الرواد',                   'مقهى ومحمصة'],
    ['nukhbat_alquwa',   'نخبة القوة',                         'نادي رياضي · رجال'],
    ['alriayah',         'مجمع الرعاية الصحية السعودي', 'مجمع صحي']
  ];

  /* ---------- CSS ---------- */
  var s = document.createElement('style');
  s.id = 'qimam-patch-css';
  s.textContent = [
    /* 46s cycle: 10s top pause, 20s down, 10s bottom pause, 6s up */
    '@keyframes qimRun{',
    '  0%,21.74%   {transform:translateY(0)}',
    '  65.22%,86.96%{transform:translateY(var(--qd,0px))}',
    '  100%        {transform:translateY(0)}',
    '}',
    '.qim-frame{position:absolute;top:0;left:0;width:100%;height:auto;display:block;z-index:1}',
    '.qim-clip{position:absolute;overflow:hidden;z-index:2;background:#000}',
    '.qim-clip>img{position:absolute!important;top:0!important;left:0!important;',
    '  width:100%!important;height:auto!important;max-width:none!important;max-height:none!important;',
    '  display:block;transform:translateY(0);',
    '  animation:qimRun 46s cubic-bezier(.45,0,.3,1) infinite!important;will-change:transform}',
    /* curved stage: the site itself, no mockup */
    '.qs-t>img{animation:qimRun 46s cubic-bezier(.45,0,.3,1) infinite!important;',
    '  position:absolute!important;top:0!important;left:0!important;',
    '  width:100%!important;height:auto!important;max-height:none!important}',
    /* showcase section */
    '#qimam-mockups{padding:92px 0 76px}',
    '#qimam-mockups .mk-inner{max-width:1500px;margin:0 auto;padding:0 28px}',
    '#qimam-mockups .mk-head{text-align:center;margin-bottom:58px}',
    '#qimam-mockups .mk-head .eyebrow{justify-content:center;margin-bottom:16px}',
    '#qimam-mockups .mk-head h2{font-size:clamp(28px,4vw,46px);margin:0 0 12px}',
    '#qimam-mockups .mk-head p{opacity:.6;max-width:520px;margin:0 auto}',
    '#qimam-mockups .mk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(440px,1fr));gap:34px}',
    '#qimam-mockups .mk-card{border-radius:20px;overflow:hidden;background:#09090b;',
    '  box-shadow:0 24px 70px -20px rgba(0,0,0,.6);',
    '  transition:transform .4s cubic-bezier(.2,0,.1,1),box-shadow .4s}',
    '#qimam-mockups .mk-card:hover{transform:translateY(-8px);',
    '  box-shadow:0 38px 96px -26px rgba(0,0,0,.72)}',
    '#qimam-mockups .mk-shot{position:relative;width:100%;overflow:hidden}',
    '#qimam-mockups .mk-meta{padding:20px 24px 24px;text-align:right}',
    '#qimam-mockups .mk-meta small{display:block;opacity:.5;font-size:13px;margin-bottom:6px}',
    '#qimam-mockups .mk-meta h3{margin:0;font-size:21px}',
    '@media(max-width:900px){#qimam-mockups .mk-grid{grid-template-columns:1fr;gap:26px}}'
  ].join('\n');

  function keepCss() {
    if (!document.getElementById('qimam-patch-css')) document.head.appendChild(s);
  }

  /* ---------- helpers ---------- */
  function slugOf(el) {
    var src = el.getAttribute('src') || '';
    var m = src.match(/\/gallery\/(?:pages\/)?([a-z_0-9]+)\.webp/);
    return m ? m[1] : null;
  }

  function sizeClip(box, clip, img) {
    var W = box.clientWidth;
    if (!W) return;
    var cw = RW * W, ch = RH * W;
    clip.style.left = (RL * W) + 'px';
    clip.style.top = (RT * W) + 'px';
    clip.style.width = cw + 'px';
    clip.style.height = ch + 'px';
    if (img.naturalWidth) {
      var disp = cw * img.naturalHeight / img.naturalWidth;
      img.style.setProperty('--qd', (disp > ch ? -(disp - ch) : 0) + 'px');
    }
  }

  /* mockup stays still, the site scrolls inside its screen */
  function rigFramed(box) {
    var img = box.querySelector('img');
    if (!img) return;
    if (box.getAttribute('data-qim') === '1') {
      var c = box.querySelector('.qim-clip');
      if (c) sizeClip(box, c, c.querySelector('img'));
      return;
    }
    var slug = slugOf(img);
    if (!slug) return;
    box.setAttribute('data-qim', '1');
    if (getComputedStyle(box).position === 'static') box.style.position = 'relative';

    var frame = document.createElement('img');
    frame.className = 'qim-frame';
    frame.alt = '';
    frame.src = BASE + slug + '.webp';
    box.insertBefore(frame, box.firstChild);

    var clip = document.createElement('div');
    clip.className = 'qim-clip';
    img.parentNode.insertBefore(clip, img);
    clip.appendChild(img);
    img.removeAttribute('style');
    img.src = PAGE + slug + '.webp';
    img.addEventListener('load', function () { sizeClip(box, clip, img); });
    sizeClip(box, clip, img);
  }

  /* curved stage: show the live site itself, no mockup */
  function rigBare(box) {
    var img = box.querySelector('img');
    if (!img) return;
    var slug = slugOf(img);
    if (!slug) return;
    if (img.getAttribute('data-qim') !== '1') {
      img.setAttribute('data-qim', '1');
      img.src = PAGE + slug + '.webp';
      img.addEventListener('load', function () { sizeBare(box, img); });
    }
    sizeBare(box, img);
  }

  function sizeBare(box, img) {
    if (!img.naturalWidth) return;
    var disp = box.clientWidth * img.naturalHeight / img.naturalWidth;
    var ch = box.clientHeight;
    img.style.setProperty('--qd', (disp > ch ? -(disp - ch) : 0) + 'px');
  }

  /* ---------- showcase section ---------- */
  function buildSection() {
    var sec = document.createElement('section');
    sec.id = 'qimam-mockups';
    var cards = SITES.map(function (m) {
      return '<div class="mk-card">'
        + '<div class="mk-shot" data-slug="' + m[0] + '"></div>'
        + '<div class="mk-meta"><small>' + m[2] + '</small><h3>' + m[1] + '</h3></div>'
        + '</div>';
    }).join('');
    sec.innerHTML = '<div class="mk-inner"><div class="mk-head">'
      + '<p class="eyebrow">معرض الأعمال</p>'
      + '<h2>نماذج مواقع قمم</h2>'
      + '<p>15 موقعاً بهوية بصرية متكاملة، تصفّح كل موقع داخل الشاشة</p>'
      + '</div><div class="mk-grid">' + cards + '</div></div>';

    sec.querySelectorAll('.mk-shot').forEach(function (shot) {
      var slug = shot.getAttribute('data-slug');
      shot.style.position = 'relative';

      var frame = document.createElement('img');
      frame.className = 'qim-frame';
      frame.alt = '';
      frame.src = BASE + slug + '.webp';
      frame.addEventListener('load', function () {
        shot.style.height = (shot.clientWidth * 1086 / 1448) + 'px';
        sizeClip(shot, clip, page);
      });
      shot.appendChild(frame);

      var clip = document.createElement('div');
      clip.className = 'qim-clip';
      var page = document.createElement('img');
      page.alt = '';
      page.loading = 'lazy';
      page.src = PAGE + slug + '.webp';
      page.addEventListener('load', function () { sizeClip(shot, clip, page); });
      clip.appendChild(page);
      shot.appendChild(clip);
    });
    return sec;
  }

  function relayoutSection() {
    var sec = document.getElementById('qimam-mockups');
    if (!sec) return;
    sec.querySelectorAll('.mk-shot').forEach(function (shot) {
      shot.style.height = (shot.clientWidth * 1086 / 1448) + 'px';
      var clip = shot.querySelector('.qim-clip');
      if (clip) sizeClip(shot, clip, clip.querySelector('img'));
    });
  }

  /* ---------- run ---------- */
  function tick() {
    keepCss();
    document.querySelectorAll('.gscr-s').forEach(rigFramed);
    document.querySelectorAll('.qs-t').forEach(rigBare);
    if (!document.getElementById('qimam-mockups')) {
      var pkgs = document.getElementById('packages');
      if (pkgs && pkgs.parentNode) pkgs.parentNode.insertBefore(buildSection(), pkgs);
    }
  }

  var t = setInterval(tick, 400);
  setTimeout(function () { clearInterval(t); }, 90000);
  tick();

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      document.querySelectorAll('.gscr-s').forEach(rigFramed);
      document.querySelectorAll('.qs-t').forEach(rigBare);
      relayoutSection();
    }, 160);
  });
})();
