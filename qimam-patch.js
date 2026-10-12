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
    '#gallery a.scp1 .gscr{display:none!important}'
  ].join('\n');

  function keepCss() {
    if (!document.getElementById('qimam-patch-css')) document.head.appendChild(s);
  }

  keepCss();
  var t = setInterval(keepCss, 400);
  setTimeout(function () { clearInterval(t); }, 60000);
})();
