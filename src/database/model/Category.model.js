import db from '../connection.js'

export default class CategoryModel {
    async add({
        id,
        name,
        image
    }) {
        try {
            const result = await db.query(`
            INSERT INTO categorys(id, name, image) VALUES ($1, $2, $3)
            `, [id, name, image])
            return result
        } catch (error) {
            throw new Error(`Failed to get cart items: ${error.message}`);
        }
    }

    async get() {
        try {
            const result = await db.query(`
            SELECT * FROM categorys
            `)
            return result
        } catch (error) {
            throw new Error(`Failed to get cart items: ${error.message}`);
        }
    }

    async update({
        id,
        name,
        image
    }) {
        try {
            const result = await db.query(`
                UPDATE categorys SET name=$1, image=$2 WHERE id=$3
            `, [
                name,
                image,
                id
            ])
            return result
        } catch (error) {
            throw new Error(`Failed to get cart items: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const result = await db.query(`
                DELETE FROM categorys WHERE id=$1
            `, [id])
            return result
        } catch (error) {
            throw new Error(`Failed to get cart items: ${error.message}`);
        }
    }
    async countData() {
        try {
            const result = await db.query(`
                SELECT COUNT(*) FROM categorys
            `, [])
            return result
        } catch (error) {
            throw new Error(`Failed to get cart items: ${error.message}`);
        }
    }
}

