import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { userService, authService } from '../services/index.js';
import httpMessages from '../utils/httpMessages.js';
import ApiResponse from '../utils/ApiResponse.js';

const register = catchAsync(async (req, res) => {
	const user = await userService.createUser(req.body);
	ApiResponse(res, {
		data: user,
		message: httpMessages.REGISTER,
		code: httpStatus.CREATED,
	});
});

const login = catchAsync(async (req, res) => {
	const { username, password } = req.body;
	const user = await authService.login(username, password);
	const token = user.createToken();
	ApiResponse(res, {
		data: { token, user },
		message: httpMessages.LOGIN,
		code: httpStatus.OK,
	});
});

const authController = {
	register,
	login,
};

export default authController;
