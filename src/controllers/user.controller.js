import { userService } from '../services/index.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import httpMessages from '../utils/httpMessages.js';
import httpStatus from 'http-status';

const updateUserById = catchAsync(async (req, res, next) => {
	const user = await userService.updateUserById(req.params.id, req.body);
	ApiResponse(res, {
		data: user,
		message: httpMessages.UPDATE,
		code: httpStatus.OK,
	});
});

const banUserById = catchAsync(async (req, res, next) => {
	const admin = await userService.getUserById(req.params.admin);
	const user = await userService.getUserById(req.params.user);
	if (!admin || !user) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	const bannedUser = await userService.banUserById(user, admin);
	ApiResponse(res, {
		data: bannedUser,
		message: httpMessages.BAN,
		code: httpStatus.OK,
	});
});

const userController = {
	updateUserById,
	banUserById,
};

export default userController;
