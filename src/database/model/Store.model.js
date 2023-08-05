import db from '../connection.js'

export default class StoreModel {
    async add({
        id,
        storeName,
        email,
        phonenumber,
        description
    }) {
        try {
            const result = await db.query(`INSERT INTO stores(
                id, name, email, phone, description, status) 
                VALUES($1, $2, $3, $4, $5, 'active')`,
                [id, storeName, email, phonenumber, description])

            return result
        } catch (error) {
            throw new Error(`Failed to insert store: ${error.message}`);
        }
    }

    async getStore(id) {
        try {
            const result = await db.query(`SELECT * FROM stores WHERE id=$1`, [id])
            return result;
        } catch (error) {
            throw new Error(`Failed to get Store: ${error.message}`);
        }
    }

    async updateImage(link, id) {
        try {
            const result = await db.query(`UPDATE stores SET image= $1 WHERE user_id=$2`, [link, id])
            return result
        } catch (error) {
            throw new Error(`Failed to update image Store: ${error.message}`);
        }
    }

    async update({ id, name, email, phonenumber, description }) {
        try {
            const result = await db.query(`UPDATE stores SET 
                name = $1, description = $2, phone = $3, email = $4
                WHERE user_id = $5 && status = 'active'
                VALUES($1, $2, $3, $4, $5)`,
                [name, description, phonenumber, email, id])

            return result
        } catch (error) {
            throw new Error(`Failed to update store: ${error.message}`);
        }
    }
}