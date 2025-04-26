
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String
});

const User = mongoose.model('User', userSchema);

const scheduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  time: String
});

export default mongoose.model('Schedule', scheduleSchema);
