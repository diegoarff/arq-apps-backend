import ApiError from '../utils/ApiError.js';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import ApiResponse from '../utils/ApiResponse.js';
import { ZodError } from 'zod';

export const errorHandler = (err, req, res, next) => {
	if (err instanceof ZodError) {
		ApiResponse(res, {
			code: httpStatus.BAD_REQUEST,
			message: 'Validation Error.',
		});
	}

	if (err instanceof mongoose.Error)
		ApiResponse(res, { code: httpStatus.BAD_REQUEST, message: 'Bad request.' });

	if (err instanceof ApiError)
		ApiResponse(res, { code: err.statusCode, message: err.message });

	ApiResponse(res, {
		code: httpStatus.INTERNAL_SERVER_ERROR,
		message: 'Internal Server Error.',
	});
};
