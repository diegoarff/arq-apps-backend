import { Router } from 'express';
import authRoutes from './auth.route.js';
import subjectRoutes from './subject.route.js';
import postRoutes from './post.route.js';
import commentRoutes from './comment.route.js';

const router = Router();
const defaultRoutes = [
	{
		path: '/auth',
		route: authRoutes,
	},
	{
		path: '/subjects',
		route: subjectRoutes,
	},
	{
		path: '/posts',
		route: postRoutes,
	},
	{
		path: '/comments',
		route: commentRoutes,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
