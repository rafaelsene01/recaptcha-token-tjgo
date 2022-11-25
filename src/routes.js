import { Router } from 'express';

import ReCaptcha from './controllers/ReCaptcha';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Server On' }));
routes.post('/', ReCaptcha.store);

export default routes;
