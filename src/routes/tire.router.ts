import express, { Response, Router, NextFunction } from 'express';
import { DecodedRequest } from '../definition/decoded_jwt'
import { TireController } from '../controller/tire.controller'

const router: Router = express.Router();
const controller: TireController = new TireController();
router.post('/info', async (req: DecodedRequest, res: Response, next: NextFunction) => {
    controller.post(req, res, next);
});

router.get('/list', async (req: DecodedRequest, res: Response, next: NextFunction) => {
    controller.get(req, res, next);
});

export const tireRouter: Router = router;