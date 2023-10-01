import { ServiceCrud } from '../service/index.js'
import { ProductsRepository } from '../database/repository/index.js'
import { successResponse } from '../lib/utils/response.js';
import httpStatus from 'http-status';

const dbAccess = new ServiceCrud(ProductsRepository);

const insert = async (req) => {
    const newData = {
        ...req.body
    }

    await dbAccess.create(newData)

    return successResponse({ msg: "success add product" }, httpStatus.CREATED)
}

const getList = async (req) => {
    const data = await dbAccess.getList()

    return successResponse(data.rows)
}

const update = async (req) => {
    const { id } = req.params

    await dbAccess.update({ ...req.body }, id)

    return successResponse({ msg: "success update product" })
}

const remove = async (req) => {
    await dbAccess.remove(req.params.id)

    return successResponse({ msg: "success removed product" })
}

export default {
    insert,
    getList,
    update,
    remove
}