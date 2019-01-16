import Bluebird from 'bluebird';
import { Readable } from 'stream';

export function readPausable(stream: Readable, pauseImmediate=false) {
	return new Bluebird((resolve, reject) => {
		let data = '';
		stream.on('error', err => reject(err));
		stream.on('end', () => {
			resolve(data);
		});
		if (pauseImmediate) {
			stream.pause();
			setTimeout(() => {
				stream.resume();
			}, 1000);
		} else {
			stream.on('data', chunk => {
				if (chunk) {
					data += chunk;
				}
			});
		}
	});
}

export function read(stream: Readable, objectMode=false, destroyImmediate=false) {
	return new Bluebird<null | string | Buffer | object>((resolve, reject) => {
		let data = objectMode ? null : '';
		stream.on('error', err => reject(err));
		stream.on('end', () => {
			resolve(data);
		});
		if (destroyImmediate) {
			stream.destroy(Error('stream destroyed'));
		} else {
			stream.on('readable', () => {
				let chunk;
				while (null != (chunk = stream.read())) {
					if (objectMode) {
						data = chunk;
					} else {
						data += chunk;
					}
				}
			});
		}
	});
}
