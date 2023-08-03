import app from './src/server.js'
import config from './src/config/config.js'
import logger from './src/config/logger.js';


app.listen(config.port, () => {
    logger.info(`server running on port:${config.port}`)
})
