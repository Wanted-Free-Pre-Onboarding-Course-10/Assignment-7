import express, { Router } from 'express';
// import swaggerUi from 'swagger-ui-express';
// import YAML from 'yamljs';
import path from 'path';
import { authRouter } from './auth.router';


const router: Router = express.Router();
// const swaggerSpec = YAML.load(path.join(__dirname, '../../../build/swagger.yaml'))
// router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
router.use('/auth', authRouter);

export const applicationRouter: Router = router;