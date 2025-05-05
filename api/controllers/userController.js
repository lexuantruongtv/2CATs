import User from '../models/User.js';

const register = async (req, res) => {
  const { username, phone, password } = req.body;

  try {
    // Kiểm tra xem người dùng đã tồn tại
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
    }

    const newUser = new User({ username, phone, password });

    // Lưu người dùng vào database
    await newUser.save();

    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kiểm tra người dùng có tồn tại không
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
    }

    // Kiểm tra mật khẩu
    if (password !== user.password) {
      return res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
    }

    res.json({ message: 'Đăng nhập thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại' });
  }
};

export { register, login };