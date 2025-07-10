const service = require("../services/account.service");

exports.create = async (req, res) => {
  try {
    const acc = await service.createAccount(req.body);
    res.status(201).json(acc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  const acc = await service.getAccount(req.params.username);
  if (!acc) return res.status(404).json({ error: "Không tìm thấy User" });
  res.json(acc);
};

exports.delete = async (req, res) => {
  const result = await service.deleteAccount(req.params.username);
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "Không tìm thấy User" });
  }
  res.sendStatus(204);
};

exports.addSchedule = async (req, res) => {
  try {
    const tx = await service.addSchedule(req.params.username, req.body);
    res.status(201).json(tx);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    await service.deleteSchedule(req.params.username, req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const updated = await service.updateSchedule(req.params.username, req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};