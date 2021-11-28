import { Response, NextFunction } from "express"
import { Jwt } from "../utils/jwt-utils";
import { DecodedRequest } from "../definition/decoded_jwt";
import { AuthException } from '../exception/auth_exception'

export const authJwt = (req: DecodedRequest, res: Response, next: NextFunction) => {
    const jwt = new Jwt();
    const access_token = req.cookies.authorization;
    const result = jwt.accessVerify(access_token);
    if (result.ok) {
        req.decodedId = result.id;
        next();
    } else {
        throw new AuthException("Unauthorized");
    }
};
