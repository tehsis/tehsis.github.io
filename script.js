var shake = new Shake();

shake.start();

function switchMode () {
  var new_mode = document.body.classList.contains('dark') ? 'light' : 'dark';
  document.body.classList.remove(new_mode === 'light' ? 'dark' : 'light');
  document.body.classList.add(new_mode);
}

window.addEventListener('shake', switchMode, false);