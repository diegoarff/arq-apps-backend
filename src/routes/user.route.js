import { Router } from 'express';
import { auth } from '../middlewares/index.js';
import { userController } from '../controllers/index.js';
const router = Router();

router.use(auth);

router.route('/').put(userController.updateUserById);
router.route('/:user').get(userController.getUserWithNumberOfPost);
router.route('/ban/:user').put(userController.banUserById);

export default router;
