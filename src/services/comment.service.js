import httpStatus from 'http-status';
import { Comment } from '../models/index.js';
import httpMessages from '../utils/httpMessages.js';
import ApiError from '../utils/ApiError.js';

const getCommentById = async (commentId) => {
	return await Comment.findById(commentId);
};

const getPostComments = async (postId) => {
	return await Comment.find({ post: postId })
		.populate('user')
		.sort({ createdAt: -1 });
};

const createComment = async (commentBody) => {
	return await Comment.create(commentBody);
};

const updateCommentById = async (commentId, commentBody) => {
	const comment = await getCommentById(commentId);
	if (!comment) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	Object.assign(comment, commentBody);
	await comment.save();
	return comment;
};

const deleteCommentById = async (commentId) => {
	const comment = await getCommentById(commentId);
	if (!comment) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	await comment.deleteOne();
};

const commentService = {
	getPostComments,
	createComment,
	updateCommentById,
	deleteCommentById,
	getCommentById,
};

export default commentService;
