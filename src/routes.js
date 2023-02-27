import { Router } from 'express';

import ReCaptcha from './controllers/ReCaptcha';

const routes = new Router();

routes.get('/', ReCaptcha.store);

export default routes;
