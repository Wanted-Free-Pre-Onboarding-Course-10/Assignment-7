import { getConnection, Repository } from "typeorm";
import { User } from "../entity/user";

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getConnection().getRepository(User);
    }

    async findUserByEmail(email: string) {
        const user = await this.userRepository
            .findOne({ where: { email: email } });
        return user;
    }

    async createUser(createUserInfo) {
        const { user } = createUserInfo;
        const exUser = await this.userRepository
            .findOne({ where: { user: user } });
        if (exUser) {
            return { exUser: exUser, newUser: undefined };
        }
        const newUser = await this.userRepository.save(createUserInfo);
        return { exUser: undefined, newUser: newUser };
    }
}
