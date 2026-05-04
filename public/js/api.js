const API_URL = 'http://localhost:3000/api';

function getToken() {
  return localStorage.getItem('token');
}

function headers() {
  const token = getToken();
  const h = { 'Content-Type': 'application/json' };
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
}

async function request(url, options = {}) {
  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: headers()
  });
  if (res.status === 401) {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
    return;
  }
  return res.json();
}