
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

// Fallback to 5000 only for local development
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
  
    await connectDB();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1); 
  }
};

startServer();
