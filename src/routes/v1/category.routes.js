import express from 'express'
import makeCallback from '../../lib/utils/handleCb.js';
import { categoryController } from '../../controller/index.js'
const router = express.Router()

router
    .get('/listAll', makeCallback(categoryController.getList))
    .post('/add', makeCallback(categoryController.insert))
    .put('/update/:id', makeCallback(categoryController.update))
    .delete('/remove/:id', makeCallback(categoryController.remove))

export default router;