import express from 'express'
import createError from 'http-errors'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import Router from './routes/api.js'

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use(helmet())
app.use(morgan('dev'))

app.use('/api/v1', Router)
app.use('/img', express.static('./src/upload'))


app.all('*', (req, res, next) => {
    next(new createError.NotFound())
})
app.use((err, req, res, next) => {
    const messageError = err.message || "internal server error"
    const statusCode = err.status || 500

    return res.status(statusCode).json({
        message: messageError
    })
})


export default app