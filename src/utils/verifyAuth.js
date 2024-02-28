import httpStatus from 'http-status';
import httpMessages from './httpMessages.js';
import ApiError from './ApiError.js';

const verifyAuth = (req, id) => {
	if (req.user.id !== id)
		throw new ApiError(httpMessages.CANNOT_MODIFY, httpStatus.UNAUTHORIZED);
};

export default verifyAuth;
