(function () {
  /* 46s cycle: 10s pause at top, 20s down, 10s pause at bottom, 6s back up.
     Applies to the curved screen (still live-scrolling). The native gallery
     grid cards now use mockup photos with the site screenshot already
     composited in (precisely cropped to each photo's own screen bezel), so
     their separate live-scrolling overlay (.gscr) is hidden to avoid a
     mismatched double image on top of the baked-in screenshot. */
  var s = document.createElement('style');
  s.id = 'qimam-patch-css';
  s.textContent = [
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
    '#gallery a.scp1 .gscr{display:none!important}',
    ".qm-ct{max-width:900px;margin:0 auto;text-align:center}",
    ".qm-ct-h{margin:0 0 14px;font-size:clamp(26px,3.2vw,36px);font-weight:800;color:#F4EFE4}",
    ".qm-ct-p{margin:0 auto 36px;max-width:60ch;text-wrap:balance;font-size:16px;line-height:1.9;color:#ADA69A}",
    ".qm-ct-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin:0 0 44px}",
    ".qm-ct-i{display:grid;gap:8px;align-content:center;padding:22px 18px;border:1px solid rgba(201,162,77,.22);border-radius:18px;background:linear-gradient(180deg,rgba(201,162,77,.08),rgba(201,162,77,0));text-decoration:none;transition:border-color .3s,transform .3s}",
    ".qm-ct-i:hover{border-color:rgba(201,162,77,.55);transform:translateY(-2px)}",
    ".qm-ct-l{font-size:13px;letter-spacing:.06em;color:#8C8377}",
    ".qm-ct-v{font-size:16px;line-height:1.7;color:#F4EFE4}",
    "a.qm-ct-i .qm-ct-v{color:#C9A24D}",
    ".qm-wa{position:relative;display:inline-flex;align-items:center;gap:12px;padding:16px 36px;border-radius:999px;background:linear-gradient(135deg,#25D366,#128C7E);color:#fff!important;font-weight:700;font-size:17px;text-decoration:none;overflow:hidden;isolation:isolate;box-shadow:0 10px 30px rgba(37,211,102,.25);animation:qmWaPulse 2.4s ease-out infinite;transition:transform .25s}",
    ".qm-wa:hover{transform:translateY(-2px) scale(1.03)}",
    ".qm-wa:active{transform:scale(.97)}",
    ".qm-wa::before{content:\"\";position:absolute;top:0;left:-60%;width:45%;height:100%;background:linear-gradient(100deg,rgba(255,255,255,0),rgba(255,255,255,.6),rgba(255,255,255,0));transform:skewX(-20deg);animation:qmWaShine 3.2s ease-in-out infinite;z-index:-1;pointer-events:none}",
    ".qm-wa-ic{width:26px;height:26px;flex:none;background:url(\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22%3E%3Cpath fill=%22%23fff%22 d=%22M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z%22/%3E%3C/svg%3E\") center/contain no-repeat}",
    "@keyframes qmWaShine{0%{left:-60%}55%,100%{left:130%}}",
    "@keyframes qmWaPulse{0%{box-shadow:0 10px 30px rgba(37,211,102,.25),0 0 0 0 rgba(37,211,102,.55)}70%{box-shadow:0 10px 30px rgba(37,211,102,.25),0 0 0 18px rgba(37,211,102,0)}100%{box-shadow:0 10px 30px rgba(37,211,102,.25),0 0 0 0 rgba(37,211,102,0)}}",
    "@media (prefers-reduced-motion:reduce){.qm-wa,.qm-wa::before{animation:none}}"
  ].join('\n');

  function keepCss() {
    if (!document.getElementById('qimam-patch-css')) document.head.appendChild(s);
  }

  var icons = [
    ['icon', 'favicon.ico', null, 'any'],
    ['icon', 'favicon-32.png', 'image/png', '32x32'],
    ['icon', 'favicon-192.png', 'image/png', '192x192'],
    ['apple-touch-icon', 'apple-touch-icon.png', null, null]
  ];
  function keepIcons() {
    if (document.querySelector('link[data-qimam-icon]')) return;
    icons.forEach(function (i) {
      var l = document.createElement('link');
      l.rel = i[0]; l.href = i[1];
      if (i[2]) l.type = i[2];
      if (i[3]) l.setAttribute('sizes', i[3]);
      l.setAttribute('data-qimam-icon', '');
      document.head.appendChild(l);
    });
  }

  function keepAll() { keepCss(); keepIcons(); }
  keepAll();
  var t = setInterval(keepAll, 400);
  setTimeout(function () { clearInterval(t); }, 60000);
})();
