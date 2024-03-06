import {
	subjectService,
	teacherService,
	universityService,
} from '../services/index.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import httpMessages from '../utils/httpMessages.js';
import httpStatus from 'http-status';

const getSubjectsByUniversity = catchAsync(async (req, res, next) => {
	const subjects = await subjectService.getSubjectsByUniversity(
		req.params.universityId
	);

	// refactor subjects data structure
	const data = {};
	for (const subject of subjects) {
		const term = subject.term;

		const s = {
			name: subject.name,
			term: subject.term,
			id: subject._id,
		};

		if (!data[term]) {
			data[term] = { term, subjects: [] };
		}
		data[term].subjects.push(s);
	}
	const subjectsRefactored = Object.values(data);

	// sort subjects names alphabetically
	for (const sr of subjectsRefactored) {
		sr.subjects.sort((a, b) => a.name.localeCompare(b.name));
	}

	ApiResponse(res, {
		data: subjectsRefactored,
		message: httpMessages.FETCH,
		code: httpStatus.OK,
	});
});

const getTeachersByUniversity = catchAsync(async (req, res, next) => {
	const teachers = await teacherService.getTeachersByUniversity(req.params.id);
	ApiResponse(res, {
		data: teachers,
		message: httpMessages.FETCH,
		code: httpStatus.OK,
	});
});

const getUniversityById = catchAsync(async (req, res, next) => {
	const university = await universityService.getUniversityById(req.params.id);
	if (!university) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	ApiResponse(res, {
		data: university,
		message: httpMessages.FETCH,
		code: httpStatus.OK,
	});
});

const getAllUniversities = catchAsync(async (req, res, next) => {
	const universities = await universityService.getUniversities();
	ApiResponse(res, {
		data: universities,
		message: httpMessages.FETCH,
		code: httpStatus.OK,
	});
});

const createUniversity = catchAsync(async (req, res, next) => {
	const university = await universityService.createUniversity(req.body);
	ApiResponse(res, {
		data: university,
		message: httpMessages.CREATE,
		code: httpStatus.OK,
	});
});

const updateUniversity = catchAsync(async (req, res, next) => {
	const university = await universityService.updateUniversity(
		req.params.id,
		req.body
	);
	ApiResponse(res, {
		data: university,
		message: httpMessages.FETCH,
		code: httpStatus.UPDATE,
	});
});

const deleteUniversity = catchAsync(async (req, res, next) => {
	await universityService.deleteUniversity(req.params.id);
	ApiResponse(res, {
		message: httpMessages.FETCH,
		code: httpStatus.DELETE,
	});
});

const createTeacher = catchAsync(async (req, res, next) => {
	const body = {
		...req.body,
		university: req.params.universityId,
	};
	const teacher = await teacherService.createTeacher(body);
	ApiResponse(res, {
		data: teacher,
		message: httpMessages.CREATE,
		code: httpStatus.OK,
	});
});

const createSubject = catchAsync(async (req, res) => {
	const body = {
		...req.body,
		university: req.params.universityId,
	};
	const subject = await subjectService.createSubject(body);
	ApiResponse(res, {
		data: subject,
		message: httpMessages.CREATE,
		code: httpStatus.CREATED,
	});
});

const universityController = {
	getAllUniversities,
	getTeachersByUniversity,
	getSubjectsByUniversity,
	createUniversity,
	updateUniversity,
	deleteUniversity,
	getUniversityById,
	createTeacher,
	createSubject,
};

export default universityController;
