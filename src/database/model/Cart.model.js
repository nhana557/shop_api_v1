import db from '../connection.js'

export default class CartModel {

    async add({ id, product_id, user_id, qty = 1 }) {
        try {
            const result = await db.query(`
                INSERT INTO carts(id, product_id, user_id, qty) VALUES($1, $2, $3, $4)
            `,
                [
                    id,
                    product_id,
                    user_id,
                    qty
                ]
            )

            return result;
        } catch (error) {
            throw new Error(`Failed to add item to cart: ${error.message}`);
        }
    }

    async get({ user_id }) {
        try {
            const result = await db.query(`
                SELECT * FROM carts WHERE user_id = $1
            `, [user_id]);

            return result;
        } catch (error) {
            throw new Error(`Failed to get cart items: ${error.message}`);
        }
    }
    async remove({ user_id, product_id }) {
        try {
            const result = await db.query(`
                DELETE FROM carts WHERE product_id = $1 && user_id=$2
            `, [product_id, user_id]);

            return result;
        } catch (error) {
            throw new Error(`Failed to get cart items: ${error.message}`);
        }
    }
}
