import { Subject } from '../models/index.js';
import { teacherService } from './index.js';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';
import httpMessages from '../utils/httpMessages.js';

const getSubjectById = async (subjectId) => {
	return await Subject.findById(subjectId).populate('teachers university');
	// TODO: add rating average
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
	return await Subject.find().populate('teachers university');
};

const deleteSubjectById = async (subjectId) => {
	const subject = await getSubjectById(subjectId);
	if (!subject) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	await subject.deleteOne();
	return subject;
};

const updateSubjectById = async (subjectId, updateBody) => {
	const subject = await getSubjectById(subjectId);
	if (!subject) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	Object.assign(subject, updateBody);
	await subject.save();
	return subject;
};

const getSubjectsByUniversity = async (universityId) => {
	return Subject.find({ university: universityId }).populate(
		'teachers university'
	);
};

const addTeacherToSubject = async (subjectId, teacherId) => {
	const subject = await getSubjectById(subjectId);

	if (!subject)
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);

	if (subject.teachers.some((teacher) => teacher.id === teacherId))
		throw new ApiError(
			'Subject already contains this teacher.',
			httpStatus.BAD_REQUEST
		);

	const teacher = await teacherService.getTeacherById(teacherId);

	if (!subject || !teacher)
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);

	subject.teachers.push(teacher);
	await subject.save();
	return getSubjectById(subjectId);
};

const subjectService = {
	updateSubjectById,
	createSubject,
	getSubjects,
	getSubjectById,
	deleteSubjectById,
	getSubjectsByUniversity,
	addTeacherToSubject,
};

export default subjectService;

/*
⠀⠈⠧⠜⠀⠀⠀⠀⠀⡇⠀⠀⣰⢿⢻⣦⡀⠀⠀⠈⠀⠀⠠⢀⠒⣄⡶⠯⠾⠟⠤⢉⡛⢙⠋⠻⠀⠴⠾⣗⣻⡓⠀⠠⠀⢀⡀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⠚⠒⠋⣿⢏⡯⢳⣟⢿⣮⣛⢦⡐⢌⡱⢈⣢⡞⡕⢂⠤⠀⡀⠀⠀⡀⠀⠀⠀⠀⣀⣬⠟⠁⠀⣡⣴⡯⣟⣦⠀⠀
⠠⢄⣁⠀⠀⠀⠀⠊⠀⠰⣿⣏⣾⠼⠧⠿⠧⠙⢾⡳⣟⢦⣐⡶⠋⢀⣤⡄⠀⠀⣀⣤⠀⠀⣤⠀⠀⠘⠛⠋⣉⣻⣧⡶⣻⣙⠶⣹⢧⠀
⠲⢃⠂⣝⠦⠀⠀⡐⠀⣼⡻⣝⣲⡒⠂⠀⠀⣀⣀⣷⢫⣷⢿⣚⡿⡛⢏⣛⡛⢟⡲⠶⢯⣬⣉⠓⢀⣨⣵⣾⠟⡿⠛⣹⢣⣭⢛⡶⣋⡆
⠀⣴⡄⠑⢲⣤⣤⢡⣴⣿⢱⡎⠁⠀⢠⣴⡞⣭⡎⢱⢣⡜⣷⡏⢲⠙⡎⡖⣭⡎⢱⠋⡖⣦⣭⡟⢫⢳⡏⠁⠀⠀⠐⠉⠛⠒⣯⠚⣵⢻
⠀⢒⣃⡑⡄⢊⠩⣭⣿⢧⡛⣞⡿⣽⡿⢡⠳⣱⢪⣟⢻⣾⠧⣙⢬⠳⣍⢖⡱⢎⢇⢫⡴⢞⡭⡸⢍⢯⡀⡀⠀⠀⠀⠠⢴⢮⢭⣻⠱⣾
⡌⠀⢀⠧⡈⢆⠡⢷⣿⢲⡽⢋⣶⠯⣘⢣⡟⣴⠯⣼⡿⡚⡼⣘⠮⡱⢎⡎⡵⢋⡼⢫⣜⡾⣱⠱⢪⢜⡹⢳⣄⠀⠀⠀⠻⣏⡞⣼⢳⢣
⠰⠤⠤⢚⡐⠌⠒⣸⣿⣻⢼⢟⡱⢎⡥⡟⢎⡏⣶⢫⡗⡱⢣⠵⣩⢣⠳⣬⠱⡏⠼⣡⢾⡟⣯⢱⢋⠦⡻⣇⡝⣳⡄⢀⠰⣽⣜⣣⠯⣽
⠀⠀⢠⠒⢸⠚⣡⣟⡞⣵⢏⣾⠱⣊⣼⢛⡜⣼⢣⢸⡇⢭⣃⠟⣰⢋⡵⣊⠳⣜⣵⠏⢘⡿⣽⢊⡬⡇⢽⣻⡴⢡⢻⠬⢷⣗⢮⡵⣛⡼
⠀⠀⢐⠨⣡⣾⢙⣶⢿⣏⢺⢇⢧⡿⣹⢣⣼⠃⠆⢸⡷⠶⣡⢛⠴⣋⡔⡳⣭⣾⣋⡀⠀⣗⣿⡱⢒⣻⢆⢿⣧⣋⢎⡳⡱⢚⣗⣺⠱⣏
⠀⢠⠞⣴⣿⢧⣟⢣⡾⣌⡿⣌⡾⡅⢹⣺⣇⡤⠶⠛⣇⠳⣥⢋⡞⣡⢺⣱⡾⠁⠀⠙⠳⣿⣟⣧⠳⡸⣏⠼⣿⡔⣋⠶⣩⢋⡞⡶⣹⡹
⠀⢀⣾⡿⣱⡿⣌⢺⡗⣼⡗⣼⠡⠐⠙⠿⣄⢀⣀⣤⣹⣧⢲⢩⠲⡅⣿⡿⠀⠀⠀⠀⠀⠸⣷⢹⣎⡕⣻⢌⣿⣧⡙⢶⡡⢧⡹⢜⡱⡃
⢠⢿⡿⠱⣿⡗⣬⢻⣿⣹⣯⡇⠀⠀⠀⠀⡀⠀⠀⠠⣀⡻⣮⡣⠝⣼⣷⠇⠀⠚⠉⠉⠁⠀⢿⡇⢻⡜⣽⢎⣼⣧⡙⣆⠳⡥⢻⡌⡵⣇
⡿⣱⠡⣏⢽⡇⣧⢛⣷⣼⠻⣄⣠⣴⣶⡶⠶⢶⣶⣦⡤⢀⡈⢑⠿⡏⣿⠀⠀⣉⣒⣶⣠⢀⡈⢷⡈⣷⢺⢧⢸⠧⣜⣸⢣⡱⣋⢖⡹⢼
⢡⡏⣖⢩⣾⢇⡹⡜⢻⡯⣤⣽⢿⠯⠭⣵⣰⠌⢫⠟⣃⣌⡳⢬⡔⣣⠿⣀⠒⠿⣟⢛⠿⠾⣧⣜⣧⣹⡾⣜⢺⡄⣏⡽⣈⠧⣻⡘⣥⢾
⡾⠱⣌⢳⡇⢮⡱⢺⣷⡇⣙⣷⠬⢇⡳⢞⡴⢮⡹⢎⡳⢬⢳⠣⣝⠲⡝⠦⣍⠳⢮⢿⣾⡗⠓⣿⡿⢿⣇⣯⠲⡜⡴⢣⡍⠞⡴⣙⠴⣻
⡳⢹⠌⣿⠸⣅⢳⣟⣾⢯⡱⢎⡳⡝⣎⠷⡊⠇⠓⠉⠁⠉⠈⠙⠈⠑⠚⡽⣰⣋⢷⣚⠶⡹⢏⣭⠶⢾⠻⣿⢡⢳⡙⢦⣍⢳⠣⣍⠖⣻
⡱⣋⢼⣇⡛⣜⣺⢯⣿⠃⠝⠊⠁⠐⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠁⡘⠊⢥⠫⠵⢫⠶⣙⠦⣿⠣⢎⡧⣙⠦⢎⣾⠱⢪⡍⣿
⡱⡱⢺⣣⠜⣦⣿⣿⣽⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⣀⣤⡤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠐⠈⠡⠓⡌⣻⢧⢫⡟⠴⢣⢏⣚⣙⢪⢃⠮⣽
⡱⢹⣿⡤⣛⢴⣿⡇⣽⠀⠀⠘⠀⠀⠀⠀⠀⢴⡿⢹⣶⣴⣤⣬⣝⡳⣄⡀⠀⠀⠀⠀⠀⠀⠠⡡⣰⢟⣪⠟⡸⢍⡳⢂⠇⠐⢪⢍⡚⣿
⡱⣿⣿⡆⠵⣾⡿⣿⣾⠀⠀⠁⠀⠀⠀⠀⠀⢸⣷⣤⣿⣿⣿⣿⣿⣿⣾⣿⠀⠀⠀⠀⠀⠀⢀⡴⡏⣞⠣⠝⣥⡛⡼⠍⢊⡁⡞⣰⠹⠹
⣱⡏⣿⡏⢾⣽⡗⣿⢹⣧⠀⠀⠀⠀⣠⣀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠢⣠⣞⠳⠎⡴⢃⠏⡖⡹⣘⠤⣫⡜⡜⢴⠫⠀
⢼⠁⢿⣿⢌⣽⡿⣿⡇⠘⣷⡀⢰⡚⠁⠈⠱⠀⢿⡟⠡⢄⠢⠔⣀⡾⠃⠀⠀⠀⠀⢀⣶⣿⣈⢏⢖⠢⢇⡲⢪⣕⣠⡶⣃⢗⡜⣇⠒⠠
⢼⠀⢸⣿⠤⢸⡃⢸⣧⣤⣿⣧⡀⠻⣄⣀⠇⠀⠘⣻⣧⣼⣿⣜⠿⠇⠀⠀⠀⠀⣠⣿⣣⢇⡜⠼⣘⠇⡃⣛⣿⡿⣇⡸⡜⡼⣸⠄⠀⠀
⢺⠀⠀⠻⣟⣸⡇⢘⣿⠞⠛⠙⠻⣆⡀⠁⠤⠄⠘⠀⠈⠉⣧⡄⠀⠀⠀⠀⣠⡾⣻⢾⣟⢢⡭⣾⢔⣋⢲⣱⣟⡶⢏⡲⡹⣼⢻⡅⠀⣀
⣹⣀⣀⢤⣿⣇⢷⣼⠟⢂⠀⠀⠀⢈⣿⣦⡉⠀⠃⠀⠀⠀⢸⣇⣀⣀⣴⣿⡯⠟⣡⣿⠎⢶⠻⡱⣍⢲⣳⣿⡾⣙⡬⡵⡿⡇⢢⢳⠀⠉
⢧⢇⠀⠀⠈⢿⣿⡏⠓⢾⣄⣠⣤⣶⣿⣿⣿⣠⣀⡀⠀⠀⠘⣮⢻⢟⡧⠲⠶⠞⡻⢥⢚⢥⠒⡱⣊⣶⣿⣽⡗⣜⣾⡟⢰⡇⢠⣡⣧⣁
⠉⠉⠀⠀⠀⠈⠙⠛⠁⠀⠈⠙⣿⣿⣿⣿⣿⣿⣈⣙⡛⣓⢲⣉⣍⡉⠥⡁⣒⡸⡱⢎⣍⠲⣌⣋⣼⣿⣿⢟⡸⢮⣿⠧⠚⠋⠉⠁⠀⠀
*/
