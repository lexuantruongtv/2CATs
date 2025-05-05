import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// Route POST cho đăng ký
router.post('/', registerUser);

// Route POST cho đăng nhập
router.post('/', loginUser);

// Route GET để trả về danh sách tất cả người dùng
router.get('/', getAllUsers);

export default router;