import { teacherService } from '../services/index.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import httpMessages from '../utils/httpMessages.js';
import httpStatus from 'http-status';

const getTeacherById = catchAsync(async (req, res, next) => {
	const teacher = await teacherService.getTeacherById(req.params.id);
	if (!teacher) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	ApiResponse(res, {
		data: teacher,
		message: httpMessages.FETCH,
		code: httpStatus.OK,
	});
});

const updateTeacher = catchAsync(async (req, res, next) => {
	const teacher = await teacherService.updateTeacher(req.params.id, req.body);
	ApiResponse(res, {
		data: teacher,
		message: httpMessages.UPDATE,
		code: httpStatus.OK,
	});
});

const deleteTeacher = catchAsync(async (req, res, next) => {
	await teacherService.deleteTeacher(req.params.id);
	ApiResponse(res, {
		message: httpMessages.DELETE,
		code: httpStatus.OK,
	});
});

const teacherController = {
	updateTeacher,
	deleteTeacher,
	getTeacherById,
};

export default teacherController;
