const form = document.getElementById('reagenteForm');
const tbody = document.querySelector('#reagentesTable tbody');

// Carregar categorias para o select
async function carregarCategorias() {
  const categorias = await request('/categorias');
  const select = document.getElementById('categoriaId');
  select.innerHTML = '<option value="">Selecione uma categoria</option>';
  categorias.forEach(c => {
    select.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
  });
}

async function carregar() {
  const reagentes = await request('/reagentes');
  tbody.innerHTML = reagentes.map(r => `
    <tr>
      <td>${r.id}</td>
      <td>${r.nome}</td>
      <td>${r.Categoria ? r.Categoria.nome : 'N/A'}</td>
      <td>${r.unidade}</td>
      <td>${r.quantidade}</td>
      <td>${r.estoque_minimo}</td>
      <td>
        <button onclick="editar(${r.id})">Editar</button>
        <button onclick="deletar(${r.id})">Deletar</button>
      </td>
    </tr>
  `).join('');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('reagenteId').value;
  const body = {
    nome: document.getElementById('nome').value,
    categoriaId: parseInt(document.getElementById('categoriaId').value),
    unidade: document.getElementById('unidade').value,
    quantidade: parseInt(document.getElementById('quantidade').value),
    estoque_minimo: parseInt(document.getElementById('estoque_minimo').value)
  };

  if (id) {
    await request(`/reagentes/${id}`, { method: 'PUT', body: JSON.stringify(body) });
  } else {
    await request('/reagentes', { method: 'POST', body: JSON.stringify(body) });
  }
  form.reset();
  document.getElementById('reagenteId').value = '';
  carregar();
});

async function deletar(id) {
  if (confirm('Deletar reagente?')) {
    await request(`/reagentes/${id}`, { method: 'DELETE' });
    carregar();
  }
}

async function editar(id) {
  const r = await request(`/reagentes/${id}`);
  document.getElementById('reagenteId').value = r.id;
  document.getElementById('nome').value = r.nome;
  document.getElementById('categoriaId').value = r.categoriaId;
  document.getElementById('unidade').value = r.unidade;
  document.getElementById('quantidade').value = r.quantidade;
  document.getElementById('estoque_minimo').value = r.estoque_minimo;
}

function cancelar() {
  form.reset();
  document.getElementById('reagenteId').value = '';
}

carregarCategorias();
carregar();