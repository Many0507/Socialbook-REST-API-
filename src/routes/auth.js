import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
const router = Router();

router.get('/', verifyToken, (req, res) => {
	res.send('auth');
});

export default router;
