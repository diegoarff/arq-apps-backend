import { subjectService, postService } from '../services/index.js';
import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import httpMessages from '../utils/httpMessages.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

const getSubjects = catchAsync(async (req, res) => {
	const subjects = await subjectService.getSubjects();

	// refactor subjects data structure
	const data = {};
	for (const subject of subjects) {
		const term = subject.term;

		const s = {
			name: subject.name,
			term: subject.term,
			id: subject._id,
			teachers: subject.teachers,
			university: subject.university,
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

const getSubjectById = catchAsync(async (req, res) => {
	const subject = await subjectService.getSubjectById(req.params.id);

	if (!subject) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
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

const createPost = catchAsync(async (req, res) => {
	const userId = req.user._id || req.user.id;
	const id = req.params.id;

	const body = {
		...req.body,
		subject: id,
		user: userId,
	};

	const post = await postService.createPost(body);

	ApiResponse(res, {
		data: post,
		message: httpMessages.CREATE,
		code: httpStatus.CREATED,
	});
});

const getSubjectPosts = catchAsync(async (req, res) => {
	const posts = await postService.getSubjectPosts(req.params.id);
	if (!posts) {
		throw new ApiError(httpStatus.NOT_FOUND, httpMessages.NOT_FOUND);
	}

	ApiResponse(res, {
		data: posts,
		message: httpMessages.FETCH,
		code: httpStatus.OK,
	});
});

const addTeacherToSubject = catchAsync(async (req, res) => {
	const addTo = await subjectService.addTeacherToSubject(
		req.params.id,
		req.params.teacherId
	);

	ApiResponse(res, {
		data: addTo,
		message: httpMessages.UPDATE,
		code: httpStatus.OK,
	});
});

const getTeachersBySubject = catchAsync(async (req, res) => {
	const subject = await subjectService.getSubjectById(req.params.id);

	ApiResponse(res, {
		data: subject.teachers,
		message: httpMessages.FETCH,
		code: httpStatus.OK,
	});
});

const subjectController = {
	getSubjects,
	getSubjectById,
	getSubjectByName,
	deleteSubjectById,
	updateSubjectById,
	createPost,
	getSubjectPosts,
	addTeacherToSubject,
	getTeachersBySubject,
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
