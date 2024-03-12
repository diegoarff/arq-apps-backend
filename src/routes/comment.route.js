import { Router } from 'express';
import { validate, auth } from '../middlewares/index.js';
import commentController from '../controllers/comment.controller.js';
import { updateCommentSchema } from '../validations/comment.validation.js';

const router = Router();

router.use(auth);

router
	.route('/:id')
	.put(validate(updateCommentSchema), commentController.updateCommentById)
	.delete(commentController.deleteCommentById);

export default router;
