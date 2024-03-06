import { Teacher } from '../models/index.js';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import httpMessages from '../utils/httpMessages.js';

const getTeachersByUniversity = async (universityId) => {
	return Teacher.find().populate('university').sort({ university: 'asc' });
};

const createTeacher = async (teacherBody) => {
	/*
        name: "jubert",
        email: "jubert@email.com",
        number: "+584123456789",
        university: "5f2b8e2c3e4c3d1f2e4c3d1f"
    */

	if (
		!teacherBody.university ||
		!teacherBody.name ||
		!teacherBody.email ||
		!teacherBody.number
	) {
		throw new ApiError('Missing required fields', httpStatus.BAD_REQUEST);
	} else if (await Teacher.isEmailTaken(teacherBody.email)) {
		throw new ApiError('Email already taken', httpStatus.BAD_REQUEST);
	} else if (await Teacher.isNumberTaken(teacherBody.number)) {
		throw new ApiError('Number already taken', httpStatus.BAD_REQUEST);
	}

	// yamete kudasai onii-chan (⁄ ⁄•⁄ω⁄•⁄ ⁄)
	return Teacher.create(teacherBody);
};

const getTeacherById = async (teacherId) => {
	return Teacher.findById(teacherId);
};

const updateTeacher = async (teacherId, teacherBody) => {
	const teacher = await Teacher.findById(teacherId);
	if (!teacher) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	Object.assign(teacher, teacherBody);
	await teacher.save();
	return teacher;
};

const deleteTeacher = async (teacherId) => {
	const teacher = await Teacher.findById(teacherId);
	if (!teacher) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	await teacher.remove();
	return teacher;
};

const teacherService = {
	getTeachersByUniversity,
	createTeacher,
	getTeacherById,
	updateTeacher,
	deleteTeacher,
};

export default teacherService;
