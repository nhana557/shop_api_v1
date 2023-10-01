import express from 'express'
import auth from './v1/auth.routes.js'
import category from './v1/category.routes.js'
import products from './v1/products.routes.js'

const router = express.Router()

router
    .use('/auth', auth)
    .use('/category', category)
    .use('/products', products)


export default router;