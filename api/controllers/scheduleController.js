import User from '../models/scheduleModel.js';

export const createSchedule = async (req, res) => {
    try {
    const { title, time, description,priority } = req.body;
    // Kiểm tra xem người dùng đã tồn tại
    const existingTime = await Schedule.findOne({ time });
    if (existingTime) {
      return res.status(400).json({ message: 'Thời gian này đã có một sự kiện khác!' });
    }

    const newSchedule = new Schedule({ title, time, description,priority });

    // Lưu người dùng vào database
    await newSchedule.save();

    res.status(201).json({ message: 'Tạo lịch thành công! 🐱🎉' });
  } catch (err) {
    res.status(500).json({ message: ` ${err.message}` });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Kiểm tra người dùng có tồn tại không
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
    }

    // Kiểm tra mật khẩu
    if (password !== user.password) {
      return res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
    }

    res.json({ message: 'Đăng nhập thành công! 🐱🎉' });
  } catch (err) {
    res.status(500).json({ message: ` ${err.message}` });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();  // lấy toàn bộ user trong MongoDB
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: '❌ Có ai trong đây đâu, đăng ký đi' });
  }
};