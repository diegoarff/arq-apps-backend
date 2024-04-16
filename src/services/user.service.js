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

const banUserById = async (user) => {
	user.banned = !user.banned;
	await user.save();
	return user;
};

const getUserWithNumberOfPost = async (user) => {
	const query = await User.aggregate([
		{ $match: { _id: user._id } },
		{
			$lookup: {
				from: 'posts',
				localField: '_id',
				foreignField: 'user',
				as: 'posts',
			},
		},
		{
			$addFields: {
				numberOfPosts: { $size: '$posts' },
			},
		},
		{
			$project: {
				posts: 0,
				password: 0,
			},
		},
	]);
	return query;
};

const userService = {
	createUser,
	queryUsers,
	getUserById,
	getUserByUsername,
	deleteUserById,
	updateUserById,
	banUserById,
	getUserWithNumberOfPost,
};

export default userService;
