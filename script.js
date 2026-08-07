(function () {
  'use strict';

  var body = document.body;
  var STORAGE_KEY = 'theme';

  function applyTheme(mode) {
    body.classList.toggle('dark', mode === 'dark');
  }

  function currentMode() {
    return body.classList.contains('dark') ? 'dark' : 'light';
  }

  function switchMode() {
    var next = currentMode() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
  }

  // Initial theme: saved preference > system preference > light
  var saved;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  // Toggle button
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', switchMode);
  }

  // Shake to toggle (mobile)
  if (typeof Shake === 'function') {
    var shake = new Shake();
    shake.start();
    window.addEventListener('shake', switchMode, false);
  }
})();
