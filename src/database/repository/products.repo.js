import { v4 as uuidv4 } from 'uuid'
import { ProductModel } from '../model/index.js'

const Model = new ProductModel()
export default class ProductsRepository {

    async insert(input) {
        const newData = {
            id: uuidv4(),
            ...input
        }
        const newProducts = await Model.add(newData)
        if (newProducts.rowCount === 0) {
            throw new Error('inset Products failed')
        }
        return newProducts;
    }

    async update(input, id) {
        const newData = {
            id,
            ...input
        }
        const newProducts = await Model.update(newData)
        if (newProducts.rowCount === 0) {
            throw new Error('update Products failed')
        }
        return newProducts;
    }

    async getList() {
        return await Model.get()
    }

    async destroy(id) {
        return await Model.delete(id)
    }
}