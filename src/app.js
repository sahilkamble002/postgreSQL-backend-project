import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoute.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/auth", authRoutes);

// error handler (must be after routes)
app.use((err, req, res, next) => {
  const statusCode = err.status || err.StatusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    statusCode,
    message,
    errors: err.error || [],
  });
});

export default app;
