// Chuyển đổi giữa các form
function showForm(formId) {
  const forms = ['loginForm', 'registerForm', 'forgotForm'];
  const loginCat = document.getElementById('loginCat');
  const registerCat = document.getElementById('registerCat');

  forms.forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });

  document.getElementById(formId).classList.remove('hidden');

  // Đổi hình mèo tuỳ form
  if (formId === 'registerForm') {
    loginCat.classList.add('hidden');
    registerCat.classList.remove('hidden');
  } else {
    loginCat.classList.remove('hidden');
    registerCat.classList.add('hidden');
  }
}

// Đăng ký người dùng
function register() {
  const username = document.getElementById('usernameR').value;
  const name = document.getElementById('nameR').value;
  const password = document.getElementById('passwordR').value;
  const confirmPassword = document.getElementById('confirmPasswordR').value;

  if (username === '' || name === '' || password === '' || confirmPassword === '') {
    alert('Vui lòng điền đầy đủ thông tin!');
    return;
  }

  if (password !== confirmPassword) {
    alert('Mật khẩu không khớp!');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = users.find(u => u.username === username);

  if (existingUser) {
    alert('Tên đăng nhập đã tồn tại!');
    return;
  }

  // Kiểm tra độ mạnh của mật khẩu
  if (password.length < 6) {
    alert('Mật khẩu phải có ít nhất 6 ký tự!');
    return;
  }

  users.push({ username, name, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');

  showForm('loginForm');
}

// Đăng nhập người dùng
function login() {
  const username = document.getElementById('usernameL').value;
  const password = document.getElementById('passwordL').value;

  if (username === '' || password === '') {
    alert('Vui lòng nhập đầy đủ thông tin!');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === username);

  if (!user) {
    alert('Sai tên đăng nhập hoặc mật khẩu!');
    return;
  }

  // Kiểm tra mật khẩu
  if (user.password !== password) {
    alert('Sai mật khẩu!');
    return;
  }

  showDashboard(user.name);
}

// Hiển thị dashboard sau khi đăng nhập
function showDashboard(name) {
  document.body.innerHTML = '';

  const dashboardTemplate = document.getElementById('dashboard');
  if (!dashboardTemplate) {
    alert('Không tìm thấy dashboard template!');
    return;
  }

  const dashboardContent = dashboardTemplate.content.cloneNode(true);

  // Thêm nội dung welcome
  const welcomeText = document.createElement('h1');
  welcomeText.className = 'text-3xl font-bold mb-6 text-center';
  welcomeText.textContent = `Chào mừng, ${name}!`;

  const logoutBtn = document.createElement('button');
  logoutBtn.textContent = 'Đăng xuất';
  logoutBtn.className = 'bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600';
  logoutBtn.onclick = logout;

  // Thêm vào body
  document.body.className = 'min-h-screen flex flex-col items-center justify-center bg-[#9BE4FF] p-4';
  document.body.appendChild(welcomeText);
  document.body.appendChild(dashboardContent);
  document.body.appendChild(logoutBtn);
}

// Đăng xuất
function logout() {
  location.reload();
}
