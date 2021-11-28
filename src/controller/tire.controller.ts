import { Response, NextFunction, urlencoded } from 'express';
import { DecodedRequest } from '../definition/decoded_jwt';
import { TireService } from '../service/tire.service';
import { TrimService } from '../service/trim.service';
import { UserService } from '../service/user.service';
import { UserNotFoundException } from '../exception/user_not_found_exception'
import { TireInfoException } from '../exception/tire_info_exception';
import { TrimNotFoundException } from '../exception/trim_not_found_exception';
import { UserNumberException } from '../exception/user_number_exception';
import { ERROR_MESSAGE } from '../exception/message'
export class TireController {

    private tireService: TireService;
    private trimService: TrimService;
    private userSerivce: UserService;

    public async get(req: DecodedRequest, res: Response, next: NextFunction) {
        const { username } = req.body;
        this.userSerivce = new UserService();
        const exUser = await this.userSerivce.findUserByUsername(username);
        if (!exUser)
            return next(new UserNotFoundException(String(username)));
        const userInfo = await this.userSerivce.findUserInfoByUsername(username)
        return res.status(200).json({
            message: "Success",
            data: userInfo
        });
    }

    public async post(req: DecodedRequest, res: Response, next: NextFunction) {
        const trimList = req.body;
        this.trimService = new TrimService();
        this.tireService = new TireService();
        this.userSerivce = new UserService();
        if (trimList.length > 5)
            return next(new UserNumberException(trimList.length));
        const user = await this.userSerivce.checkExUserByUsername(trimList)
        if (user.message == ERROR_MESSAGE.USER_NOT_FOUND_EXCEPTION)
            return next(new UserNotFoundException(String(user.user)));

        const newTrimList = await this.trimService.findTrimById(trimList);

        const apiData = await this.tireService.getDataFromCardoc(newTrimList);
        if (apiData.message == ERROR_MESSAGE.TIRE_IFNO_EXCEPTION)
            return next(new TireInfoException(String(apiData.trimId)));

        if (apiData.message == ERROR_MESSAGE.TRIM_NOT_FOUND_EXCEPTION)
            return next(new TrimNotFoundException(String(apiData.trimId)));

        this.tireService.createTireAndTrim(apiData.data);
        this.tireService.linkTireInfo(apiData.data);
        return res.status(200).json({
            message: "Success"
        });
    }
}