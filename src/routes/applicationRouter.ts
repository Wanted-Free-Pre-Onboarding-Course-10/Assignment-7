import express, { Router } from 'express';
import { authRouter } from './auth.router';
import { tireRouter } from './tire.router'
import { authJwt } from "../middlewares/auth.middleware";

const router: Router = express.Router();

router.use('/cardoc/auth', authRouter);
router.use('/cardoc/tires', authJwt, tireRouter);

export const applicationRouter: Router = router;