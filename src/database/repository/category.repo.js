import { v4 as uuidv4 } from 'uuid'
import { CategoryModel } from '../model/index.js'

const Model = new CategoryModel()
export default class CategoryRepository {

    async insert(input) {
        const newData = {
            id: uuidv4(),
            ...input
        }
        const newCategory = await Model.add(newData)
        if (!newCategory) {
            throw new Error('inset category failed')
        }
        return newCategory;
    }

    async update(input, id) {
        const newData = {
            id,
            ...input
        }
        const newCategory = await Model.update(newData)
        if (newCategory.rowCount === 0) {
            throw new Error('update category failed')
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