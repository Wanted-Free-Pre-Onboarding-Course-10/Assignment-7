import express, { Request, Response, Router, NextFunction } from 'express';

const router: Router = express.Router();

router.post('/tires', async (req: Request, res: Response, next: NextFunction) => {

});

router.get('/tires', async (req: Request, res: Response, next: NextFunction) => {

});

export const authRouter: Router = router;