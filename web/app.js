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
  const username = document.getElementById('usernameR').value.trim();
  const phone = document.getElementById('phoneR').value.trim();
  const password = document.getElementById('passwordR').value;
  const confirmPassword = document.getElementById('confirmPasswordR').value;
  const agree = document.getElementById('agree').checked;

  // Kiểm tra các trường rỗng
  if (!username || !phone || !password || !confirmPassword) {
    alert('Vui lòng điền đầy đủ thông tin!');
    return;
  }

  // Kiểm tra mật khẩu khớp nhau
  if (password !== confirmPassword) {
    alert('Mật khẩu và Nhập lại mật khẩu không khớp!');
    return;
  }

  // Kiểm tra đã đồng ý điều khoản chưa
  if (!agree) {
    alert('Bé phải đồng ý với Điều khoản dịch vụ và Chính sách bảo mật nha!');
    return;
  }

  // Nếu tất cả hợp lệ
  alert('Đăng ký thành công! 🐱🎉');
  // Ở đây sau này bé có thể gọi API gửi dữ liệu lên server nè!
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
