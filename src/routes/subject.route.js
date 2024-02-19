import { Router } from 'express';
import { validate } from '../middlewares/index.js';
import { subjectSchema } from '../validations/index.js';
import { subjectController } from '../controllers/index.js';

const router = Router();

router
	.route('/')
	.get(subjectController.getSubjects)
	.post(validate(subjectSchema), subjectController.createSubject);

router
	.route('/:id')
	.get(subjectController.getSubjectById)
	.put(validate(subjectSchema), subjectController.updateSubjectById)
	.delete(subjectController.deleteSubjectById);

export default router;
