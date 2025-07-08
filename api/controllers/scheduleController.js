import Schedule from '../models/scheduleModel.js';

/**
 * @swagger
 * /api/schedules:
 *   post:
 *     summary: Tạo mới một lịch trình
 *     description: Thêm sự kiện mới với tiêu đề, thời gian và mô tả.
 *     tags:
 *       - Schedules
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - time
 *             properties:
 *               title:
 *                 type: string
 *               time:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo lịch thành công
 *       400:
 *         description: Thời gian đã có sự kiện khác
 *       500:
 *         description: Lỗi server
 */
export const createSchedule = async (req, res) => {
  try {
    const { title, time, description } = req.body;
    const existingTime = await Schedule.findOne({ time });
    if (existingTime) {
      return res.status(400).json({ message: 'Thời gian này đã có một sự kiện khác!' });
    }

    const newSchedule = new Schedule({ title, time, description });
    await newSchedule.save();

    res.status(201).json({ message: 'Tạo lịch thành công! 🐱🎉' });
  } catch (err) {
    res.status(500).json({ message: ` ${err.message}` });
  }
};

/**
 * @swagger
 * /api/schedules/{id}:
 *   put:
 *     summary: Cập nhật lịch trình theo ID
 *     description: Cập nhật thông tin sự kiện dựa vào ID.
 *     tags:
 *       - Schedules
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID lịch trình
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               time:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Trùng thời gian với sự kiện khác
 *       404:
 *         description: Không tìm thấy lịch trình
 *       500:
 *         description: Lỗi server
 */
export const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, time, description } = req.body;

    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Không tìm thấy lịch trình!' });
    }

    if (time && time !== schedule.time.toISOString()) {
      const existingTime = await Schedule.findOne({ time, _id: { $ne: id } });
      if (existingTime) {
        return res.status(400).json({ message: 'Thời gian này đã có một sự kiện khác!' });
      }
    }

    schedule.title = title || schedule.title;
    schedule.time = time || schedule.time;
    schedule.description = description || schedule.description;
    
    await schedule.save();

    res.status(200).json({ message: 'Cập nhật lịch trình thành công! 📝✅' });
  } catch (err) {
    res.status(500).json({ message: ` ${err.message}` });
  }
};

/**
 * @swagger
 * /api/schedules/{id}:
 *   delete:
 *     summary: Xoá lịch trình theo ID
 *     description: Xoá sự kiện theo ID từ database.
 *     tags:
 *       - Schedules
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID lịch trình cần xoá
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xoá thành công
 *       404:
 *         description: Không tìm thấy lịch trình
 *       500:
 *         description: Lỗi server
 */
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

/**
 * @swagger
 * /api/schedules/{id}:
 *   get:
 *     summary: Lấy lịch trình theo ID
 *     description: Trả về thông tin chi tiết của lịch trình theo ID.
 *     tags:
 *       - Schedules
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID lịch trình
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 time:
 *                   type: string
 *                   format: date-time
 *                 description:
 *                   type: string
 *       404:
 *         description: Không tìm thấy lịch trình
 *       500:
 *         description: Lỗi server
 */
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
