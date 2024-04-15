import { userService } from '../services/index.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import httpMessages from '../utils/httpMessages.js';
import httpStatus from 'http-status';

const updateUserById = catchAsync(async (req, res, next) => {
	const user = await userService.updateUserById(req.user.id, req.body);
	ApiResponse(res, {
		data: user,
		message: httpMessages.UPDATE,
		code: httpStatus.OK,
	});
});

const banUserById = catchAsync(async (req, res, next) => {
	const admin = req.user;
	const user = await userService.getUserById(req.params.user);
	if (!admin || !user) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	if (admin.role !== 'admin') {
		throw new ApiError(httpMessages.CANNOT_MODIFY, httpStatus.UNAUTHORIZED);
	}
	const bannedUser = await userService.banUserById(user);
	ApiResponse(res, {
		data: bannedUser,
		message: bannedUser.banned ? httpMessages.BAN : httpMessages.UNBANNED,
		code: httpStatus.OK,
	});
});

const userController = {
	updateUserById,
	banUserById,
};

export default userController;
