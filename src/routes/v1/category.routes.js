import express from 'express'
import makeCallback from '../../lib/utils/handleCb.js';
import { authController } from '../../controller/index.js'
const router = express.Router()

router
    .post('/register', makeCallback(authController.signUp))

export default router;