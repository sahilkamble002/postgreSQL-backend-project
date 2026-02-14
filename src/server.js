import dotenv from "dotenv";
import app from "./app.js";
import { connectDB, disconnectDB } from "./config/db.config.js";

dotenv.config({ 
    path: "./.env" 
});

const PORT = process.env.PORT || 5001;

let server;

// Start server only after DB connects
const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (error) => {
  console.error("Uncaught Exception:", error);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown (Ctrl + C)
process.on("SIGINT", async () => {
  console.log("SIGINT received. Shutting down...");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
