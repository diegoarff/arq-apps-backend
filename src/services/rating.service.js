import { Rating } from '../models/index.js';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import httpMessages from '../utils/httpMessages.js';

const createRating = async (ratingBody) => {
	/*
        user: "5f5b9e6e5c3e2b2b0c5e3b4a",
        subject: "5f5b9e6e5c3e2b2b0c5e3b4a",
        value: 5,
        teacher: "5f5b9e6e5c3e2b2b0c5e3b4a",
    */
	const rating = await Rating.create(ratingBody);
	return rating;
};

const updateRating = async (ratingId, ratingBody) => {
	const rating = await Rating.findById(ratingId);
	if (!rating) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	Object.assign(rating, ratingBody);
	await rating.save();
	return rating;
};

const deleteRating = async (ratingId) => {
	const rating = await Rating.findById(ratingId);
	if (!rating) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	await rating.remove();
};

const ratingService = {
	createRating,
	updateRating,
	deleteRating,
};

export default ratingService;
