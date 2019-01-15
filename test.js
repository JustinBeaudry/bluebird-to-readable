import test from 'ava';
import Bluebird from 'bluebird';
import {BluebirdToReadable} from './bluebirdToReadable';

function read(stream) {
	return new Bluebird((resolve, reject) => {
		let data = '';
		stream.on('error', err => reject(err));
		stream.on('end', () => {
			resolve(data);
		});
		stream.on('readable', () => {
			let chunk;
			while (null != (chunk = stream.read())) {
				data += chunk;
			}
		});
	});
}

test('promise resolves string', async t => {
	const figure = `They're just questions Leon.`;
	const promise = Bluebird.resolve(figure);
	const stream = BluebirdToReadable.construct(promise);
	t.is(await read(stream), figure);
});
test('promise resolves buffer', async t => {
	const figure = Buffer.from(`They're just questions Leon.`);
	const promise = Bluebird.resolve(figure);
	const stream = BluebirdToReadable.construct(promise);
	t.is(await read(stream), figure.toString());
});
test('object mode', async t => {
	const figure = {
		name: 'Leon Kowalski',
		age: 2
	};
	const promise = Bluebird.resolve(figure);
	const stream = BluebirdToReadable.construct(promise, {
		objectMode: true
	});
	t.is(await read(stream), figure);
});
test.todo('stream destroyed before promise resolves should cancel promise');
test.todo('.push() returns false');
