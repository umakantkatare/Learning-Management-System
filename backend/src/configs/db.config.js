import mongoose from "mongoose";
import logger from "../utils/logger.util.js";

const URL = process.env.MONGO_URI;

async function dbConnected() {
  try {
    if (!URL) {
      throw new Error("MONGO_URI is not defined");
    }

    const database = await mongoose.connect(URL);

    logger.info("Database connected successfully", {
      host: database.connection.host,
      name: database.connection.name,
    });

    return database;
  } catch (error) {
    logger.error("DB connection error", {
      message: error.message,
      stack: error.stack,
    });

    process.exit(1);
  }
}

export default dbConnected;
