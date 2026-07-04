import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";

dotenv.config();

const app: Application = express();

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Taskflow API is running",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      tasks: "/api/tasks",
    },
  });
});

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.send({
    success: true,
    message: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Handle 404
app.use((_req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: "Route not found",
  });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`API: http://localhost:${PORT}`);
});

export default app;
