import db from '../connection.js'

export default class PaymentModel {
    async add(input) {
        try {
            const { id, paying } = input
            const result = await db.query(`insert into payment values($1, $2)`, [id, paying])
            return result;
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }

    async get() {
        try {
            return await db.query("SELECT * FROM payment")
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }

    async update(input) {
        try {
            const { paying, id } = input
            return await db.query(`UPDATE payment SET paying=$1 WHERE id=$2`, [paying, id])

        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            return await db.query(`DELETE FROM payment WHERE id=$1`, [id])
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }
}
