import { commentService } from '../services/index.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import httpMessages from '../utils/httpMessages.js';
import httpStatus from 'http-status';
import verifyAuth from '../utils/verifyAuth.js';
import ApiError from '../utils/ApiError.js';

const updateCommentById = catchAsync(async (req, res) => {
	const comment = await commentService.updateCommentById(
		req.params.id,
		req.body
	);

	verifyAuth(req, comment.user);

	ApiResponse(res, {
		data: comment,
		message: httpMessages.UPDATE,
		code: httpStatus.OK,
	});
});

const deleteCommentById = catchAsync(async (req, res) => {
	const comment = await commentService.getCommentById(req.params.id);

	if (!comment) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}

	verifyAuth(req, comment.user);

	await commentService.deleteCommentById(req.params.id);
	ApiResponse(res, {
		data: comment,
		message: httpMessages.DELETE,
		code: httpStatus.OK,
	});
});

const commentController = {
	updateCommentById,
	deleteCommentById,
};

export default commentController;
