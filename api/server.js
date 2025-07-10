const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const accountRoutes = require("./routes/account.routes");
const pkg = require("./package.json");

// 📄 Swagger:
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// Initialize app
const app = express();
const port = process.env.PORT || 5000;

// Kết nối MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger API Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Check hoặc Base API info
app.get("/api", (req, res) => {
  res.json({
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
  });
});

// Main API routes
app.use("/api", accountRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
