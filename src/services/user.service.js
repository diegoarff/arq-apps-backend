import httpStatus from 'http-status';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

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

// const updateUserById = async (userId, updateBody) => {
// 	const user = await getUserById(userId);
// 	if (!user) {
// 		throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
// 	}
// 	Object.assign(user, updateBody);
// 	await user.save();
// 	return user;
// };

const deleteUserById = async (userId) => {
	const user = await getUserById(userId);
	if (!user) {
		throw new ApiError('User not found', httpStatus.NOT_FOUND);
	}
	await user.deleteOne();
	return user;
};

const userService = {
	createUser,
	queryUsers,
	getUserById,
	getUserByUsername,
	deleteUserById,
};

export default userService;
