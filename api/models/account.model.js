const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  id: String,
  title: String,
  datetime: String,
  description: String,
});

const accountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password:  {type: String, required: true},
  schedules: [scheduleSchema],
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;