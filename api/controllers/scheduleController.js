import User from '../models/scheduleModel.js';

export const createSchedule = async (req, res) => {
    try {
    const { title, time, description } = req.body;
    // Kiểm tra xem người dùng đã tồn tại
    const existingTime = await Schedule.findOne({ time });
    if (existingTime) {
      return res.status(400).json({ message: 'Thời gian này đã có một sự kiện khác!' });
    }

    const newSchedule = new Schedule({ title, time, description });

    // Lưu người dùng vào database
    await newSchedule.save();

    res.status(201).json({ message: 'Tạo lịch thành công! 🐱🎉' });
  } catch (err) {
    res.status(500).json({ message: ` ${err.message}` });
  }
};
export const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, time, description} = req.body;

    // Tìm lịch trình theo ID
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Không tìm thấy lịch trình!' });
    }

    // Nếu thời gian thay đổi, kiểm tra trùng lặp
    if (time && time !== schedule.time.toISOString()) {
      const existingTime = await Schedule.findOne({ time, _id: { $ne: id } });
      if (existingTime) {
        return res.status(400).json({ message: 'Thời gian này đã có một sự kiện khác!' });
      }
    }

    // Cập nhật thông tin
    schedule.title = title || schedule.title;
    schedule.time = time || schedule.time;
    schedule.description = description || schedule.description;
    
    await schedule.save();

    res.status(200).json({ message: 'Cập nhật lịch trình thành công! 📝✅' });
  } catch (err) {
    res.status(500).json({ message: ` ${err.message}` });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSchedule = await Schedule.findByIdAndDelete(id);
    if (!deletedSchedule) {
      return res.status(404).json({ message: 'Không tìm thấy lịch trình để xoá!' });
    }

    res.status(200).json({ message: 'Xoá lịch trình thành công! 🗑️❌' });
  } catch (err) {
    res.status(500).json({ message: ` ${err.message}` });
  }
};

export const getSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Không tìm thấy lịch trình!' });
    }

    res.status(200).json(schedule);
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