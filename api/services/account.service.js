const Account = require("../models/account.model");
const crypto = require("crypto");

const createAccount = async ({ username, phone, password }) => {
  const exists = await Account.findOne({ username });
  if (exists) throw new Error("User đã tồn tại");

  const acc = new Account({
    username,
    phone,
    password,
    schedules: [],
  });

  return acc.save();
};

const getAccount = async (username) => {
  return Account.findOne({ username });
};

const deleteAccount = async (username) => {
  return Account.deleteOne({ username });
};

const addSchedule = async (username, { title, datetime, description }) => {
  const acc = await Account.findOne({ username });
  if (!acc) throw new Error("Không tìm thấy User");

  if (!title || title.trim() === "") throw new Error("Tiêu đề trống");

  const id = crypto.createHash("md5").update(title + description).digest("hex");

  if (acc.schedules.some((tx) => tx.id === id)) {
    throw new Error("Lịch trình đã tồn tại");
  }

  const schedule = { id, title, datetime, description };
  acc.schedules.push(schedule);

  await acc.save();
  return schedule;
};

const deleteSchedule = async (username, id) => {
  const acc = await Account.findOne({ username });
  if (!acc) throw new Error("Không tìm thấy User");

  const index = acc.schedules.findIndex((tx) => tx.id === id);
  if (index === -1) throw new Error("Không tìm thấy lịch trình");

  const [removed] = acc.schedules.splice(index, 1);

  await acc.save();
};

const updateSchedule = async (username, id, { title, datetime, description }) => {
  const acc = await Account.findOne({ username });
  if (!acc) throw new Error("Không tìm thấy User");

  const index = acc.schedules.findIndex((tx) => tx.id === id);
  if (index === -1) throw new Error("Không tìm thấy lịch trình");

  if (title !== undefined) acc.schedules[index].title = title;
  if (datetime !== undefined) acc.schedules[index].datetime = datetime;
  if (description !== undefined) acc.schedules[index].description = description;

  await acc.save();
  return acc.schedules[index];
};

module.exports = {
  createAccount,
  getAccount,
  deleteAccount,
  addSchedule,
  deleteSchedule,
  updateSchedule,
};