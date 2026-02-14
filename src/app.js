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

app.get("/hello", (req, res) => {
  res.send("hello world");
});

export default app;
