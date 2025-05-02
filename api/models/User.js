
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  phone: String,
  password: String
});

export default mongoose.model('User', userSchema);