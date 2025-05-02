// Chuyển đổi giữa các form
function showForm(formId) {
  const forms = ['loginForm', 'registerForm', 'forgotForm'];
  const loginCat = document.getElementById('loginCat');
  const registerCat = document.getElementById('registerCat');

  forms.forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });

  document.getElementById(formId).classList.remove('hidden');

  if (formId === 'registerForm') {
    loginCat.classList.add('hidden');
    registerCat.classList.remove('hidden');
  } else {
    loginCat.classList.remove('hidden');
    registerCat.classList.add('hidden');
  }
}

// Đăng ký
function register() {
  const username = document.getElementById('usernameR').value.trim();
  const phone = document.getElementById('phoneR').value.trim();
  const password = document.getElementById('passwordR').value;
  const confirmPassword = document.getElementById('confirmPasswordR').value;
  const agree = document.getElementById('agree').checked;

  if (!username || !phone || !password || !confirmPassword) {
    alert('Vui lòng điền đầy đủ thông tin!');
    return;
  }

  if (password !== confirmPassword) {
    alert('Mật khẩu và Nhập lại mật khẩu không khớp!');
    return;
  }

  if (!agree) {
    alert('Bé phải đồng ý với Điều khoản và Chính sách nha!');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push({ username, phone, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert('Đăng ký thành công! 🐱🎉');
  showForm('loginForm');
}

// Đăng nhập
function login() {
  const username = document.getElementById('usernameL').value.trim();
  const password = document.getElementById('passwordL').value;

  if (!username || !password) {
    alert('Vui lòng nhập đầy đủ thông tin!');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === username);

  if (!user || user.password !== password) {
    alert('Sai tên đăng nhập hoặc mật khẩu!');
    return;
  }

  // Chuyển đến trang dashboard
  window.location.href = 'dashboard.html';
}

// Đăng xuất
function logout() {
  window.location.href = 'index.html';
}

// Quên mật khẩu (gửi liên kết)
function forgotPassword() {
  const phone = document.getElementById('phoneForgot').value.trim();
  if (!phone) {
    alert('Vui lòng nhập số điện thoại!');
    return;
  }
  alert('Liên kết khôi phục đã được gửi tới số điện thoại của bé (giả lập thôi nhé hehe 🐾)');
}
