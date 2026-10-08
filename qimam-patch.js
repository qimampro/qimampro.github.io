(function () {
  /* 46s cycle: 10s pause at top, 20s scrolling down, 10s pause at bottom, 6s back up */
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
    '.qs-t img{animation-duration:46s!important;animation-timing-function:cubic-bezier(.45,0,.3,1)!important}'
  ].join('\n');

  function keep() {
    if (!document.getElementById('qimam-patch-css')) document.head.appendChild(s);
  }
  keep();
  var t = setInterval(keep, 400);
  setTimeout(function () { clearInterval(t); }, 60000);
})();
