import db from '../connection.js'

export default class TransaksiModel {
    async get(numberPerPage, startPages, sort, sortby) {
        try {
            const result = await db.query(`SELECT * FROM transaksi ORDER BY $1 $2 LIMIT $3} OFFSET $4`,
                [
                    sortby,
                    sort,
                    numberPerPage,
                    startPages
                ])
            return result
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }

    async getId(id) {
        try {
            const result = await db.query(`SELECT * FROM transakasi WHERE id=$1`, [id])
            return result;
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }

    async countData() {
        return db.query("SELECT COUNT(*) FROM transaksi");
    }

    async add(input) {
        try {
            const { id, transaksi_status, shipping_price, total_price, id_user, id_product, quantity, paymen } = input
            const result = await db.query(`INSERT INTO transaksi (id, transaksi_status, shipping_price, total_price, id_user, id_product, quantity, payment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [
                    id,
                    transaksi_status,
                    shipping_price,
                    total_price,
                    id_user,
                    id_product,
                    quantity,
                    paymen
                ])
            return result
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }

    async update(input) {
        try {
            const { id, transaksi_status, shipping_price, total_price, id_user, id_product, quantity, paymen } = input
            const result = await db.query(`UPDATE transaksi SET transaksi_status = $1, shipping_price = $2, total_price = $3, 
            id_user = $4, id_product=$5, quantity = $6, payment = $7 WHERE id=$8`,
                [
                    transaksi_status,
                    shipping_price,
                    total_price,
                    id_user,
                    id_product,
                    quantity,
                    paymen,
                    id
                ])
            return result
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            await db.query(`DELETE FROM transaksi WHERE id=$1`, [id])
        } catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }
}
