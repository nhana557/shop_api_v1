export default class CategoryService {
    constructor(model) {
        this.Model = new model;
    }

    async create(input) {
        return await this.Model.insert(input)
    }

    async getList() {
        return await this.Model.getList()
    }

    async update(input, id) {
        const newData = {
            ...input,
            id
        }
        return await this.Model.update(newData)
    }

    async remove(id) {
        return await this.Model.destroy(id)
    }
}