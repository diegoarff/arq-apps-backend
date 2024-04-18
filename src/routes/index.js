import { Router } from 'express';
import subjectRoutes from './subject.route.js';
import postRoutes from './post.route.js';
import commentRoutes from './comment.route.js';
import universityRoutes from './university.route.js';
import teacherRoutes from './teacher.route.js';
import ratingRoutes from './rating.route.js';
import userRoutes from './user.route.js';

const router = Router();
const defaultRoutes = [
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
	{
		path: '/universities',
		route: universityRoutes,
	},
	{
		path: '/teachers',
		route: teacherRoutes,
	},
	{
		path: '/ratings',
		route: ratingRoutes,
	},
	{
		path: '/users',
		route: userRoutes,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
