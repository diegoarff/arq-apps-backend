import httpStatus from 'http-status';
import { ratingService } from '../services/index.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import httpMessages from '../utils/httpMessages.js';

/* const getAllRatingsByTeacher = catchAsync (async (req, res, next) => {
    const ratings = await ratingService.getAllRatingsBySubjectIdAndTeacherId(req.params.subjectId, req.params.teacherId)
    
    ApiResponse(res, {
		data: [],
		message: httpMessages.FETCH,
		code: httpStatus.OK,
	})
}) */

const createRating = catchAsync(async (req, res, next) => {
	const rating = await ratingService.createRating(req);
	ApiResponse(res, {
		data: rating,
		message: httpMessages.CREATE,
		code: httpStatus.CREATED,
	});
});

const updateRating = catchAsync(async (req, res, next) => {
	const rating = await ratingService.updateRating(req.params.id, req.body);
	ApiResponse(res, {
		data: rating,
		message: httpMessages.UPDATE,
		code: httpStatus.OK,
	});
});

const deleteRating = catchAsync(async (req, res, next) => {
	const rating = await ratingService.deleteRating(req.params.id);
	ApiResponse(res, {
		data: rating,
		message: httpMessages.DELETE,
		code: httpStatus.OK,
	});
});

const ratingController = {
	// getAllRatings,
	createRating,
	updateRating,
	deleteRating,
};

export default ratingController;
