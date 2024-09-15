import { User } from '../models/userModel';

export class UserService {
    public async listUsers() {
        return User.findAll();
    }

    public async getUser(id: number) {
        return User.findByPk(id);
    }

    public async createUser(name: string) {
        return User.create({ name });
    }
}
