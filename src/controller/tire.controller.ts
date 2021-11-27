import { Response, NextFunction } from 'express';
import { DecodedRequest } from '../definition/decoded_jwt';
import { carcodapi } from '../utils/cardocApi';

export class TireController {

    public async get(req: DecodedRequest, res: Response, next: NextFunction) {
        const { username, trimId } = req.body;
    }

    public async post(req: DecodedRequest, res: Response, next: NextFunction) {
        const { username, trimId } = req.body;

        const data = await carcodapi.getApi(trimId);
        console.log(data)
        return res.status(200).json({
            data: data
        });
    }
}