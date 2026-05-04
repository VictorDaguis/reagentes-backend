const form = document.getElementById('movimentacaoForm');
const tbody = document.querySelector('#movimentacoesTable tbody');

// Carregar reagentes para o select
async function carregarReagentes() {
  const reagentes = await request('/reagentes');
  const select = document.getElementById('reagenteId');
  select.innerHTML = '<option value="">Selecione o reagente</option>';
  reagentes.forEach(r => {
    select.innerHTML += `<option value="${r.id}">${r.nome} (Qtd: ${r.quantidade})</option>`;
  });
}

async function carregar() {
  const movs = await request('/movimentacoes');
  tbody.innerHTML = movs.map(m => `
    <tr>
      <td>${m.id}</td>
      <td>${m.reagente ? m.reagente.nome : 'N/A'}</td>
      <td>${m.tipo}</td>
      <td>${m.quantidade}</td>
      <td>${m.responsavel}</td>
      <td>${new Date(m.data).toLocaleDateString('pt-BR')}</td>
      <td>${m.usuario ? m.usuario.nome : 'N/A'}</td>
    </tr>
  `).join('');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    reagenteId: parseInt(document.getElementById('reagenteId').value),
    tipo: document.getElementById('tipo').value,
    quantidade: parseInt(document.getElementById('quantidade').value),
    responsavel: document.getElementById('responsavel').value
  };

  const res = await request('/movimentacoes', { method: 'POST', body: JSON.stringify(body) });
  if (res.id) {
    form.reset();
    carregarReagentes(); // atualiza quantidades nos selects
    carregar();
  } else {
    alert(res.erro || 'Erro ao registrar movimentação');
  }
});

carregarReagentes();
carregar();