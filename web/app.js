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

  if (password !== confirmPassword) {
    alert('Mật khẩu và Nhập lại mật khẩu không khớp!');
    return;
  }

  const data = { username, phone, password };

  fetch('http://localhost:5000/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      alert(data.message);
      showForm('loginForm'); // Chuyển sang form đăng nhập
    }
  })
  .catch(error => {
    alert('Lỗi khi đăng ký');
    console.error(error);
  });
}

// Đăng nhập
function login() {
  const username = document.getElementById('usernameL').value.trim();
  const password = document.getElementById('passwordL').value;

  const data = { username, password };

  fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token); // Lưu JWT vào localStorage
      window.location.href = 'dashboard.html';  // Chuyển đến trang dashboard
    } else {
      alert(data.message);
    }
  })
  .catch(error => {
    alert('Lỗi khi đăng nhập');
    console.error(error);
  });
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
