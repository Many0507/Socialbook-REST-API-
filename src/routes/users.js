import {
	findAllUsers,
	findOneUser,
	createUser,
	updateUser,
	deleteUser,
	loginUser
} from '../controllers/users.controller';
import { Router } from 'express';
const router = Router();

router.get('/', findAllUsers);
router.get('/:id', findOneUser);
router.post('/', createUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
