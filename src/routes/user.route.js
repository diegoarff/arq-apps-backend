import { Router } from 'express';
import { auth } from '../middlewares/index.js';
import { userController } from '../controllers/index.js';
const router = Router();

router.use(auth);

router.route('/:id').put(userController.updateUserById);

router.route('/ban/:admin/:user').put(userController.banUserById);

export default router;
