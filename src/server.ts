import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server

const DbConnection = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('database connection 🔥')
    //
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })

    //
  } catch (err) {
    errorLogger.error(`bad connection failed ${err}`)
  }

  process.on('unhandledRejection', error => {
    errorLogger.error('unhandled Rejection detected on closing server😡')
    // console.log('unhandled Rejection detected on closing server😡')
    if (server) {
      server.close(error => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

DbConnection()

process.on('SIGINT', () => {
  logger.info('SIGINT is received')
  if (server) {
    server.close()
  }
})
