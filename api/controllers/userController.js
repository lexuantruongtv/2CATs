import User from '../models/userModel.js';

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     description: Tạo tài khoản người dùng mới với tên đăng nhập, số điện thoại và mật khẩu.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - phone
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Tên đăng nhập đã tồn tại
 *       500:
 *         description: Lỗi server nội bộ
 */
export const registerUser = async (req, res) => {
  try {
    const { username, phone, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
    }

    const newUser = new User({ username, phone, password });
    await newUser.save();

    res.status(201).json({ message: 'Đăng ký thành công! 🐱🎉', user: { username, phone } });
  } catch (err) {
    res.status(500).json({ message: ` ${err.message}` });
  }
};

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     description: Kiểm tra thông tin đăng nhập và trả về thông báo.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Sai tên đăng nhập hoặc mật khẩu
 *       500:
 *         description: Lỗi server nội bộ
 */
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
    }

    res.json({ message: 'Đăng nhập thành công! 🐱🎉' });
  } catch (err) {
    res.status(500).json({ message: ` ${err.message}` });
  }
};

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy danh sách toàn bộ người dùng
 *     description: Trả về danh sách tất cả người dùng đã đăng ký.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   password:
 *                     type: string
 *       500:
 *         description: Lỗi server nội bộ
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: '❌ Có ai trong đây đâu, đăng ký đi' });
  }
};
