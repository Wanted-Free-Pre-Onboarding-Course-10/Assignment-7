import { HttpException } from "./http_exception";

export class TrimNotFoundException extends HttpException {
    constructor(trimId: string) {
        super(404, ` TrimId ${trimId} not found`);
    }
}