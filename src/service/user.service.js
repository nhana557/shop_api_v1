// import { deleteDrive, uploadGoogleDrive } from "../lib/utils/index.js";
import { UserRepository, AddressRepository } from "../database/repository/index.js";

export default class CustomerService {
    constructor() {
        this.User = new UserRepository;
        this.Address = new AddressRepository
    }

    async create(input) {
        const data = await this.User.CreateUser(input)
        console.log(data)
        return data
    }

    async Profile(id) {
        return await this.User.findById(id);
    }

    async updateProfile(input, id) {
        await this.User.updateProfile({ ...input, id })
        const user = await this.User.findById(id);
        delete user.password
        return user
    }

    async addAddress(input, id) {
        return await this.Address.add({ ...input, user_id: id })
    }

    async updateAddress(input, id) {
        return await this.Address.update({ ...input, user_id: id })
    }

    async address(id) {
        return await this.Address.findAddressById(id)
    }
}
