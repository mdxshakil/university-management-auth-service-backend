import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server
async function dbConnect() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Db Connected 💾')

    server = app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port} 🚀`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect', error)
  }

  //terminate server gracefully after any unhandled rejection occurs
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

dbConnect()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
