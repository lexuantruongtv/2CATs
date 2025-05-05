import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Đăng ký
router.post('/register', async (req, res) => {
  try {
    const { username, phone, password } = req.body;

    // Kiểm tra username tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username đã tồn tại!' });
    }

    // Tạo user mới
    const newUser = new User({
      username,
      phone,
      password // Không mã hóa password
    });

    await newUser.save();

    res.json({ message: 'Đăng ký thành công!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Tài khoản không tồn tại!' });
    }

    // Kiểm tra mật khẩu
    if (user.password !== password) {
      return res.status(400).json({ message: 'Sai mật khẩu!' });
    }

    res.json({ message: 'Đăng nhập thành công!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server!' });
  }
});

export default router;