import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import httpMessages from '../utils/httpMessages.js';
import { University } from '../models/index.js';

const getUniversityById = async (universityId) => {
	return University.findById(universityId).populate('numSubjects numUsers');
};

const getUniversities = async () => {
	return University.find().sort({ name: 'asc' });
};

const createUniversity = async (universityBody) => {
	/*
        name: "University of the People",
        locale: "en",
    */
	if (await University.isNameTaken(universityBody.name)) {
		throw new ApiError(httpMessages.ALREADY_EXISTS, httpStatus.BAD_REQUEST);
	}
	return University.create(universityBody);
};

const updateUniversity = async (universityId, updateBody) => {
	const university = await getUniversityById(universityId);
	if (!university) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	if (university.name === updateBody.name) {
		throw new ApiError('Name already taken.', httpStatus.BAD_REQUEST);
	}
	Object.assign(university, updateBody);
	await university.save();
	return university;
};

const deleteUniversity = async (universityId) => {
	const university = await getUniversityById(universityId);
	if (!university) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	await university.deleteOne();
	return university;
};

const universityService = {
	getUniversityById,
	getUniversities,
	createUniversity,
	updateUniversity,
	deleteUniversity,
};

export default universityService;
