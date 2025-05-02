import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Lấy danh sách tất cả user (ẩn mật khẩu)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Ẩn trường password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi lấy danh sách user.' });
  }
});

export default router;