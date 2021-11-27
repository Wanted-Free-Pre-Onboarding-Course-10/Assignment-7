import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exception/http_exception'
import { AuthException } from '../exception/auth_exception';
import { Jwt } from "../jwt-util/jwt-utils";
import passport from "passport";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { UserService } from "../service/user.service";
dotenv.config();

export class AuthController {
    private userService: UserService;
    private jwtutils: Jwt;

    public async signup(req: Request, res: Response, next: NextFunction): Promise<any> {
        this.userService = new UserService();
        const { username, password } = req.body;
        const encryptedPassword = await bcrypt.hashSync(password, +process.env.SALT_ROUNDS);
        try {
            const { exUser, newUser } = await this.userService.createUser({ username, password: encryptedPassword });
            if (exUser) {
                next(new HttpException(400, "User duplicated"));
            }
            else {
                const userInfo = {
                    id: newUser.id,
                    email: newUser.email
                }
                res.status(200).json({
                    result: true,
                    userInfo: userInfo,
                    message: "Signup successful",
                });
            }
        }
        catch (error) {
            next(new HttpException(400, error.message));
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction): Promise<any> {
        await res.clearCookie('authorization')
        return res.status(200).json({
            message: "logout",
        });
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        passport.authenticate("local", async (authError, userId, info) => {
            this.userService = new UserService();
            this.jwtutils = new Jwt();
            if (authError || userId == false) {
                return next(new HttpException(400, "User Invaild"));

            }
            const accessToken = this.jwtutils.accessSign(userId);
            res.cookie("authorization", accessToken, {
                maxAge: 60000 * 30,
                httpOnly: true,
            });
            return res.status(200).json({
                message: "Success Login ",
            });
        })(req, res, next);
    }
}