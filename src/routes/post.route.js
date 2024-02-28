import { Router } from 'express';
import { validate, auth } from '../middlewares/index.js';
import { commentSchema } from '../validations/index.js';
import { postController } from '../controllers/index.js';

const router = Router();

router.use(auth());

// router.route('/').post(validate(postSchema), postController.createPost);

router
	.route('/:postId/comments')
	.get(postController.getPostComments)
	.post(validate(commentSchema), postController.createComment);

export default router;
