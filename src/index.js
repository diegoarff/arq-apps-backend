import 'dotenv/config.js';
import { Worker } from 'node:worker_threads';
import * as url from 'url';
import path from 'path';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const authPath = path.join(__dirname, 'authWorker.js');
const mainPath = path.join(__dirname, 'mainWorker.js');

const main = new Worker(mainPath);

main.on('message', (msg) => {
	if (msg === 'crash') {
		main.terminate().then(() => {
			console.log('main worker crashed');
		});
	}
});

main.postMessage(8000);
const auth = new Worker(authPath);
auth.postMessage(8001);
