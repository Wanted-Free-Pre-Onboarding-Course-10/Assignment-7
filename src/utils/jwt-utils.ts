import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export class Jwt {
    private secret;

    constructor() {
        this.secret = process.env.TOKEN_SECRET_KEY;
    }

    public accessSign(user): Promise<any> {
        const payload = {
            id: user.id,
        };
        return jwt.sign(payload, this.secret, {
            expiresIn: "30m",
        });
    }

    public accessVerify(access_token: string) {
        let decoded = null;
        try {
            decoded = jwt.verify(access_token, this.secret);
            return {
                ok: true,
                id: decoded.id,
            };
        } catch (error) {
            return {
                ok: false,
                message: error.message,
            };
        }
    }
}
