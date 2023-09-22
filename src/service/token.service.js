import moment from 'moment';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import tokenTypes from '../config/token.js';
import { TokenRepository, UserRepository } from '../database/repository/index.js'

export default class TokenService {
    constructor() {
        this.Token = new TokenRepository;
        this.User = new UserRepository;
    }

    generateToken(
        userId,
        expires,
        type,
        secret = config.jwt.secret
    ) {
        const payload = {
            userId,
            type,
            iat: moment().unix(),
            exp: expires.unix(),
        }

        return jwt.sign(payload, secret)
    }

    async saveToken(
        token,
        userId,
        expires,
        type,
    ) {
        const tokenData = await this.Token.create({
            token,
            user_id: userId,
            expires,
            type
        });
        return tokenData;
    }

    async verifyToken(token, type) {
        const payload = jwt.verify(token, config.jwt.secret)
        const tokenData = await this.Token.findToken(token, type, payload.userId)
        if (!tokenData) {
            throw new Error('Token not found')
        }
        return tokenData
    }

    async generateAuthTokens(user) {
        const accessTokenExpires = moment().add(1, 'days')
        const accessToken = this.generateToken(user, accessTokenExpires, tokenTypes.ACCESS);

        const refreshTokenExpires = moment().add(30, 'days')
        const refreshToken = this.generateToken(user, refreshTokenExpires, tokenTypes.REFRESH)
        await this.saveToken(refreshToken, user, refreshTokenExpires, tokenTypes.REFRESH)

        return {
            access: {
                token: accessToken,
                expires: accessTokenExpires.toDate()
            },
            refresh: {
                token: refreshToken,
                expires: refreshTokenExpires.toDate()
            }
        }
    }

    async generateResetPasswordToken(email) {
        const user = await this.User.findByEmail(email);
        if (!user) {
            throw new Error('No users found with this email')
        }
        const expires = moment().add(30, "minutes")
        const resetPasswordToken = this.generateToken(
            user.user_id,
            expires,
            tokenTypes.RESET_PASSWORD
        )

        await this.saveToken(
            resetPasswordToken,
            user.user_id,
            expires,
            tokenTypes.RESET_PASSWORD
        )

        return resetPasswordToken
    }

    async generateVerifyEmail(user) {
        const expires = moment().add(30, 'minutes');
        const verifyEmailToken = this.generateToken(
            user,
            expires,
            tokenTypes.VERIFY_EMAIL
        );

        await this.saveToken(
            verifyEmailToken,
            user,
            expires,
            tokenTypes.VERIFY_EMAIL
        )
        return verifyEmailToken;
    }
}