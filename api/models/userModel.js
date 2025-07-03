import mongoose from 'mongoose';
import scheduleSchema from '../models/scheduleModel.js';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  schedule: [scheduleSchema],
});

const User = mongoose.model('User', userSchema);
export default User;