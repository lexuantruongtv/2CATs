
import express from 'express';
import Schedule from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const schedules = await Schedule.find();
  res.json(schedules);
});

router.post('/', async (req, res) => {
  const newSchedule = new Schedule(req.body);
  await newSchedule.save();
  res.json(newSchedule);
});

export default router;
