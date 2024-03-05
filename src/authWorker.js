import { parentPort } from 'worker_threads';
import authRoutes from './routes/auth.route.js';
import { errorHandler } from './middlewares/index.js';
import app from './app.js';
import { createServer } from 'http';
import connection from './config/mongoose.js';

parentPort.on('message', (port) => {
	try {
		app.use('/auth', authRoutes);
		app.use(errorHandler);
		const httpServer = createServer(app);

		connection().then(() => {
			httpServer.listen(port, () => {
				console.log('Auth server listening on ' + port);
			});
		});
	} catch (e) {
		console.log(e);
	}
});
