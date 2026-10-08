(function () {
  var MOCK = 'https://qimampro.github.io/gallery/mockups/';
  var PAGE = 'https://qimampro.github.io/gallery/';

  /* screen rect inside the 1448x1086 mockup, as fractions of container WIDTH */
  var RL = 178 / 1448, RT = 92 / 1448, RW = 1090 / 1448, RH = 603 / 1448;

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
    ['asalah',           'أصالة للأزياء', 'أزياء نسائية'],
    ['alataa',           'جمعية العطاء والنماء', 'جمعية خيرية'],
    ['kunooz',           'كنوز التراث الإسلامي', 'تحف وكتب نادرة'],
    ['alrowad_cafe',     'كافي الرواد', 'مقهى ومحمصة'],
    ['nukhbat_alquwa',   'نخبة القوة', 'نادي رياضي · رجال'],
    ['alriayah',         'مجمع الرعاية الصحية السعودي', 'مجمع صحي']
  ];

  var s = document.createElement('style');
  s.id = 'qimam-patch-css';
  s.textContent = [
    /* 46s cycle: 10s pause at top, 20s down, 10s pause at bottom, 6s up */
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
    '#qimam-mockups .mk-head{text-align:center;margin-bottom:58px}',
    '#qimam-mockups .mk-head .eyebrow{justify-content:center;margin-bottom:16px}',
    '#qimam-mockups .mk-head h2{font-size:clamp(28px,4vw,46px);margin:0 0 12px}',
    '#qimam-mockups .mk-head p{opacity:.6;max-width:520px;margin:0 auto}',
    '#qimam-mockups .mk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(440px,1fr));gap:34px}',
    '#qimam-mockups .mk-card{border-radius:20px;overflow:hidden;background:#09090b;',
    '  box-shadow:0 24px 70px -20px rgba(0,0,0,.6);',
    '  transition:transform .4s cubic-bezier(.2,0,.1,1),box-shadow .4s}',
    '#qimam-mockups .mk-card:hover{transform:translateY(-8px);box-shadow:0 38px 96px -26px rgba(0,0,0,.72)}',
    '#qimam-mockups .mk-shot{position:relative;width:100%;overflow:hidden}',
    '#qimam-mockups .qim-frame{position:absolute;top:0;left:0;width:100%;height:auto;display:block;z-index:2}',
    '#qimam-mockups .qim-clip{position:absolute;overflow:hidden;z-index:1;background:#000}',
    '#qimam-mockups .qim-clip>img{position:absolute;top:0;left:0;width:100%;height:auto;display:block;',
    '  animation:qimRun 46s cubic-bezier(.45,0,.3,1) infinite;will-change:transform}',
    '#qimam-mockups .mk-meta{padding:20px 24px 24px;text-align:right}',
    '#qimam-mockups .mk-meta small{display:block;opacity:.5;font-size:13px;margin-bottom:6px}',
    '#qimam-mockups .mk-meta h3{margin:0;font-size:21px}',
    '@media(max-width:900px){#qimam-mockups .mk-grid{grid-template-columns:1fr;gap:26px}}'
  ].join('\n');

  function keepCss() {
    if (!document.getElementById('qimam-patch-css')) document.head.appendChild(s);
  }

  function sizeShot(shot) {
    var W = shot.clientWidth;
    if (!W) return;
    shot.style.height = (W * 1086 / 1448) + 'px';
    var clip = shot.querySelector('.qim-clip');
    if (!clip) return;
    var img = clip.querySelector('img');
    var cw = RW * W, ch = RH * W;
    clip.style.left = (RL * W) + 'px';
    clip.style.top = (RT * W) + 'px';
    clip.style.width = cw + 'px';
    clip.style.height = ch + 'px';
    if (img && img.naturalWidth) {
      var disp = cw * img.naturalHeight / img.naturalWidth;
      img.style.setProperty('--qd', (disp > ch ? -(disp - ch) : 0) + 'px');
    }
  }

  function buildSection() {
    var sec = document.createElement('section');
    sec.id = 'qimam-mockups';
    sec.innerHTML = '<div class="mk-inner"><div class="mk-head">'
      + '<p class="eyebrow">معرض الأعمال</p>'
      + '<h2>نماذج مواقع قمم</h2>'
      + '<p>15 موقعاً بهوية بصرية متكاملة، تصفّح كل موقع داخل الشاشة</p>'
      + '</div><div class="mk-grid">'
      + SITES.map(function (m) {
          return '<div class="mk-card"><div class="mk-shot" data-slug="' + m[0] + '"></div>'
            + '<div class="mk-meta"><small>' + m[2] + '</small><h3>' + m[1] + '</h3></div></div>';
        }).join('')
      + '</div></div>';

    Array.prototype.forEach.call(sec.querySelectorAll('.mk-shot'), function (shot) {
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

      var frame = document.createElement('img');
      frame.className = 'qim-frame';
      frame.alt = '';
      frame.addEventListener('load', function () { sizeShot(shot); });
      frame.src = MOCK + slug + '.webp';
      shot.appendChild(frame);
    });
    return sec;
  }

  function tick() {
    keepCss();
    if (!document.getElementById('qimam-mockups')) {
      var pkgs = document.getElementById('packages');
      if (pkgs && pkgs.parentNode) {
        pkgs.parentNode.insertBefore(buildSection(), pkgs);
        setTimeout(function () {
          Array.prototype.forEach.call(document.querySelectorAll('#qimam-mockups .mk-shot'), sizeShot);
        }, 60);
      }
    }
  }

  var t = setInterval(tick, 400);
  setTimeout(function () { clearInterval(t); }, 60000);
  tick();

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      Array.prototype.forEach.call(document.querySelectorAll('#qimam-mockups .mk-shot'), sizeShot);
    }, 160);
  });
})();
