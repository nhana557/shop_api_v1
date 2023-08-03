import winston from 'winston'
import config from '../config/config.js'

const enumumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack })
    }
    return info
})

const logger = winston.createLogger({
    level: config.env === 'development' ? "debug" : "info",
    format: winston.format.combine(
        enumumerateErrorFormat(),
        config.env === "development" ? winston.format.colorize() : winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level}: ${message}`)
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ['error'],
        }),
    ],
})

export default logger;