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
	const userId = req.user._id;
	const subjectId = req.params.subjectId;

	const body = {
		...req.body,
		subject: subjectId,
		user: userId,
	};

	const post = await postService.createPost(body);

	ApiResponse(res, {
		data: post,
		message: httpMessages.CREATE,
		code: httpStatus.OK,
	});
});

const getSubjectPosts = catchAsync(async (req, res) => {
	const posts = await postService.getSubjectPosts(req.params.subjectId);
	if (!posts) {
		throw new ApiError(httpStatus.NOT_FOUND, httpMessages.NOT_FOUND);
	}

	ApiResponse(res, {
		data: posts,
		message: httpMessages.FETCH,
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
	createPost,
	getSubjectPosts,
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
