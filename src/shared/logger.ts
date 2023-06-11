import winston, { format } from 'winston'
import path from 'path'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, label, printf } = format

// custom format functions
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hours = date.getDate()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${date.toDateString()} [${hours}:${minutes}:${seconds}] [${label}] ${level}: ${message}`
})

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Masud Rana' }),
    timestamp(),
    myFormat
    // prettyPrint()
  ),

  transports: [
    new winston.transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success',
        'UM-%DATE%-success.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

const errorLogger = winston.createLogger({
  level: 'error',
  format: combine(label({ label: 'Masud Rana' }), timestamp(), myFormat),

  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({
    //   filename: path.join(
    //     process.cwd(),
    //     'logs',
    //     'winston',
    //     'errors',
    //     'UM-%DATE%-error.log'
    //   ),
    //   level: 'error',
    // }),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'UM-%DATE%-error.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { logger, errorLogger }
