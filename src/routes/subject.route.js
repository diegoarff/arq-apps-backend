import { Router } from 'express';
import { validate, auth } from '../middlewares/index.js';
import { subjectSchema, updateSubjectSchema } from '../validations/index.js';
import { subjectController } from '../controllers/index.js';

const router = Router();

router.use(auth());

router
	.route('/')
	.get(subjectController.getSubjects)
	.post(validate(subjectSchema), subjectController.createSubject);

router
	.route('/:id')
	.get(subjectController.getSubjectById)
	.put(validate(updateSubjectSchema), subjectController.updateSubjectById)
	.delete(subjectController.deleteSubjectById);

export default router;
