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

  // ---------- Shake to toggle (mobile) ----------
  var shakeStarted = false;

  function startShake() {
    if (shakeStarted || typeof Shake !== 'function') return;
    shakeStarted = true;
    var shake = new Shake();
    shake.start();
    window.addEventListener('shake', switchMode, false);
  }

  var DME = window.DeviceMotionEvent;
  var needsPermission = DME && typeof DME.requestPermission === 'function';

  if (needsPermission) {
    // iOS 13+ : motion access must be requested from inside a user gesture.
    // Ask on the first interaction, then wire up shake detection.
    var requestOnce = function () {
      document.removeEventListener('click', requestOnce);
      document.removeEventListener('touchend', requestOnce);
      DME.requestPermission()
        .then(function (state) { if (state === 'granted') startShake(); })
        .catch(function () {});
    };
    document.addEventListener('click', requestOnce, false);
    document.addEventListener('touchend', requestOnce, false);
  } else {
    // Android / older iOS: no permission gate, start immediately.
    startShake();
  }
})();
