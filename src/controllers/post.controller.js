import { commentService, postService } from '../services/index.js';
import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import httpMessages from '../utils/httpMessages.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import verifyAuth from '../utils/verifyAuth.js';

const getPosts = catchAsync(async (req, res) => {
	const posts = await postService.getPosts();
	if (!posts) {
		throw new ApiError(httpStatus.NOT_FOUND, httpMessages.NOT_FOUND);
	}

	ApiResponse(res, {
		data: posts,
		message: httpMessages.FETCH,
		code: httpStatus.OK,
	});
});

const getPostById = catchAsync(async (req, res) => {
	const post = await postService.getPostById(req.params.id);

	if (!post) {
		throw new ApiError(httpStatus.NOT_FOUND, httpMessages.NOT_FOUND);
	}

	ApiResponse(res, {
		data: post,
		message: httpMessages.FETCH,
		code: httpStatus.OK,
	});
});

const getPostComments = catchAsync(async (req, res) => {
	const comments = await commentService.getPostComments(req.params.id);
	if (!comments) {
		throw new ApiError(httpStatus.NOT_FOUND, httpMessages.NOT_FOUND);
	}

	ApiResponse(res, {
		data: comments,
		message: httpMessages.FETCH,
		code: httpStatus.OK,
	});
});

const createComment = catchAsync(async (req, res) => {
	const body = {
		...req.body,
		user: req.user._id || req.user.id,
		post: req.params.id,
	};

	const comment = await commentService.createComment(body);

	ApiResponse(res, {
		data: comment,
		message: httpMessages.CREATE,
		code: httpStatus.CREATED,
	});
});

const updatePost = catchAsync(async (req, res) => {
	const post = await postService.updatePost(req.params.id, req.body);

	verifyAuth(req, post.user);

	ApiResponse(res, {
		data: post,
		message: httpMessages.UPDATE,
		code: httpStatus.OK,
	});
});

const deletePost = catchAsync(async (req, res) => {
	const post = await postService.getPostById(req.params.id);

	if (!post) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}

	verifyAuth(req, post.user._id);

	await postService.deletePost(req.params.id);

	ApiResponse(res, {
		message: httpMessages.DELETE,
		code: httpStatus.OK,
	});
});

const deleteByAdmin = catchAsync(async (req, res) => {
	const post = await postService.getPostById(req.params.id);

	if (!post) throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	if (req.user.role !== 'admin')
		throw new ApiError(httpMessages.CANNOT_MODIFY, httpStatus.UNAUTHORIZED);

	await postService.deleteByAdmin(req.params.id);

	ApiResponse(res, {
		message: httpMessages.DELETE,
		code: httpStatus.OK,
	});
});

const postController = {
	getPosts,
	getPostComments,
	createComment,
	deletePost,
	updatePost,
	getPostById,
	deleteByAdmin,
};

export default postController;
