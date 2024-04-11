import httpStatus from 'http-status';
import httpMessages from './httpMessages.js';
import ApiError from './ApiError.js';

const verifyAuth = (req, id) => {
	const userId = req.user.id || req.user._id;
	if (String(userId) !== String(id))
		throw new ApiError(httpMessages.CANNOT_MODIFY, httpStatus.UNAUTHORIZED);
};

export default verifyAuth;
