import db from '../connection.js'

export default class ProductModel {
    async add({ id, name, stock, price, category_id, store_id, image, description }) {
        try {
            const result = await db.query(`INSERT INTO products
            (id, name,  stock, price, category_id,  description, image, store_id)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
                [
                    id,
                    name,
                    stock,
                    price,
                    category_id,
                    description,
                    image,
                    store_id
                ])
        } catch (error) {
            throw new Error(`Failed to insert product: ${error.message}`);

        }
    }

    async update({ id, name, stock, price, category_id, image, description, merk }) {
        try {
            const result = await db.query(`UPDATE products SET name=$1, stock=$2, price=$3, image=$4 ,description=$5, 
            category_id=$6, merk=$7  WHERE id=$8`,
                [
                    name,
                    stock,
                    price,
                    image,
                    description,
                    category_id,
                    merk,
                    id,
                ])
            return result
        } catch (error) {
            throw new Error(`Failed to update product: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            await db.query(`DELETE FROM products WHERE id=$1`, [id])
        } catch (error) {
            throw new Error(`Failed to delete product: ${error.message}`);

        }
    }

    async get() {
        try {
            const result = await db.query(`SELECT * FROM products`)
            return result;
        } catch (error) {
            throw new Error(`Failed to get product: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const result = await db.query(`SELECT * FROM products WHERE id=$1`, [id])
            return result
        } catch (error) {
            throw new Error(`Failed to get product: ${error.message}`);
        }
    }

    async countData() {
        return db.query('SELECT COUNT(*) FROM products')
    }
}
