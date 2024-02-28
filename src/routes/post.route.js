import { Router } from 'express';
import { validate, auth } from '../middlewares/index.js';
import { postSchema } from '../validations/index.js';
import { postController } from '../controllers/index.js';

const router = Router();

router.use(auth());

router.route('/').post(validate(postSchema), postController.createPost);

export default router;
