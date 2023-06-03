import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './shared/logger'

const DbConnection = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('database connection 🔥')
    //
    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })

    //
  } catch (err) {
    errorLogger.error(`bad connection failed ${err}`)
  }
}

DbConnection()
