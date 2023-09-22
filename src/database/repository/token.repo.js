import { v4 as uuidv4 } from 'uuid'
import { errorResponse } from '../../lib/utils/response.js'

import { TokenModel } from '../model/index.js'

const dbAcces = new TokenModel;

export default class TokenRepository {
    async create(input) {
        return await dbAcces.add({ ...input, id: uuidv4() })
    }
    async findToken(token, type, user) {
        const { rows: [data] } = await dbAcces.get(token, type, user);
        if (!data) return errorResponse(400, 'token not found')
        return data
    }
    async destroy(user, type) {
        await dbAcces.removeTokenMany(user, type)
    }
}