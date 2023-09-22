import { CategoryRepository } from "../database/repository/index.js";

export default class CategoryService {
    constructor() {
        this.Category = new CategoryRepository;
    }

    async create(input) {
        const { rowCount } = await this.Category.insert(input)
        if (!rowCount) return {
            error: 'create category failed'
        }
    }
}