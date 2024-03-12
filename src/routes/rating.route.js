import { Router } from 'express';
import { auth, validate } from '../middlewares/index.js';
import { ratingSchema, updateRatingSchema } from '../validations/index.js';
import { ratingController } from '../controllers/index.js';
// n i g g e r
const router = Router();

router.use(auth);

router.route('/').post(validate(ratingSchema), ratingController.createRating);

router
	.route('/:id')
	.put(validate(updateRatingSchema), ratingController.updateRating)
	.delete(ratingController.deleteRating);

export default router;
