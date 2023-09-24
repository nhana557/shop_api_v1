import db from '../connection.js'

export default class CategoryModel {
    async add({
        id,
        name,
        smallImage,
        mediumImage,
        image,
        status
    }) {
        try {
            const result = await db.query(`
            INSERT INTO categorys(id, name, smallImage, mediumImage, image, status) VALUES ($1, $2, $3,$4, $5, $6)
            `, [id, name, smallImage, mediumImage, image, status])
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
        smallImage,
        mediumImage,
        image,
        status
    }) {
        try {
            const result = await db.query(`
                UPDATE categorys SET name=$1, smallImage=$2, mediumImage=$3, image=$4, status=$5 WHERE id=$6
            `, [
                name,
                smallImage,
                mediumImage,
                image,
                status,
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

