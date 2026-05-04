const form = document.getElementById('usuarioForm');
const tbody = document.querySelector('#usuariosTable tbody');

async function carregar() {
  const usuarios = await request('/usuarios');
  tbody.innerHTML = usuarios.map(u => `
    <tr>
      <td>${u.id}</td>
      <td>${u.nome}</td>
      <td>${u.email}</td>
      <td>${u.papel}</td>
      <td>
        <button onclick="editar(${u.id})">Editar</button>
        <button onclick="deletar(${u.id})">Deletar</button>
      </td>
    </tr>
  `).join('');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('usuarioId').value;
  const body = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    papel: document.getElementById('papel').value
  };
  if (!id) body.senha = document.getElementById('senha').value;

  if (id) {
    await request(`/usuarios/${id}`, { method: 'PUT', body: JSON.stringify(body) });
  } else {
    await request('/registrar', { method: 'POST', body: JSON.stringify(body) });
  }
  form.reset();
  document.getElementById('senha').style.display = 'block';
  carregar();
});

async function deletar(id) {
  if (confirm('Deletar usuário?')) {
    await request(`/usuarios/${id}`, { method: 'DELETE' });
    carregar();
  }
}

async function editar(id) {
  const u = await request(`/usuarios/${id}`);
  document.getElementById('usuarioId').value = u.id;
  document.getElementById('nome').value = u.nome;
  document.getElementById('email').value = u.email;
  document.getElementById('papel').value = u.papel;
  document.getElementById('senha').style.display = 'none';
}

function cancelar() {
  form.reset();
  document.getElementById('senha').style.display = 'block';
}

carregar();