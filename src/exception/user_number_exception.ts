import { HttpException } from "./http_exception";

export class UserNumberException extends HttpException {
    constructor(number: number) {
        super(400, ` People ${number} `);
    }
}
