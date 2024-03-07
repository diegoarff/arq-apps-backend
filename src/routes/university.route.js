import { Router } from 'express';
import { validate, auth } from '../middlewares/index.js';
import { universityController } from '../controllers/index.js';
import {
	teacherSchema,
	universitySchema,
	subjectSchema,
	updateUniversitySchema,
} from '../validations/index.js';
const router = Router();

router
	.route('/')
	.get(universityController.getAllUniversities)
	.post(
		auth(),
		validate(universitySchema),
		universityController.createUniversity
	);

router.use(auth());

router
	.route('/:id')
	.get(universityController.getUniversityById)
	.put(validate(updateUniversitySchema), universityController.updateUniversity)
	.delete(universityController.deleteUniversity);

router
	.route('/:id/teachers')
	.get(universityController.getTeachersByUniversity)
	.post(validate(teacherSchema), universityController.createTeacher);

router
	.route('/:id/subjects')
	.get(universityController.getSubjectsByUniversity)
	.post(validate(subjectSchema), universityController.createSubject);

export default router;
