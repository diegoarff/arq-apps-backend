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
	const rating = await ratingService.createRating();
	ApiResponse(res, {
		data: rating,
		message: httpMessages.CREATE,
		code: httpStatus.OK,
	});
});

const updateRating = catchAsync(async (req, res, next) => {
	ApiResponse(res, {
		data: {},
		message: httpMessages.FETCH,
		code: httpStatus.UPDATE,
	});
});

const deleteRating = catchAsync(async (req, res, next) => {
	ApiResponse(res, {
		message: httpMessages.FETCH,
		code: httpStatus.DELETE,
	});
});

const ratingController = {
	// getAllRatings,
	createRating,
	updateRating,
	deleteRating,
};

export default ratingController;
