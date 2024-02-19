import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { userService } from '../services/index.js';

const login = async (username, password) => {
	const user = userService.getUserByUsername(username);
	if (!user && user.comparePassword(password))
		throw new ApiError(
			'Username or password incorrect',
			httpStatus.UNAUTHORIZED
		);
	return user;
};

const changePassword = async (userId, password) => {
	const user = userService.getUserById(userId);
	if (!user) {
		throw new ApiError('Username not found', httpStatus.NOT_FOUND);
	}
	user.password = password;
	await user.save();
	return user;
};

const authService = {
	login,
	changePassword,
};

export default authService;
