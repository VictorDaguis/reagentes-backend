const usuario = JSON.parse(localStorage.getItem('usuario'));
if (usuario) {
  document.getElementById('nomeUsuario').textContent = usuario.nome;
}

document.getElementById('logout').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'index.html';
});