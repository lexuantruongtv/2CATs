
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import scheduleRoutes from './routes/schedules.js';
import userListRoutes from './routes/users.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/schedules', scheduleRoutes);
app.use('/api/user-list', userListRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
