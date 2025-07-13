const apiUrl = 'http://localhost:5000/api';
let userId = null;
let schedules = [];
let currentMonth = 4;
let currentYear = 2025;
let editingKey = null;
let notifiedEvents = new Set();
let notificationInterval = null;

const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

// ==== AUTH ==== 

function showForm(formId) {
  const forms = ['loginForm', 'registerForm', 'forgotForm'];
  const loginCat = document.getElementById('loginCat');
  const registerCat = document.getElementById('registerCat');
  forms.forEach(id => document.getElementById(id).classList.add('hidden'));
  document.getElementById(formId).classList.remove('hidden');

  if (formId === 'registerForm') {
    loginCat.classList.add('hidden');
    registerCat.classList.remove('hidden');
  } else {
    loginCat.classList.remove('hidden');
    registerCat.classList.add('hidden');
  }
}

// Không có Auth cho đăng ký/đăng nhập
// async function register() {
//   const username = document.getElementById('usernameR').value;
//   const phone = document.getElementById('phoneR').value;
//   const password = document.getElementById('passwordR').value;
//   const confirmPassword = document.getElementById('confirmPasswordR').value;
//   const agree = document.getElementById('agree').checked;

//   if (password !== confirmPassword) return alert('👉 Mật khẩu nhập lại không khớp!');
//   if (!agree) return alert('👉 Bạn phải đồng ý với điều khoản!');

//   try {
//     const res = await fetch(`${apiUrl}/accounts`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, phone, password })
//     });
//     const data = await res.json();
//     if (res.ok) {
//       alert("🎉 Đăng ký thành công!");
//       showForm('loginForm');
//     } else alert(`❌ Lỗi: ${data.error}`);
//   } catch (err) {
//     console.error(err);
//     alert('❌ Đã có lỗi xảy ra!');
//   }
// }

// async function login() {
//   const username = document.getElementById('usernameL').value;
//   const password = document.getElementById('passwordL').value;

//   try {
//     const res = await fetch(`${apiUrl}/accounts/${username}`);
//     const data = await res.json();
//     if (res.ok) {
//       if (data.password !== password) return alert("❌ Sai mật khẩu!");
//       alert("🎉 Đăng nhập thành công!");
//       localStorage.setItem("currentUser", username);
//       window.location.href = 'dashboard.html';
//     } else alert(`❌ Lỗi: ${data.error}`);
//   } catch (err) {
//     console.error(err);
//     alert('❌ Đã có lỗi xảy ra!');
//   }
// }

// Có thêm Auth cho đăng ký/đăng nhập
async function login() {
  const username = document.getElementById('usernameL').value;
  const password = document.getElementById('passwordL').value;

  try {
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (res.ok) {
      alert("🎉 Đăng nhập thành công!");
      localStorage.setItem("token", data.token); // Lưu token
      localStorage.setItem("currentUser", username); // Lưu username
      window.location.href = 'dashboard.html';
    } else {
      alert(`❌ Lỗi: ${data.error}`);
    }
  } catch (err) {
    console.error(err);
    alert('❌ Đã có lỗi xảy ra!');
  }
}

async function register() {
  const username = document.getElementById('usernameR').value;
  const phone = document.getElementById('phoneR').value;
  const password = document.getElementById('passwordR').value;
  const confirmPassword = document.getElementById('confirmPasswordR').value;
  const agree = document.getElementById('agree').checked;

  if (password !== confirmPassword) return alert('👉 Mật khẩu nhập lại không khớp!');
  if (!agree) return alert('👉 Bạn phải đồng ý với điều khoản!');

  try {
    const res = await fetch(`${apiUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, phone, password })
    });
    const data = await res.json();

    if (res.ok) {
      alert("🎉 Đăng ký thành công!");
      showForm('loginForm');
    } else {
      alert(`❌ Lỗi: ${data.error}`);
    }
  } catch (err) {
    console.error(err);
    alert('❌ Đã có lỗi xảy ra!');
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token"); // Thêm token
  window.location.href = 'index.html';
}

function forgotPassword() {
  const phone = document.getElementById('phoneForgot').value.trim();
  if (!phone) return alert('👉 Nhập số điện thoại!');
  alert('Đã gửi liên kết khôi phục (demo)');
}

// ==== DASHBOARD ====

window.onload = async () => {
  if (window.location.pathname.includes('dashboard.html')) {
    userId = localStorage.getItem("currentUser");
    if (!userId) return window.location.href = 'index.html';
    await fetchSchedules();
    renderCalendar();
    setupYearSelect();
    startNotificationChecker();
  }
};

// Không có Auth token
// async function fetchSchedules() {
//   try {
//     const res = await fetch(`${apiUrl}/accounts/${userId}`);
//     const data = await res.json();
//     if (res.ok) schedules = data.schedules;
//     else alert(`❌ Lỗi: ${data.error}`);
//   } catch (err) {
//     console.error(err);
//     alert("❌ Lỗi khi tải lịch trình!");
//   }
// }

// async function saveEvent() {
//   const title = document.getElementById("titleInput").value;
//   const datetime = document.getElementById("timeInput").value;
//   const description = document.getElementById("descInput").value;

//   if (!title || !datetime) return alert("Nhập tiêu đề và thời gian!");

//   try {
//     let res;
//     if (editingKey) {
//       res = await fetch(`${apiUrl}/accounts/${userId}/schedules/${editingKey}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title, datetime, description })
//       });
//     } else {
//       res = await fetch(`${apiUrl}/accounts/${userId}/schedules`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title, datetime, description })
//       });
//     }

//     const data = await res.json();
//     if (res.ok) {
//       alert(editingKey ? '✏️ Cập nhật thành công!' : '🎉 Đã thêm!');
//       await fetchSchedules();
//       renderCalendar();
//       editingKey = null;
//       showTab('calendar');
//     } else alert(`❌ Lỗi: ${data.error}`);
//   } catch (err) {
//     console.error(err);
//     alert("❌ Lỗi khi lưu sự kiện!");
//   }
// }
//
// async function deleteSchedule(id) {
//   if (!confirm("Xóa sự kiện này?")) return;
//
//   try {
//     const res = await fetch(`${apiUrl}/accounts/${userId}/schedules/${id}`, { method: 'DELETE' });
//     if (res.ok) {
//       alert("🗑️ Xoá thành công!");
//       await fetchSchedules();
//       renderCalendar();
//       closePopup();
//     } else {
//       const data = await res.json();
//       alert(`❌ Lỗi: ${data.error}`);
//     }
//   } catch (err) {
//     console.error(err);
//     alert("❌ Lỗi khi xoá!");
//   }
// }

// Có thêm Auth token
async function fetchSchedules() {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${apiUrl}/accounts/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();
    if (res.ok) {
      schedules = data.schedules;
      notifiedEvents = new Set();
    } else {
      alert(`❌ Lỗi: ${data.error}`);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Lỗi khi tải lịch trình!");
  }
}

async function saveEvent() {
  const title = document.getElementById("titleInput").value;
  const datetime = document.getElementById("timeInput").value;
  const description = document.getElementById("descInput").value;
  const notify = document.getElementById("notifyInput").checked;
  const token = localStorage.getItem("token");

  if (!title || !datetime) return alert("Nhập tiêu đề và thời gian!");

  try {
    let res;
    if (editingKey) {
      res = await fetch(`${apiUrl}/accounts/${userId}/schedules/${editingKey}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, datetime, description, notify })
      });
    } else {
      res = await fetch(`${apiUrl}/accounts/${userId}/schedules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, datetime, description, notify })
      });
    }

    const data = await res.json();
    if (res.ok) {
      alert(editingKey ? '✏️ Cập nhật thành công!' : '🎉 Đã thêm!');
      await fetchSchedules();
      renderCalendar();
      editingKey = null;
      cancelEvent();
    } else {
      alert(`❌ Lỗi: ${data.error}`);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Lỗi khi lưu sự kiện!");
  }
}

function cancelEvent() {
  // Xoá input
  document.getElementById("titleInput").value = "";
  document.getElementById("timeInput").value = "";
  document.getElementById("descInput").value = "";
  document.getElementById("notifyInput").checked = false;

  editingKey = null;
  closePopup();
  // Quay lại lịch
  showTab('calendar');
}

async function deleteSchedule(id) {
  if (!confirm("Xóa sự kiện này?")) return;

  try {
    const token = localStorage.getItem("token"); // lấy token từ localStorage
    if (!token) {
      alert("❌ Chưa đăng nhập!");
      return;
    }

    const res = await fetch(`${apiUrl}/accounts/${userId}/schedules/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (res.ok) {
      alert("🗑️ Xoá thành công!");
      await fetchSchedules();
      renderCalendar();
      closePopup();
    } else {
      const data = await res.json();
      alert(`❌ Lỗi: ${data.error}`);
    }
  } catch (err) {
    console.error(err);
    alert("❌ Lỗi khi xoá!");
  }
}

function showTab(tab) {
  const tabs = ['calendarTab', 'eventFormTab', 'settingTab'];
  tabs.forEach(id => document.getElementById(id).classList.add('hidden'));
  document.getElementById(`${tab}Tab`).classList.remove('hidden');

  if (tab === 'calendar') renderCalendar();
  if (tab === 'setting') renderSetting();
}

function renderCalendar() {
  const monthTitle = document.getElementById("monthTitle");
  const calendarGrid = document.getElementById("calendarGrid");
  monthTitle.innerText = monthNames[currentMonth];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;

  calendarGrid.innerHTML = `
    <div class="font-bold dark:text-white">Thứ 2</div>
    <div class="font-bold dark:text-white">Thứ 3</div>
    <div class="font-bold dark:text-white">Thứ 4</div>
    <div class="font-bold dark:text-white">Thứ 5</div>
    <div class="font-bold dark:text-white">Thứ 6</div>
    <div class="font-bold dark:text-white">Thứ 7</div>
    <div class="font-bold dark:text-white">CN</div>
  `;

  let day = 1;

  for (let i = 0; i < 42; i++) {
    const cell = document.createElement("div");
    cell.className = "min-h-[80px] bg-white rounded p-1 overflow-hidden text-left dark:bg-gray-700";

    if (i >= firstDay && day <= daysInMonth) {
      const currentDay = day;

      const content = document.createElement("div");
      content.className = "bg-[#FFD6E7] p-1 rounded h-full cursor-pointer hover:bg-[#FFACC9]";
      content.onclick = () => showPopup(currentDay);

      const title = document.createElement("div");
      title.className = "font-semibold text-sm";
      title.textContent = currentDay;
      content.appendChild(title);

      const events = schedules.filter(s => {
        const d = new Date(s.datetime);
        return d.getFullYear() === currentYear && d.getMonth() === currentMonth && d.getDate() === currentDay;
      });

      events.forEach(ev => {
        const e = document.createElement("div");
        e.className = "text-xs text-pink-800 truncate";
        e.textContent = "• " + ev.title;
        content.appendChild(e);
      });

      cell.appendChild(content);
      day++;
    }

    calendarGrid.appendChild(cell);
  }
}

function changeMonth(offset) {
  currentMonth += offset;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  document.getElementById("yearSelect").value = currentYear;
  renderCalendar();
}

function setupYearSelect() {
  const yearSelect = document.getElementById("yearSelect");
  yearSelect.innerHTML = '';
  for (let y = 2020; y <= 2030; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    if (y === currentYear) option.selected = true;
    yearSelect.appendChild(option);
  }
}

function changeYear(year) {
  currentYear = parseInt(year);
  renderCalendar();
}

function showPopup(day) {
  // Hiển thị ngày lên tiêu đề popup
  document.getElementById("popupDate").innerText = `${day}/${currentMonth + 1}/${currentYear}`;
  const list = document.getElementById("eventList");
  const actions = document.getElementById("popupActions");

  // Lọc sự kiện của ngày này
  const events = schedules.filter(s => {
    const d = new Date(s.datetime);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth && d.getDate() === day;
  });

  // Xóa nội dung cũ
  list.innerHTML = "";
  actions.innerHTML = "";

  // Nếu không có sự kiện nào
  if (events.length === 0) {
    list.innerHTML = `<p class="italic text-gray-500">Chưa có sự kiện nào.</p>`;
  } else {
    // Hiển thị từng sự kiện
    events.forEach(ev => {
      const div = document.createElement("div");
      div.className = "mb-3 border-b pb-2";

      div.innerHTML = `
        <p>📝 <strong>${ev.title}</strong></p>
        <p>🕒 ${new Date(ev.datetime).toLocaleString()}</p>
        <p>📄 ${ev.description || "(Không có mô tả)"}</p>
        <p>🔔 Nhắc nhở: ${ev.notify ? "Có" : "Không"}</p>
      `;

      const btnGroup = document.createElement("div");
      btnGroup.className = "flex justify-end gap-2 mt-1";

      // Nút sửa
      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️ Sửa";
      editBtn.className = "text-sm text-blue-600";
      editBtn.onclick = () => {
        document.getElementById("titleInput").value = ev.title;
        document.getElementById("timeInput").value = ev.datetime.slice(0, 16);
        document.getElementById("descInput").value = ev.description;
        document.getElementById("notifyInput").checked = ev.notify || false;
        editingKey = ev.id;
        showTab("eventForm");
        closePopup();
      };

      // Nút xoá
      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑️ Xóa";
      delBtn.className = "text-sm text-red-600";
      delBtn.onclick = () => deleteSchedule(ev.id);

      btnGroup.appendChild(editBtn);
      btnGroup.appendChild(delBtn);
      div.appendChild(btnGroup);

      list.appendChild(div);
    });
  }

  // Nút thêm mới sự kiện trong ngày này
  const addBtn = document.createElement("button");
  addBtn.textContent = "➕ Thêm sự kiện";
  addBtn.className = "bg-pink-400 text-white px-3 py-1 rounded text-sm";
  addBtn.onclick = () => {
    document.getElementById("titleInput").value = "";
    document.getElementById("descInput").value = "";
    document.getElementById("timeInput").value = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T09:00`;
    document.getElementById("notifyInput").checked = false;
    editingKey = null;
    showTab("eventForm");
    closePopup();
  };
  actions.appendChild(addBtn);

  // Hiển thị popup
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

function renderSetting() {
  document.getElementById("accountUsername").textContent = localStorage.getItem("currentUser");
}

// Toggle giao diện khi bật/tắt công tắc
function toggleTheme() {
  const isDark = document.getElementById('themeToggle').checked;
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load theme lúc khởi động trang
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.removeItem('theme')

  // Nếu đã lưu 'dark' thì bật dark mode, còn không thì giữ sáng mặc định
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }

  // Đồng bộ trạng thái công tắc nếu có phần tử
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.checked = (savedTheme === 'dark');
  }
});

// Đổi mật khẩu
async function changePassword() {
  const currentPassword = document.getElementById('currentPasswordInput').value;
  const newPassword = document.getElementById('newPasswordInput').value;
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  if (!currentPassword || !newPassword) {
    alert('Vui lòng nhập đầy đủ mật khẩu cũ và mới!');
    return;
  }

  if (currentPassword == newPassword) {
    alert('Mật khẩu cũ bị trùng với mật khẩu mới!');
    return;
  }

  if (!token) {
    alert("❌ Bạn chưa đăng nhập!");
    return;
  }

  const res = await fetch(`${apiUrl}/accounts/change-password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ currentPassword, newPassword })
  });

  const data = await res.json();

  if (res.ok) {
    alert('✅ Đổi mật khẩu thành công!');
    document.getElementById('currentPasswordInput').value = '';
    document.getElementById('newPasswordInput').value = '';
  } else {
    alert(`❌ Lỗi khi đổi mật khẩu! ${data.message}`);
    document.getElementById('currentPasswordInput').value = '';
    document.getElementById('newPasswordInput').value = '';
  }
}

// Hiển thị mật khẩu
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    btn.textContent = "🙈";
  } else {
    input.type = "password";
    btn.textContent = "👁️";
  }
}

// Thông báo nhắc nhở
function startNotificationChecker() {
  if (notificationInterval) clearInterval(notificationInterval);
  notifiedEvents = new Set();

  notificationInterval = setInterval(() => {
    const now = new Date();
    const nowStr = now.toISOString().slice(0, 16);

    schedules.forEach(event => {
      const eventTimeStr = new Date(event.datetime).toISOString().slice(0, 16);
      if (
        event.notify &&
        !notifiedEvents.has(event.id) &&
        eventTimeStr === nowStr
      ) {
        alert(`🔔 Nhắc nhở: ${event.title}\n🕒 Thời gian: ${new Date(event.datetime).toLocaleString()}\n📄 Nội dung: ${event.description || "(Không có mô tả)"}`);
        notifiedEvents.add(event.id);
      }
    });
  }, 1000);
}

// Đánh giá ứng dụng
function rateApp(stars) {
  const starButtons = document.querySelectorAll("#ratingStars button");
  starButtons.forEach((btn, index) => {
    btn.textContent = index < stars ? "🩷" : "🩶";
  });

  // Phản hồi theo số sao
  let message = "";
  switch (stars) {
    case 1:
      message = "😥 Rất tiếc nếu bạn chưa hài lòng! Chúng mình sẽ cố gắng hơn.";
      break;
    case 2:
      message = "😶 Cảm ơn bạn! Chúng mình sẽ cải thiện nhiều hơn nữa.";
      break;
    case 3:
      message = "🙂 Cảm ơn phản hồi của bạn!";
      break;
    case 4:
      message = "😄 Tuyệt vời! Rất vui khi bạn hài lòng.";
      break;
    case 5:
      message = "🎉 Tuyệt đỉnh! Cảm ơn bạn rất nhiều ❤️";
      break;
    default:
      message = "Cảm ơn bạn đã đánh giá!";
  }

  alert(message);
}

// Thay đổi ngôn ngữ
function changeLanguage() {
  const lang = document.getElementById("languageSelect").value;

  if (lang === "English") {
    alert("🌐 English version is under development!");
    return;
  } else {
    localStorage.setItem("language", lang);
    alert(`🌐 Ngôn ngữ đã chuyển sang: ${lang}`);
    return;
  }
}