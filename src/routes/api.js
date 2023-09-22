import express from 'express'
import auth from './v1/category.routes.js'

const router = express.Router()

router
    .use('/auth', auth)


export default router;