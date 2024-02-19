import { Router } from 'express';
import authRoutes from './auth.route.js';
import subjectRoutes from './subject.route.js';

const router = Router();
const defaultRoutes = [
	{
		path: '/auth',
		route: authRoutes,
	},
	{
		path: '/subject',
		route: subjectRoutes,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
