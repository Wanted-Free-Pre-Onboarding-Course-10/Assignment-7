import { Response, NextFunction } from 'express';
import { DecodedRequest } from '../definition/decoded_jwt';
import { TireService } from '../service/tire.service';
import { TrimService } from '../service/trim.service';
import { UserService } from '../service/user.service';
export class TireController {

    private tireService: TireService;
    private trimService: TrimService;
    private userSerivce: UserService;

    public async get(req: DecodedRequest, res: Response, next: NextFunction) {
        const { username, trimId } = req.body;
    }

    public async post(req: DecodedRequest, res: Response, next: NextFunction) {
        const trimList = req.body;
        this.trimService = new TrimService();
        this.tireService = new TireService();
        this.userSerivce = new UserService();
        await this.userSerivce.checkExUserByUsername(trimList)
        const newTrimList = await this.trimService.findTrimById(trimList);
        const apiData = await this.tireService.getDataFromCardoc(newTrimList);
        return res.json(1);
    }
}