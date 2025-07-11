const express = require("express");
const router = express.Router();
const controller = require("../controllers/account.controller");
const auth = require("../middlewares/auth");

//router.post("/accounts", controller.create);
//router.get("/accounts/:user", controller.get);
//router.delete("/accounts/:user", controller.delete);
//router.post("/accounts/:user/schedules", controller.addSchedule);
//router.delete("/accounts/:user/schedules/:id", controller.deleteSchedule);

//module.exports = router;

//const express = require("express");
//const router = express.Router();
//const controller = require("../controllers/account.controller");

//---------------------------------------------------------------
//Sử dụng Swagger

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Tạo tài khoản mới
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, phone, password]
 *             properties:
 *               username:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo tài khoản thành công
 *       400:
 *         description: Lỗi tạo tài khoản
 */
//router.post("/accounts", controller.create);
router.post("/accounts", auth, controller.create);

/**
 * @swagger
 * /accounts/{username}:
 *   get:
 *     summary: Lấy thông tin tài khoản
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username của tài khoản
 *     responses:
 *       200:
 *         description: Thông tin tài khoản
 *       404:
 *         description: Không tìm thấy tài khoản
 */
//router.get("/accounts/:username", controller.get);
router.get("/accounts/:username", auth, controller.get);
/**
 * @swagger
 * /accounts/{username}:
 *   delete:
 *     summary: Xóa tài khoản
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username của tài khoản
 *     responses:
 *       204:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy tài khoản
 */
//router.delete("/accounts/:username", controller.delete);
router.delete("/accounts/:username", auth, controller.delete);
/**
 * @swagger
 * /accounts/{username}/schedules:
 *   post:
 *     summary: Thêm lịch trình mới cho tài khoản
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username của tài khoản
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, datetime]
 *             properties:
 *               title:
 *                 type: string
 *               datetime:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Thêm lịch trình thành công
 *       400:
 *         description: Lỗi thêm lịch trình
 */
//router.post("/accounts/:username/schedules", controller.addSchedule);
router.post("/accounts/:username/schedules", auth, controller.addSchedule);
/**
 * @swagger
 * /accounts/{username}/schedules/{id}:
 *   delete:
 *     summary: Xóa lịch trình của tài khoản
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username của tài khoản
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID lịch trình
 *     responses:
 *       204:
 *         description: Xóa lịch trình thành công
 *       404:
 *         description: Không tìm thấy lịch trình
 */
//router.delete("/accounts/:username/schedules/:id", controller.deleteSchedule);
router.delete("/accounts/:username/schedules/:id", auth, controller.deleteSchedule);
/**
 * @swagger
 * /accounts/{username}/schedules/{id}:
 *   patch:
 *     summary: Cập nhật lịch trình của tài khoản
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username của tài khoản
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID lịch trình
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               datetime:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Lỗi cập nhật lịch trình
 */
//router.patch("/accounts/:username/schedules/:id", controller.updateSchedule);
router.patch("/accounts/:username/schedules/:id", auth, controller.updateSchedule);

/**
 * @swagger
 * /accounts/change-password:
 *   put:
 *     summary: Đổi mật khẩu người dùng hiện tại
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
 *       400:
 *         description: Lỗi đổi mật khẩu
 *       401:
 *         description: Chưa đăng nhập hoặc token không hợp lệ
 */

router.put("/accounts/change-password", auth, controller.changePassword);

module.exports = router;
