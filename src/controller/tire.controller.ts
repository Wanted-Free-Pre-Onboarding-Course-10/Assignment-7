import { Response, NextFunction } from 'express';
import { DecodedRequest } from '../definition/decoded_jwt';
import { TireService } from '../service/tire.service';
import { TrimService } from '../service/trim.service';
export class TireController {

    private tireService: TireService;
    private trimService: TrimService;

    public async get(req: DecodedRequest, res: Response, next: NextFunction) {
        const { username, trimId } = req.body;
    }

    public async post(req: DecodedRequest, res: Response, next: NextFunction) {
        const trimList = req.body;
        this.trimService = new TrimService();
        this.tireService = new TireService();
        const data = await this.trimService.findTrimById(trimList);
        const apiData = await this.tireService.getDataFromCardoc(data);
        return res.json(1);
    }
}