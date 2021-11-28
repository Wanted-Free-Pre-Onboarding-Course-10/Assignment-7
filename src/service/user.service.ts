import { getConnection, QueryRunner, Repository } from "typeorm";
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
        const { email } = createUserInfo;
        const user = await this.userRepository
            .findOne({ where: { email: email } });
        if (user) {
            return { exUser: user, newUser: undefined };
        }
        const newUser = await this.userRepository.save(createUserInfo);
        return { exUser: undefined, newUser: newUser };
    }
}
