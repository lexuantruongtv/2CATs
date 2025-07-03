
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js';
import scheduleRoutes from './routes/scheduleRoutes.js';

dotenv.config();
connectDB();



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀✅ Server đang chạy trên cổng ${PORT}`));
