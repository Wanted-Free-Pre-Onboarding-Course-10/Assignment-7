import express, { Router } from 'express';
// import swaggerUi from 'swagger-ui-express';
// import YAML from 'yamljs';
import { authRouter } from './auth.router';
import { tireRouter } from './tire.router'


const router: Router = express.Router();
// const swaggerSpec = YAML.load(path.join(__dirname, '../../../build/swagger.yaml'))
// router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
router.use('/auth', authRouter);
router.use('/tires', tireRouter);

export const applicationRouter: Router = router;