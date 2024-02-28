import { Post } from '../models/index.js';
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

const postService = {
	createPost,
	getPosts,
	getSubjectPosts,
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
