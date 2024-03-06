import { Router } from 'express';
import { auth } from '../middlewares/index.js';

const router = Router();

router.use(auth());

router.route('/').post();

router.route('/:id').put().delete();

export default router;
