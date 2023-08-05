import db from '../connection.js'

export default class CategoryModel {

    async add(id, name) {
        try {
            const result = await db.query(`
            INSERT INTO categorys(id, name) VALUES ($1, $2)
            `, [id, name])
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

    async update(name, id) {
        try {
            const result = await db.query(`
                UPDATE categorys SET name=$1 WHERE id=$2
            `, [name, id])
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
    async countData(id) {
        try {
            const result = await db.query(`
                SELECT COUNT(*) FROM categorys
            `, [id])
            return result
        } catch (error) {
            throw new Error(`Failed to get cart items: ${error.message}`);
        }
    }
}

