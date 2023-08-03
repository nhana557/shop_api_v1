import dotenv from 'dotenv';
import Joi from "joi";

dotenv.config()

const envSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid("production", "development", "test").required(),
        PORT: Joi.number().default(5500),
        DB_USERNAME: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_PASSWORD: Joi.required(),
        DB_PORT: Joi.number().required(),
        SECRET_KEY_JWT: Joi.string().required().default("secret adalah rahasia"),
        REFRESH_SECRET_KEY_JWT: Joi.string().required().default("secret adalah rahasia"),
        API_FRONTEND: Joi.string().required(),
        EMAIL_PASS: Joi.string().required(),
        EMAIL_FROM: Joi.string().required(),
        EMAIL_HOST: Joi.string().required(),
        EMAIL_PORT: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        REDIRECT_URI: Joi.string().required(),
        DRIVE_REFRESH_TOKEN: Joi.string().required(),
        MSG_QUEUE_URL: Joi.string().required(),
        EXCHANGE_NAME: Joi.string().required(),
        MIDTRANS_SERVERKEY: Joi.string().required(),
        MIDTRANS_CLIENTKEY: Joi.string().required()
    })
    .unknown()

const { value: envVar, error } = envSchema.prefs({
    errors: { label: "key" },
}).validate(process.env)


if (error) throw Error(`config validator error: ${error.message}`)

export default {
    env: envVar.NODE_ENV,
    port: envVar.PORT,
    msgBroker: envVar.MSG_QUEUE_URL,
    nameXchange: envVar.EXCHANGE_NAME,
    postgresql: {
        username: envVar.DB_USERNAME,
        host: envVar.DB_HOST,
        database: envVar.DB_DATABASE,
        password: envVar.DB_PASSWORD,
        port: envVar.DB_PORT
    },
    jwt: {
        secret: envVar.SECRET_KEY_JWT
    },
    email: {
        smpt: {
            host: envVar.EMAIL_HOST,
            port: envVar.EMAIL_PORT,
            auth: {
                user: envVar.EMAIL_USER,
                pass: envVar.EMAIL_PASS
            },
        },
        from: envVar.EMAIL_FROM
    },
    snap: {
        serverKey: envVar.MIDTRANS_SERVERKEY,
        clientKey: envVar.MIDTRANS_CLIENTKEY
    }
}