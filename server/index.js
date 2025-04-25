const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Dữ liệu giả
let schedules = [];

// Lấy danh sách lịch trình
app.get('/api/schedule', (req, res) => {
  res.json(schedules);
});

// Thêm lịch trình
app.post('/api/schedule', (req, res) => {
  schedules.push(req.body);
  res.json({ message: 'Đã thêm lịch trình!' });
});

// Xoá lịch trình theo index
app.delete('/api/schedule/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < schedules.length) {
    schedules.splice(index, 1);
    res.json({ message: 'Đã xoá lịch trình!' });
  } else {
    res.status(404).json({ error: 'Không tìm thấy lịch trình' });
  }
});

app.listen(5000, () => {
  console.log('Server chạy ở cổng 5000');
});