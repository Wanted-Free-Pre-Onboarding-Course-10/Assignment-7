import { fail } from "assert";
import { getConnection, Repository } from "typeorm";
import { User } from "../entity/user";
import { ERROR_MESSAGE } from '../exception/message'

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

    async checkExUserByUsername(userList): Promise<any> {
        for (let i = 0; i < userList.length; i++) {
            const username = userList[i].id;
            const exUser = await this.userRepository
                .findOne({ where: { username } });
            // if (!exUser) {
            //     return {
            //         user: username,
            //         message: ERROR_MESSAGE.USER_NOT_FOUND_EXCEPTION
            //     };
            // }
        }
        return {
            message: "SUCCESS"
        }
    }

    async createUser(createUserInfo): Promise<any> {
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
