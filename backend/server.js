import app from "./src/app.js";
import dbConnected from "./src/configs/db.config.js";
import logger from "./src/utils/logger.util.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await dbConnected();

    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Server failed to start", { error: error.message });
    process.exit(1);
  }
}

startServer();
