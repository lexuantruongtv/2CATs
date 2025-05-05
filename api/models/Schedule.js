
import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  time: String
});

export default mongoose.model('Schedule', scheduleSchema);
