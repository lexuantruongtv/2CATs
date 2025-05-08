import express from 'express';
import { createSchedule, updateSchedule, deleteSchedule, getSchedule } from '../controllers/scheduleController.js';

const router = express.Router();

// Route POST tạo lịch trình
router.post('/create', createSchedule);

// Route POST sửa lịch trình
router.post('/update', updateSchedule);

// Route POST xóa lịch trình
router.post('/delete', deleteSchedule);

// Route GET trả về các lịch trình
router.get('/get', getSchedule);

export default router;