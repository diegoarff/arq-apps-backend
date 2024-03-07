import { commentService, postService } from '../services/index.js';
import catchAsync from '../utils/catchAsync.js';
import httpStatus from 'http-status';
import httpMessages from '../utils/httpMessages.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import verifyAuth from '../utils/verifyAuth.js';

const createPost = catchAsync(async (req, res) => {
	const userId = req.user._id;

	const body = {
		...req.body,
		user: userId,
	};

	const post = await postService.createPost(body);

	ApiResponse(res, {
		data: post,
		message: httpMessages.CREATE,
		code: httpStatus.OK,
	});
});

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
		user: req.user._id,
		post: req.params.id,
	};

	const comment = await commentService.createComment(body);

	ApiResponse(res, {
		data: comment,
		message: httpMessages.CREATE,
		code: httpStatus.OK,
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

	verifyAuth(req, post.user);

	await postService.deletePost(req.params.id);

	ApiResponse(res, {
		message: httpMessages.DELETE,
		code: httpStatus.OK,
	});
});

const postController = {
	createPost,
	getPosts,
	getPostComments,
	createComment,
	deletePost,
	updatePost,
};

export default postController;
