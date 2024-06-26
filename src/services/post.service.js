import { Post, Comment } from '../models/index.js';
import httpMessages from '../utils/httpMessages.js';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
// import ApiError from '../utils/ApiError.js';
// import httpStatus from 'http-status';

// postBody
/*
    {
        user
        subject
        post_title
        post_content
    }
*/

const createPost = async (postBody) => {
	return await Post.create(postBody);
};

const getPosts = async () => {
	return await Post.find();
};

const getSubjectPosts = async (subjectId) => {
	return await Post.find({ subject: subjectId })
		.populate('user')
		.sort({ createdAt: -1 });
};

const getPostById = async (postId) => {
	return await Post.findById(postId).populate('user subject');
};

const updatePost = async (postId, postBody) => {
	const post = await getPostById(postId);
	if (!post) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	Object.assign(post, postBody);
	await post.save();
	return post;
};

const deletePost = async (postId) => {
	const post = await getPostById(postId);
	if (!post) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	await post.deleteOne();
	await Comment.deleteMany({ post: postId });
};

const deleteByAdmin = async (postId) => {
	const post = await getPostById(postId);
	if (!post) {
		throw new ApiError(httpMessages.NOT_FOUND, httpStatus.NOT_FOUND);
	}
	post.deleted = !post.deleted;
	await post.save();
};

const postService = {
	createPost,
	getPosts,
	getSubjectPosts,
	getPostById,
	deletePost,
	updatePost,
	deleteByAdmin,
};

export default postService;

/*
⠀⠀⠀⠀⢰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣴⣶⣶⣶⣿⣿⣿⣿⣶⣷⣶⣶⣶⣦⣤⣾⣥⣤⣄⣀⠈⠙⠲⢦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⡠⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣞⡲⣌⠻⢿⣶⣶⣤⣄⣀⣤⠴⠶⠦⣤⡀⠀⠀⠀⠀
⢀⣠⠖⠁⠀⠀⠀⢀⣠⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢻⣿⡌⢿⣿⣝⣿⣿⣿⣿⣿⣷⣶⣾⣿⣝⣛⡿⣿⡟⢻⣿⣿⣥⡀⠙⣿⣿⣿⣿⣿⣷⣦⣄⠀⠉⠳⣄⠀⠀
⠉⠀⠀⠀⣠⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠈⢻⣿⣯⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⣿⣿⣿⣿⣷⣬⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠈⠳⣤
⣄⣀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠙
⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣏⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠙⠻⠷⣝⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠈⠁⠈⠙⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⠏⠸⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀
⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⡿⣿⡿⢃⣠⣴⣤⣀⡴⣶⡖⢠⠀⠀⠀⠀⠤⣶⣍⡉⠙⠻⠿⢿⣿⣿⣿⣿⡂⠀⠀⢀⣿⣿⣾⣿⣿⣿⣿⣿⡇⠀
⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠉⢁⣿⣿⠿⠛⠉⠉⠉⠈⠙⠀⠀⢇⠀⠀⠀⠀⠀⠙⠻⠶⣄⣀⠀⠙⠛⠛⢿⡇⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠛⣠⡴⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⡀⠀⠀⠀⠀⠀⠀⠀⠉⠓⠢⢤⣀⠈⣧⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀
⣿⣿⣿⣿⣿⣿⡏⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀⠊⠁⠀⠀⠤⠒⠒⠒⢤⡀⠀⠀⠀⠀⠀⠀⠐⢽⠄⠀⠀⠀⡤⠒⠒⠂⠀⠀⠀⠈⢀⡟⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧
⣿⣿⣿⣿⣿⣿⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠹⠆⢀⠀⣀⣠⣤⠠⠠⠄⣀⣀⠘⠁⣀⡠⢴⣖⣀⠀⠀⢈⡀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣸⣿⣿⣿⣿⣿⣿⣿⣿⡿⠏⠀⠀⠀⠀⠀⠀⢀⣀⣤⡴⣶⣟⣀⣴⠟⠘⠁⠂⣈⣉⠉⠙⠛⠛⢀⣼⣿⠿⠿⠿⠿⣿⣿⣿⣤⡴⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⠀⠀⠀⣠⢴⣛⣵⣶⣿⠿⠿⢿⡿⠛⠿⠤⠀⠀⠀⠀⠀⠀⠁⠀⠸⢫⣽⣷⣤⣤⣾⡋⠀⢈⣽⠟⠹⣿⣿⣟⣿⣿⣯⣽⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀⣀⣀⣴⣿⣿⣟⣉⠀⢀⣴⡿⠗⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠺⣯⠅⡄⠈⠈⠉⠉⠉⠛⢯⡁⠀⠀⢻⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣏⣹⣿⡄⢀⣴⣿⠟⠁⢀⣩⡽⣿⣯⣅⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠉⠛⠒⠮⣽⣒⠦⣤⠀⠀⠀⠀⠘⣿⣿⣿⣿⡉⢹⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡘⠛⠛⠋⣻⠿⠧⠀⠀⠒⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿
⠙⠛⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡤⠒⠲⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⢿⣿⣿⣿⣿⣿⣿⣿
⠤⣀⠤⠴⢻⣿⣿⣿⣿⣿⣿⡏⢹⣿⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣥⣤⣤⣤⣼⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠈⠻⣿⣿⣿⣿⣿
⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⡿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣇⠀⠀⠀⠈⠻⣿⣿⣿
⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⡇⣿⠏⠿⠿⣿⣏⢿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⢸⠏⠉⠉⠉⠛⠓⠊⢻⣿
⠀⠀⠀⠀⠀⠀⠈⢻⣿⡿⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡿⡿⣷⢻⠀⠀⠀⠀⠸⡄⢿⣿⡇⠀⠀⠀⠀⠀⠀⠀⢀⡏⣀⡀⠀⠀⠀⠀⠀⠀⠹
⠀⠀⠀⠀⠀⠀⠀⠀⣿⣠⣤⠼⣿⣿⣿⣻⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⣼⢓⡧⣼⠸⡄⠀⠀⠀⠀⠁⠀⢹⡇⠀⠀⠀⠀⠀⢀⣄⣼⠉⠉⠉⠙⠛⠓⠒⠒⠒⠶
⠀⠀⠀⠀⠀⠀⠀⠀⠸⣞⣇⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⢻⡈⠢⡈⠢⠙⠆⠀⠀⠀⠀⠀⢀⡇⠀⠀⠀⠀⠀⠀⡼⠃⠀⠀⠀⠐⠄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡀⠀⠀⠘⢿⡂⠠⡏⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⠈⠻⣤⡀⠀⠀⠀⠀⠀⠀⠀⢀⡞⠀⠀⠀⠀⠀⢀⡼⠁⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢹⣆⠀⠀⠈⠛⢦⣉⣓⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠈⠹⡐⠶⣄⡀⠀⢀⡴⠋⠀⢀⣀⠀⠀⣠⠞⠀⣠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣻⣣⠸⣄⠀⠀⠀⠉⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⢳⡀⠀⠈⢧⣸⠁⠀⠀⠀⠀⢀⡜⠁⣀⡜⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⡀⠀⢹⣧⠀⠈⢳⡄⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣤⣄⣀⡀⠀⠈⠇⡆⠀⠀⢋⡇⠀⠀⢀⡔⠁⢀⡴⠉⠀⠀⠀⡴⠃⠀⠀⠀⠀⠀⠀⠀⠀
⡆⠀⠀⣀⡏⢿⠀⠈⣟⢧⠀⠀⠻⣦⡀⠀⠀⠀⠈⢿⣿⣿⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣌⠉⠙⠓⠒⠒⢥⡤⢤⣬⣥⠤⠔⠋⠀⠒⠉⠀⠀⠀⢀⡼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠁⠀⢸⠙⡇⠘⡆⠀⢎⢯⢧⠀⠀⠹⣿⣄⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⡙⢿⣿⣿⣿⣦⠀⠀⠀⢧⠞⠀⠀⠙⢿⣶⣶⣶⣄⠀⠀⠀⠀⠀⡎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢸⠀⢳⠀⡇⠀⡀⠀⢿⡇⠀⠀⠀⠘⢳⡀⠀⠀⠀⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣤⣤⣤⣀⡀⠀⠉⣻⣿⣿⣿⣄⠀⣀⣀⣠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠
⠀⠀⢸⠀⢸⠀⢳⠀⠹⡆⠀⡟⠀⠀⠀⠀⠀⠹⠶⠦⠤⢤⣙⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⡿⢈⣿⣿⣿⣿⡿⣯⣉⠀⠀⣆⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀
*/
