import { subjectService } from '../services/index.js';
import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import httpMessages from '../utils/httpMessages.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

const getSubjects = catchAsync(async (req, res) => {
	const subjects = await subjectService.getSubjects();
	ApiResponse(res, {
		data: subjects,
		message: httpMessages.FETCH,
		code: httpStatus.OK,
	});
});

const createSubject = catchAsync(async (req, res) => {
	const subject = await subjectService.createSubject(req.body);
	ApiResponse(res, {
		data: subject,
		message: httpMessages.CREATE,
		code: httpStatus.CREATED,
	});
});

const getSubjectById = catchAsync(async (req, res) => {
	const subject = await subjectService.getSubjectById(req.params.id);

	if (!subject) {
		throw new ApiError(httpStatus.NOT_FOUND, httpMessages.NOT_FOUND);
	}

	ApiResponse(res, {
		data: subject,
		message: httpMessages.FETCH,
		code: httpStatus.OK,
	});
});

const getSubjectByName = catchAsync(async (req, res) => {
	const subject = await subjectService.getSubjectByName(req.params.name);
	ApiResponse(res, {
		data: subject,
		message: httpMessages.FETCH,
		code: httpStatus.OK,
	});
});

const deleteSubjectById = catchAsync(async (req, res) => {
	await subjectService.deleteSubjectById(req.params.id);
	ApiResponse(res, {
		message: httpMessages.DELETE,
		code: httpStatus.OK,
	});
});

const updateSubjectById = catchAsync(async (req, res) => {
	const subject = await subjectService.updateSubjectById(
		req.params.id,
		req.body
	);
	ApiResponse(res, {
		data: subject,
		message: httpMessages.UPDATE,
		code: httpStatus.OK,
	});
});

const subjectController = {
	getSubjects,
	createSubject,
	getSubjectById,
	getSubjectByName,
	deleteSubjectById,
	updateSubjectById,
};

export default subjectController;

/*
    ⠄⠄⠄⢰⣧⣼⣯⠄⣸⣠⣶⣶⣦⣾⠄⠄⠄⠄⡀⠄⢀⣿⣿⠄⠄⠄⢸⡇⠄⠄
    ⠄⠄⠄⣾⣿⠿⠿⠶⠿⢿⣿⣿⣿⣿⣦⣤⣄⢀⡅⢠⣾⣛⡉⠄⠄⠄⠸⢀⣿⠄
    ⠄⠄⢀⡋⣡⣴⣶⣶⡀⠄⠄⠙⢿⣿⣿⣿⣿⣿⣴⣿⣿⣿⢃⣤⣄⣀⣥⣿⣿⠄
    ⠄⠄⢸⣇⠻⣿⣿⣿⣧⣀⢀⣠⡌⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⣿⣿⣿⠄
    ⠄⢀⢸⣿⣷⣤⣤⣤⣬⣙⣛⢿⣿⣿⣿⣿⣿⣿⡿⣿⣿⡍⠄⠄⢀⣤⣄⠉⠋⣰
    ⠄⣼⣖⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⢇⣿⣿⡷⠶⠶⢿⣿⣿⠇⢀⣤
    ⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣿⡇⣿⣿⣿⣿⣿⣿⣷⣶⣥⣴⣿⡗
    ⢀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠄
    ⢸⣿⣦⣌⣛⣻⣿⣿⣧⠙⠛⠛⡭⠅⠒⠦⠭⣭⡻⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠄
    ⠘⣿⣿⣿⣿⣿⣿⣿⣿⡆⠄⠄⠄⠄⠄⠄⠄⠄⠹⠈⢋⣽⣿⣿⣿⣿⣵⣾⠃⠄
    ⠄⠘⣿⣿⣿⣿⣿⣿⣿⣿⠄⣴⣿⣶⣄⠄⣴⣶⠄⢀⣾⣿⣿⣿⣿⣿⣿⠃⠄⠄
    ⠄⠄⠈⠻⣿⣿⣿⣿⣿⣿⡄⢻⣿⣿⣿⠄⣿⣿⡀⣾⣿⣿⣿⣿⣛⠛⠁⠄⠄⠄
    ⠄⠄⠄⠄⠈⠛⢿⣿⣿⣿⠁⠞⢿⣿⣿⡄⢿⣿⡇⣸⣿⣿⠿⠛⠁⠄⠄⠄⠄⠄
    ⠄⠄⠄⠄⠄⠄⠄⠉⠻⣿⣿⣾⣦⡙⠻⣷⣾⣿⠃⠿⠋⠁⠄⠄⠄⠄⠄⢀⣠⣴
    ⣿⣿⣿⣶⣶⣮⣥⣒⠲⢮⣝⡿⣿⣿⡆⣿⡿⠃⠄⠄⠄⠄⠄⠄⠄⣠⣴⣿⣿⣿
*/
