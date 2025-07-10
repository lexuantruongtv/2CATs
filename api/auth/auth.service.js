const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Account = require("../models/account.model");

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";

  const register = async ({ username, phone, password }) => {
    const exists = await Account.findOne({ username });
    if (exists) throw new Error("User đã tồn tại");
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const acc = new Account({
      username,
      phone,
      password : hashedPassword,
      schedules: [],
    });
  
  await acc.save();
  return { message: "User đăng ký thành công" };
};

const login = async ({ username, password }) => {
  const acc = await Account.findOne({ username }).select("+password");
  if (!acc) {
    throw new Error("Sai Username hoặc Mật khẩu");
  }

  const isMatch = await bcrypt.compare(password, acc.password);
  if (!isMatch) {
    throw new Error("Sai Username hoặc Mật khẩu");
  }

  const token = jwt.sign({ username: acc.username }, SECRET_KEY, { expiresIn: "1h" });
  return { token };
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { register, login, verifyToken };