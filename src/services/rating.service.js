import { Rating } from '../models/index.js';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import httpMessages from '../utils/httpMessages.js';
import { subjectService, teacherService } from './index.js';

const createRating = async (ratingBody) => {
	/*
        user: "5f5b9e6e5c3e2b2b0c5e3b4a",
        subject: "5f5b9e6e5c3e2b2b0c5e3b4a",
        value: 5,
        teacher: "5f5b9e6e5c3e2b2b0c5e3b4a",
    */
	const subject = await subjectService.getSubjectById(ratingBody.subject);
	const teacher = await teacherService.getTeacherById(ratingBody.teacher);

	if (!subject)
		throw new ApiError('Subject does not exist.', httpStatus.NOT_FOUND);

	if (!teacher)
		throw new ApiError('Teacher does not exist.', httpStatus.NOT_FOUND);

	if (subject.teachers.every((teacher) => teacher.id !== ratingBody.teacher))
		throw new ApiError(
			'Teacher does not teach this subject.',
			httpStatus.BAD_REQUEST
		);

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
	await rating.deleteOne();
};

const ratingService = {
	createRating,
	updateRating,
	deleteRating,
};

export default ratingService;
