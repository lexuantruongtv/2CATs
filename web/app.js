const apiUrl = 'http://localhost:5000/api/users'; // URL của API backend

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

async function register() {
  const username = document.getElementById('usernameR').value;
  const phone = document.getElementById('phoneR').value;
  const password = document.getElementById('passwordR').value;
  const confirmPassword = document.getElementById('confirmPasswordR').value;
  const agree = document.getElementById('agree').checked;
  if (password !== confirmPassword) {
    alert('👉 Mật khẩu nhập lại không khớp!');
    return;
  }

  if (!agree) {
    alert('👉 Bạn phải đồng ý với điều khoản!');
    return;
  }

  try {
    const res = await fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, phone, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      showForm('loginForm');
    } else {
      alert(`❌ Lỗi: ${data.message || 'Có lỗi xảy ra, vui lòng thử lại!'}`);
    }
  } catch (err) {
    console.error(err);
    alert('❌ Đã có lỗi xảy ra! Vui lòng thử lại sau.');
  }
}

async function login() {
  const username = document.getElementById('usernameL').value;
  const password = document.getElementById('passwordL').value;

  try {
    const res = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      window.location.href = 'dashboard.html';
    } else {
      alert(`❌ Lỗi: ${data.message || 'Có lỗi xảy ra, vui lòng thử lại!'}`);
    }
  } catch (err) {
    console.error(err);
    alert('❌ Đã có lỗi xảy ra! Vui lòng thử lại sau.');
  }
}

// Đăng xuất
function logout() {
  window.location.href = 'index.html';
}

// Quên mật khẩu (gửi liên kết)
function forgotPassword() {
  const phone = document.getElementById('phoneForgot').value.trim();
  if (!phone) {
    alert('👉 Vui lòng nhập số điện thoại!');
    return;
  }
  alert('Liên kết khôi phục đã được gửi tới số điện thoại của bé (demo thôi nhé hehe 🐾)');
}

// Tạo lịch trình
let currentMonth = 4;
let currentYear = 2025;
let selectedDateKey = "";
let editingKey = null;
const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

function showTab(tab) {
  document.getElementById('calendarTab').classList.add('hidden');
  document.getElementById('eventFormTab').classList.add('hidden');
  if (tab === 'calendar') {
    document.getElementById('calendarTab').classList.remove('hidden');
    renderCalendar();
  } else {
    document.getElementById('eventFormTab').classList.remove('hidden');
  }
}

function renderCalendar() {
  const monthTitle = document.getElementById("monthTitle");
  const calendarGrid = document.getElementById("calendarGrid");
  monthTitle.innerText = monthNames[currentMonth];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;

  calendarGrid.innerHTML = `
        <div class="font-bold">Thứ 2</div><div class="font-bold">Thứ 3</div>
        <div class="font-bold">Thứ 4</div><div class="font-bold">Thứ 5</div>
        <div class="font-bold">Thứ 6</div><div class="font-bold">Thứ 7</div>
        <div class="font-bold">CN</div>`;

  let day = 1;
  for (let i = 0; i < 42; i++) {
    const cell = document.createElement("div");
    cell.className = "min-h-[80px] bg-white rounded p-1 overflow-hidden text-left";

    if (i >= firstDay && day <= daysInMonth) {
      const key = `${currentYear}-${currentMonth + 1}-${day}`;
      const stored = localStorage.getItem(key);
      const events = stored ? JSON.parse(stored) : [];

      const content = document.createElement("div");
      content.className = "bg-[#FFD6E7] p-1 rounded h-full cursor-pointer";
      content.onclick = () => showPopup(day);

      const title = document.createElement("div");
      title.className = "font-semibold text-sm";
      title.textContent = day;
      content.appendChild(title);

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

function changeMonth(delta) {
  currentMonth += delta;
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

function changeYear(year) {
  currentYear = parseInt(year);
  renderCalendar();
}

function showPopup(day) {
  const key = `${currentYear}-${currentMonth + 1}-${day}`;
  selectedDateKey = key;
  const dateDisplay = `${day}/${currentMonth + 1}/${currentYear}`;
  document.getElementById("popupDate").innerText = dateDisplay;

  const list = document.getElementById("eventList");
  const actions = document.getElementById("popupActions");
  const stored = localStorage.getItem(key);
  const events = stored ? JSON.parse(stored) : [];

  list.innerHTML = "";
  actions.innerHTML = "";

  if (events.length === 0) {
    list.innerHTML = `<p class="italic text-gray-500">Chưa có sự kiện nào.</p>`;
    const addBtn = document.createElement("button");
    addBtn.textContent = "➕ Thêm sự kiện";
    addBtn.className = "bg-pink-400 text-white px-3 py-1 rounded text-sm";
    addBtn.onclick = () => {
      document.getElementById("timeInput").value = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T09:00`;
      showTab("eventForm");
      closePopup();
    };
    actions.appendChild(addBtn);
  } 
  else {
    events.forEach((e, index) => {
      const eventHTML = document.createElement("div");
      eventHTML.className = "mb-2 border-b pb-2";
      eventHTML.innerHTML = `
            <p>📝 <strong>${e.title}</strong></p>
            <p>🕒 ${e.time}</p>
            <p>📄 ${e.description}</p>
          `;
      const btnGroup = document.createElement("div");
      btnGroup.className = "flex justify-end gap-2 mt-1";

      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️ Sửa";
      editBtn.className = "text-sm text-blue-600";
      editBtn.onclick = () => {
        document.getElementById("titleInput").value = e.title;
        document.getElementById("timeInput").value = e.time;
        document.getElementById("descInput").value = e.description;
        editingKey = { key, index };
        showTab("eventForm");
        closePopup();
      };

      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑️ Xoá";
      delBtn.className = "text-sm text-red-600";
      delBtn.onclick = () => {
        if (confirm("Bạn có chắc muốn xoá sự kiện này?")) {
          events.splice(index, 1);
          localStorage.setItem(key, JSON.stringify(events));
          renderCalendar();
          showPopup(day);
        }
      };

      btnGroup.appendChild(editBtn);
      btnGroup.appendChild(delBtn);
      eventHTML.appendChild(btnGroup);
      list.appendChild(eventHTML);
    });

    const addMoreBtn = document.createElement("button");
    addMoreBtn.textContent = "➕ Thêm sự kiện";
    addMoreBtn.className = "bg-pink-400 text-white px-3 py-1 rounded text-sm";
    addMoreBtn.onclick = () => {
      document.getElementById("timeInput").value = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T09:00`;
      showTab("eventForm");
      closePopup();
    };
    actions.appendChild(addMoreBtn);
  }

  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

document.getElementById("saveEventBtn").onclick = function () {
  const title = document.getElementById("titleInput").value;
  const time = document.getElementById("timeInput").value;
  const description = document.getElementById("descInput").value;

  if (!title || !time) return alert("Vui lòng nhập đầy đủ tiêu đề và thời gian.");

  const date = new Date(time);
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const stored = localStorage.getItem(key);
  const events = stored ? JSON.parse(stored) : [];

  if (editingKey && editingKey.key === key) {
    events[editingKey.index] = { title, time, description };
    editingKey = null;
  } else {
    events.push({ title, time, description });
  }

  localStorage.setItem(key, JSON.stringify(events));

  document.getElementById("titleInput").value = "";
  document.getElementById("timeInput").value = "";
  document.getElementById("descInput").value = "";
  editingKey = null;

  showTab("calendar");
  renderCalendar();
};

const yearSelect = document.getElementById("yearSelect");
for (let y = 2020; y <= 2030; y++) {
  const option = document.createElement("option");
  option.value = y;
  option.textContent = y;
  if (y === currentYear) option.selected = true;
  yearSelect.appendChild(option);
}

renderCalendar();

async function saveEvent() {
  const title = document.getElementById('titleInput').value;
  const time = document.getElementById('timeInput').value;
  const description = document.getElementById('descInput').value;

  if (!title || !time) {
    alert('Vui lòng nhập tiêu đề và thời gian!');
    return;
  }

  try {
    const res = await fetch(`${apiUrl}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: userId,
        title,
        time,
        description
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert('🎉 Sự kiện đã được lưu!');
      // Xoá input sau khi lưu
      document.getElementById('titleInput').value = '';
      document.getElementById('timeInput').value = '';
      document.getElementById('descInput').value = '';
      // Hoặc chuyển tab về calendar
      window.location.href = 'dashboard.html'; 
    } else {
      alert(`❌ Lỗi: ${data.message || 'Có lỗi xảy ra, vui lòng thử lại!'}`);
    }
  } catch (err) {
    console.error(err);
    alert('❌ Đã có lỗi xảy ra! Vui lòng thử lại sau.');
  }
}
