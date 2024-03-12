import { Router } from 'express';
import { auth } from '../middlewares/index.js';
import { teacherController } from '../controllers/index.js';

const router = Router();

router.use(auth);

router
	.route('/:id')
	.get(teacherController.getTeacherById)
	.put(teacherController.updateTeacher)
	.delete(teacherController.deleteTeacher);

export default router;
