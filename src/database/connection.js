import pools from 'pg';
import logger from "../config/logger.js"
import config from '../config/config.js'

const { Pool } = pools

const db = new Pool({
    user: config.postgresql.username,
    host: config.postgresql.host,
    database: config.postgresql.database,
    password: config.postgresql.password,
    port: config.postgresql.port
})

db.connect((err) => {
    if (err) {
        logger.error(err.message);
        process.exit()
    }
    logger.info(`Connected to DB: ${config.postgresql.database}`)
})

export default db;
