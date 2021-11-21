import { Router } from 'express';

import AuthRoutes from 'api/auth/auth.routes';

const router: Router = Router();

router.get('/test', (req, res) => {
    res.send('hello world');
});

router.use('/auth', AuthRoutes);

export default router;

