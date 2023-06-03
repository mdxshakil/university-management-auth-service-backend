import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

async function dbConnect() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Db Connected 💾')

    app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port} 🚀`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect', error)
  }
}

dbConnect()
