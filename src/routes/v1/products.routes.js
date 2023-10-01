import express from 'express'
import makeCallback from '../../lib/utils/handleCb.js';
import { productsController } from '../../controller/index.js'
const router = express.Router()

router
    .get('/listAll', makeCallback(productsController.getList))
    .post('/add', makeCallback(productsController.insert))
    .put('/update/:id', makeCallback(productsController.update))
    .delete('/remove/:id', makeCallback(productsController.remove))

export default router;