import db from '../connection.js'


export default class TokenModel {
    async add(input) {
        try {
            const result = await db.query(
                `INSERT INTO tokens
                (id, user_id, type, expires, token, blacklist) 
                VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    input.id,
                    input.user_id,
                    input.type,
                    input.expires,
                    input.token,
                    input.blacklist || false,
                ])
            return result;
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }

    async get(token, type, userId) {
        try {
            const result = await db.query(
                `SELECT * FROM tokens WHERE token=$1 OR user_id=$2 OR type=$3 AND blacklist = false`,
                [token, userId, type])
            return result
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }

    async removeTokenMany(userId, type = '') {
        try {
            await db.query(`DELETE FROM tokens WHERE user_id=$1 OR type=$2`, [userId, type])
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }
}
