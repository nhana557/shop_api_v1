import nodemailer from 'nodemailer'
import config from '../config/config.js'
import logger from '../config/logger.js'
import templateEmail from '../lib/email/templateEmail.js'

const transport = nodemailer.createTransport(config.email.smpt)

if (config.env !== 'test') {
    transport
        .verify()
        .then(() => logger.info('Connected to email server'))
        .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'))
}

export default class EmailService {
    async sendEmail(to, subject, html) {
        const msg = { from: config.email.from, to, subject, html };
        await transport.sendMail(msg);
    }

    async sendVerificationEmail(to, token) {
        const subject = 'Email Verification';
        const verificationEmailUrl = `http://localhost:${config.port}/v1/auth/verify-email?token=${token}`;
        const html = templateEmail(verificationEmailUrl)
        await this.sendEmail(to, subject, html);
    }

    async sendResetPasswordEmail(to, token) {
        const subject = 'Email Reset Password';
        const verificationEmailUrl = `http://localhost:${config.port}/v1/auth/verify-email?token=${token}`;
        const html = templateEmail(verificationEmailUrl)
        await this.sendEmail(to, subject, html);
    }

}
