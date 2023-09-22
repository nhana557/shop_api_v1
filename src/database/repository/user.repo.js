import { v4 as uuidv4 } from 'uuid';
import { hashing } from '../../lib/utils/bcrypt.js';
import { errorResponse } from '../../lib/utils/response.js';

import { UserModel } from '../model/index.js';

const dbAccess = new UserModel;

export default class CustomerRepository {
    async CreateUser(inputData, store_id) {
        const { rowCount } = await dbAccess.getEmail(inputData.email)
        if (rowCount) {
            return { error: "email already" }
        }
        return await dbAccess.add({
            id: uuidv4(),
            ...inputData,
            store_id: inputData.role === 'seller' ? store_id : '',
            password: await hashing(inputData.password)
        })

    }

    async findByEmail(email) {
        const { rows: [data] } = await dbAccess.getEmail(email)
        return data
    }

    async findById(id) {
        const { rows: [data] } = await dbAccess.getId(id);
        return data

    }

    async verifyEmail(id) {
        const result = await dbAccess.verify(id)
        if (!result) return errorResponse(400, 'failed Update');
        return result
    }

    async updatePhoto(id, image) {
        return await dbAccess.updateImg(id, image)

    }

    async updateProfile(data) {
        const result = await dbAccess.update(data);
        if (!result) return errorResponse(400, 'update failed')
        return result
    }

    async updatePassword(userId, password) {
        const result = await dbAccess.updatePass(userId, password)
        if (!result) return errorResponse(400, 'update password failed')
        return result;
    }
}
