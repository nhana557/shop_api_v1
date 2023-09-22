import { v4 as uuidv4 } from 'uuid'
import { CategoryModel } from '../model/index.js'

const Model = new CategoryModel()
export default class CategoryRepository {

    async insert(input) {
        return await Model.add(uuidv4(), input)
    }
}