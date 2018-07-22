const logout = document.getElementById('logout');
const token = localStorage.getItem('token');

if (token) {
  logout.onclick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
}
