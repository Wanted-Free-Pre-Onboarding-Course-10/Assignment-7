import { HttpException } from "./http_exception";

export class TireInfoException extends HttpException {
    constructor(trimId: string) {
        super(400, ` ${trimId} TireInfo Invalid`);
    }
}