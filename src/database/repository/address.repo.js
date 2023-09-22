import { v4 as uuidv4 } from 'uuid';
import { errorResponse } from '../../lib/utils/response.js';

import { AddressModel } from '../model/index.js';

export default class AddressRepository {
    constructor() {
        this.dbAccess = new AddressModel;
    }

    async add(input) {
        const newAddress = await this.dbAccess.add({ id: uuidv4(), ...input })
        if (!newAddress) return errorResponse(400, 'Insert address failed')
        return newAddress.rows
    }

    async update(input) {
        const newAddress = await this.dbAccess.update(input.address, input.id)

        if (!newAddress) {
            return errorResponse(400, "failed update address")
        }
        return newAddress
    }

    async findAddressById(id) {
        const { rows, rowCount } = await this.dbAccess.get(id)
        if (rowCount < 1) return { error: "address not found" }
        return { rows }
    }
}
