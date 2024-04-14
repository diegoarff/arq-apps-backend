import httpStatus from 'http-status';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import httpMessages from '../utils/httpMessages.js';

const getUserById = async (userId) => {
	return await User.findById(userId);
};

const getUserByUsername = async (username) => {
	return await User.findOne({ username });
};

const createUser = async (userBody) => {
	if (await getUserByUsername(userBody.username)) {
		throw new ApiError('Username already taken', httpStatus.BAD_REQUEST);
	}
	return await User.create(userBody);
};

const queryUsers = async (filter, options) => {
	return await User.paginate(filter, options);
};

const updateUserById = async (userId, updateBody) => {
	const user = await getUserById(userId);

	if (updateBody.username && user) {
		const username = await getUserByUsername(updateBody.username);
		if (!user) {
			throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
		} else if (username) {
			throw new ApiError('Username already taken', httpStatus.BAD_REQUEST);
		}
		Object.assign(user, updateBody);
		console.log(user);
		console.log(updateBody);
		await user.save();
		return user;
	}
};

const deleteUserById = async (userId) => {
	const user = await getUserById(userId);
	if (!user) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	await user.deleteOne();
	return user;
};

const banUserById = async (user, admin) => {
	if (user && admin.role === 'admin') {
		user.banned = !user.banned;
		await user.save();
		return user;
	} else if (!user) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	} else if (user && admin.role !== 'admin') {
		throw new ApiError(httpMessages.CANNOT_MODIFY, httpStatus.UNAUTHORIZED);
	}
};

const userService = {
	createUser,
	queryUsers,
	getUserById,
	getUserByUsername,
	deleteUserById,
	updateUserById,
	banUserById,
};

export default userService;
