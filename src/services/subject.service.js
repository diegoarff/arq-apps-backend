import { Subject } from '../models/index.js';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';

const getSubjectById = async (subjectId) => {
	return await Subject.findById(subjectId);
};

const getSubjectBySubjectname = async (name) => {
	const subject = await Subject.findOne({ name });
	if (subject) {
		return true;
	}
	return false;
};

const createSubject = async (subjectBody) => {
	if (await getSubjectBySubjectname(subjectBody.name)) {
		throw new ApiError('Subject already exists', httpStatus.BAD_REQUEST);
	}
	return await Subject.create(subjectBody);
};

const getSubjects = async () => {
	return await Subject.find();
};

const deleteSubjectById = async (subjectId) => {
	const subject = await getSubjectById(subjectId);
	if (!subject) {
		throw new ApiError('Subject not found', httpStatus.NOT_FOUND);
	}
	await subject.remove();
	return subject;
};

const updateSubjectById = async (subjectId, updateBody) => {
	const subject = await getSubjectById(subjectId);
	if (!subject) {
		throw new ApiError('Subject not found', httpStatus.NOT_FOUND);
	}
	Object.assign(subject, updateBody);
	await subject.save();
	return subject;
};

const subjectService = {
	updateSubjectById,
	createSubject,
	getSubjects,
	getSubjectById,
	deleteSubjectById,
};

export default subjectService;
