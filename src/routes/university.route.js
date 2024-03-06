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

router.use(auth());

router
	.route('/')
	.get(universityController.getAllUniversities)
	.post(validate(universitySchema), universityController.createUniversity);

router
	.route('/:id')
	.get(universityController.getUniversityById)
	.put(validate(updateUniversitySchema), universityController.updateUniversity)
	.delete(universityController.deleteUniversity);

router
	.route('/:universityId/teachers')
	.get(universityController.getTeachersByUniversity)
	.post(validate(teacherSchema), universityController.createTeacher);

router
	.route('/:universityId/subjects')
	.get(universityController.getSubjectsByUniversity)
	.post(validate(subjectSchema), universityController.createSubject);

export default router;
