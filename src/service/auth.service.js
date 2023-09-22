import httpStatus from 'http-status'
import tokenTypes from '../config/token.js'
import TokenService from './token.service.js'
import {
    UserRepository,
    TokenRepository
} from "../database/repository/index.js"
import { errorResponse } from '../lib/utils/response.js'
import { matchPassword } from '../lib/utils/bcrypt.js'


export default class AuthService {
    constructor() {
        this.Token = new TokenRepository();
        this.User = new UserRepository();
        this.TokenService = new TokenService()
    }

    async loginWithEmailAndPass(email, password) {
        const user = await this.User.findByEmail(email);
        if (!user || !(await matchPassword(password, user.password))) {
            return errorResponse(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
        }
        return user;
    }

    async logout(refreshToken) {
        const data = await this.TokenService.verifyToken(refreshToken, tokenTypes.REFRESH)
        if (!data) {
            return errorResponse(httpStatus.NOT_FOUND, 'Not found');
        }

        await this.Token.destroy(data.user_id);
    }

    async refreshAuth(refreshToken) {
        const dataToken = await this.TokenService.verifyToken(refreshToken, tokenTypes.REFRESH)

        const user = await this.User.findById(dataToken.user_id)
        if (!dataToken || !user) {
            return errorResponse(httpStatus.NOT_FOUND, 'Not found');
        }

        await this.Token.destroy(dataToken.user_id)
        return this.TokenService.generateAuthTokens(user.id)
    }

    async resetPassword(resetPassToken, newPassword) {
        const resetPassData = await this.TokenService.verifyToken(resetPassToken, tokenTypes.RESET_PASSWORD)
        const user = await this.User.findById(resetPassData.user_id)
        if (!resetPassData || !user) {
            return errorResponse(httpStatus.NOT_FOUND, 'Not found');
        }

        await this.User.updatePassword(user.id, newPassword)
        await this.Token.destroy(resetPassData.user_id)
    }

    async verifyEmail(verifyEmailToken) {
        const verifyEmailTokenData = await this.Token.findToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL)
        const user = await this.User.findById(verifyEmailTokenData.user_id)

        if (!user) {
            return errorResponse(httpStatus.NOT_FOUND, 'Not found')
        }

        await this.Token.destroy(user.id, tokenTypes.VERIFY_EMAIL)
        await this.User.verifyEmail(user.id)
    }
}
