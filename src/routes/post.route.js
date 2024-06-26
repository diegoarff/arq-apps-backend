import { Router } from 'express';
import { validate, auth } from '../middlewares/index.js';
import { commentSchema, updatePostSchema } from '../validations/index.js';
import { postController } from '../controllers/index.js';

const router = Router();

router.use(auth);

// router.route('/').post(validate(postSchema), postController.createPost);

router
	.route('/:id')
	.get(postController.getPostById)
	.put(validate(updatePostSchema), postController.updatePost)
	.delete(postController.deletePost);

router.route('/admin/:id').delete(postController.deleteByAdmin);

router
	.route('/:id/comments')
	.get(postController.getPostComments)
	.post(validate(commentSchema), postController.createComment);

export default router;
