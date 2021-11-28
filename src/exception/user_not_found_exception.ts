import { HttpException } from "./http_exception";

export class UserNotFoundException extends HttpException {
    constructor(username: string) {
        super(404, ` User ${username} not found`);
    }
}