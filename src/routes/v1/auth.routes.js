import express from 'express'

import makeCallback from '../../lib/utils/handleCb.js';

import { authController } from '../../controller/index.js';

const router = express.Router()

router
    .post('/register', makeCallback(authController.signUp))
    .post('/login', makeCallback(authController.signIn))
    .post('/logout', makeCallback(authController.logOut))
    .post('/verify-email', makeCallback(authController.activationEmail))
    .post('/refresh-token', makeCallback(authController.refreshToken))

export default router;