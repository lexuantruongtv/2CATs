import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
//import swaggerUi from 'swagger-ui-express';
//import swaggerSpec from './config/swagger.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger UI
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Check or Base API info
app.get("/api", (req, res) => {
    res.json({
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      author: pkg.author,
    });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/schedules', scheduleRoutes);

app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
});

// Global Error Handler (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀✅ Server running on port ${PORT}`));
