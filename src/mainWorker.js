import { parentPort } from 'worker_threads';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/index.js';
import app from './app.js';
import passport from 'passport';
import jwtStrategy from './config/passport.js';
import { createServer } from 'http';
import connection from './config/mongoose.js';
// import ApiError from './utils/ApiError.js'

parentPort.on('message', (port) => {
	try {
		app.use(passport.initialize());
		passport.use(jwtStrategy);
		app.use('/', routes);
		app.use(errorHandler);
		app.get('/crash', (req, res) => {
			console.log('Crashing...');
			parentPort.postMessage('crash');
		});

		connection().then(() => {
			const httpServer = createServer(app);
			httpServer.listen(port, () => {
				console.log('Main server listening on ' + port);
			});
		});
	} catch (e) {
		console.log(e);
	}
});
