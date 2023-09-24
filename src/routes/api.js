import express from 'express'
import auth from './v1/auth.routes.js'
import category from './v1/category.routes.js'

const router = express.Router()

router
    .use('/auth', auth)
    .use('/category', category)


export default router;