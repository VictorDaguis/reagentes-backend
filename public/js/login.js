document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      window.location.href = 'dashboard.html';
    } else {
      document.getElementById('erroLogin').textContent = data.erro || 'Falha no login';
    }
  } catch (err) {
    document.getElementById('erroLogin').textContent = 'Erro de conexão';
  }
});