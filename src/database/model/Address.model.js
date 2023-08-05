import db from '../connection.js'

export default class AddressModel {
    constructor(id) {
        this.id = id;
    }
    add(address, user_id) {
        return new Promise((resolve, reject) => {
            db.query(`
            INSERT INTO address(id, address, user_id) VALUES($1, $2, $3)
            `,
                [
                    this.id,
                    address,
                    user_id
                ],
                (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                }
            )
        })
    }
    update(address, user_id) {
        return new Promise((resolve, reject) => {
            db.query(`
            UPDATE address SET address = $1 WHERE user_id = $2
            `,
                [
                    address,
                    user_id
                ],
                (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                }
            )
        })
    }
    get(user_id) {
        return new Promise((resolve, reject) => {
            db.query(`
            SELECT * FROM address WHERE user_id = $1
            `,
                [
                    user_id
                ],
                (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                }
            )
        })
    }
}

