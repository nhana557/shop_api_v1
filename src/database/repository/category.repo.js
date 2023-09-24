import { v4 as uuidv4 } from 'uuid'
import { CategoryModel } from '../model/index.js'
import { errorResponse } from '../../lib/utils/response.js'

const Model = new CategoryModel()
export default class CategoryRepository {

    async insert(input) {
        const newData = {
            id: uuidv4(),
            ...input
        }
        const newCategory = await Model.add(newData)
        if (!newCategory) {
            return errorResponse(400, 'inset category failed')
        }
        return newCategory;
    }

    async update(input, id) {
        const newData = {
            id,
            ...input
        }
        const newCategory = await Model.update(newData)
        if (!newCategory) {
            return errorResponse(400, 'update category failed')
        }
        return newCategory;
    }

    async getList() {
        return await Model.get()
    }

    async destroy(id) {
        return await Model.delete(id)
    }
}