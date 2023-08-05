import db from '../connection.js'


export default class UserModel {
    async add(data) {
        try {
            const { id, email, password, fullname, role, verify, store_id } = data
            const result = await db.query(
                `INSERT INTO users(id, email, password, fullname, role, verify, status, store_id)
                VALUES($1, $2, $3, $4, $5, $6, 'active', $7)`,
                [id, email, password, fullname, role, verify || false, store_id || null])
            return result;
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }

    }

    async getEmail(email) {
        try {
            const result = await db.query(`SELECT * FROM users WHERE email='${email}'`)
            return result
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);

        }
    }

    async getId(id) {
        try {
            const result = await db.query(`SELECT * from users WHERE id= $1`, [id])
            return result
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);

        }
    }

    async verify(id) {
        try {
            await db.query(`UPDATE users SET verify=true WHERE id = $1`, [id])
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }

    async updatePass(id, pass) {
        try {
            const result = await db.query(`UPDATE users SET password=$1 WHERE id = $2`, [id, pass])
            return result;
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }

    async update(input) {
        try {
            const { phonenumber, gender, fullname, id } = input
            const result = await db.query(`UPDATE users SET fullname = $1, phonenumber = $2, gender=$3 WHERE id=$4`,
                [
                    fullname,
                    phonenumber,
                    gender,
                    id
                ])
            return result;
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }

    async updateImg(id, image) {
        try {
            const result = await db.query(`UPDATE users SET image=$1 WHERE id=$2`,
                [
                    image,
                    id
                ])
            return result;
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }
}
