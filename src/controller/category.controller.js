import { CategoryService } from '../service/index.js'

const dbAccess = new CategoryService;

const insertCategory = async (req, res) => {
    const name = req.body.name;
    const result = await dbAccess.create(name)
    return res.status(201).send({ msg: 'success add category', result })
}

export default {
    insertCategory
}