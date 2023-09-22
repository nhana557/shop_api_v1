import httpStatus from 'http-status';
import {
    successResponse,
    errorResponse,
} from '../lib/utils/response.js'
import { UserRepository } from '../database/repository/index.js';
import {
    AuthService,
    EmailService,
    TokenService
} from '../service/index.js';

const dbAccess = new UserRepository;
const authService = new AuthService;
const emailService = new EmailService;
const tokenService = new TokenService;

const signUp = async (req) => {
    const { data, error } = await dbAccess.CreateUser(req.body)
    if (error) {
        return errorResponse(httpStatus.UNAUTHORIZED, error)
    }
    const token = await tokenService.generateVerifyEmail(data.id)
    await emailService.sendVerificationEmail(data.email, token)
    delete data.password
    return successResponse({ message: "Success register please check Email to activate account", token, data }, httpStatus.CREATED)
}

const signIn = async (req) => {
    const { email, password } = req.body
    const user = await authService.loginWithEmailAndPass(email, password)
    if (user.statusCode) {
        return errorResponse(httpStatus.UNAUTHORIZED, user.body.message)
    }
    const token = await tokenService.generateAuthTokens(user.id)
    delete user.password
    return successResponse({ user, token })
}

const logOut = async (req) => {
    await authService.logout(req.body.refreshToken);

    return successResponse({}, httpStatus.NO_CONTENT);
}

const refreshToken = async (req) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    if (tokens.statusCode) {
        return errorResponse(httpStatus.UNAUTHORIZED, tokens.body.message)
    }
    return successResponse(tokens)
}

const activationEmail = async (req) => {
    const tokens = await authService.verifyEmail(req.query.token);
    console.log(tokens)
    if (tokens?.statusCode) {
        return errorResponse(httpStatus.UNAUTHORIZED, tokens.body.message)
    }
    return successResponse({}, httpStatus.NO_CONTENT);
}

export default {
    activationEmail,
    logOut,
    refreshToken,
    signIn,
    signUp,
}