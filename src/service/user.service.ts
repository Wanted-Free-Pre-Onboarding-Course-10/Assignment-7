import { getConnection, Repository } from "typeorm";
import { User } from "../entity/user";

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getConnection().getRepository(User);
    }

    async findUserByUsername(username: string) {
        const user = await this.userRepository
            .findOne({ where: { username } });
        return user;
    }

    async createUser(createUserInfo) {
        const { username } = createUserInfo;
        const exUser = await this.userRepository
            .findOne({ where: { username } });
        if (exUser) {
            return { exUser: exUser, newUser: undefined };
        }
        const newUser = await this.userRepository.save(createUserInfo);
        return { exUser: undefined, newUser: newUser };
    }
}
