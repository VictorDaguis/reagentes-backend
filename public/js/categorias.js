const form = document.getElementById('categoriaForm');
const tbody = document.querySelector('#categoriasTable tbody');

async function carregar() {
  const categorias = await request('/categorias');
  tbody.innerHTML = categorias.map(c => `
    <tr>
      <td>${c.id}</td>
      <td>${c.nome}</td>
      <td>
        <button onclick="editar(${c.id})">Editar</button>
        <button onclick="deletar(${c.id})">Deletar</button>
      </td>
    </tr>
  `).join('');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('categoriaId').value;
  const body = { nome: document.getElementById('nome').value };

  if (id) {
    await request(`/categorias/${id}`, { method: 'PUT', body: JSON.stringify(body) });
  } else {
    await request('/categorias', { method: 'POST', body: JSON.stringify(body) });
  }
  form.reset();
  document.getElementById('categoriaId').value = '';
  carregar();
});

async function deletar(id) {
  if (confirm('Deletar categoria?')) {
    await request(`/categorias/${id}`, { method: 'DELETE' });
    carregar();
  }
}

async function editar(id) {
  const c = await request(`/categorias/${id}`);
  document.getElementById('categoriaId').value = c.id;
  document.getElementById('nome').value = c.nome;
}

function cancelar() {
  form.reset();
  document.getElementById('categoriaId').value = '';
}

carregar();