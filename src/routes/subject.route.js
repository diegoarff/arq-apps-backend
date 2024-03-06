import { Router } from 'express';
import { validate, auth } from '../middlewares/index.js';
import { updateSubjectSchema, postSchema } from '../validations/index.js';
import { subjectController } from '../controllers/index.js';

const router = Router();

router.use(auth());

router.route('/').get(subjectController.getSubjects);

router
	.route('/:id')
	.get(subjectController.getSubjectById)
	.put(validate(updateSubjectSchema), subjectController.updateSubjectById)
	.delete(subjectController.deleteSubjectById);

router
	.route('/:subjectId/posts')
	.get(subjectController.getSubjectPosts)
	.post(validate(postSchema), subjectController.createPost);

router.get('/:id/teachers', subjectController.getTeachersBySubject);

// router.route('/subject/:subject_id').get(postController.getPostBySubject);

export default router;
