import test from 'ava';
import Bluebird from 'bluebird';
import { BluebirdToReadable } from '../bluebirdToReadable';
import { read } from './utils';
import { FIGURE, OBJECT_FIGURE } from './data';

test('promise resolves string', async t => {
	const promise = Bluebird.resolve(FIGURE);
	const stream = BluebirdToReadable(promise);
	t.is(await read(stream), FIGURE);
});
test('promise resolves buffer', async t => {
	const figure = Buffer.from(FIGURE);
	const promise = Bluebird.resolve(figure);
	const stream = BluebirdToReadable(promise);
	t.is(await read(stream), figure.toString());
});
test('object mode', async t => {
	const promise = Bluebird.resolve(OBJECT_FIGURE);
	const stream = BluebirdToReadable(promise, {
		objectMode: true
	});
	t.is(await read(stream, true), OBJECT_FIGURE);
});
test('stream destroyed before promise resolves should cancel promise', async t => {
	const promise = Bluebird.delay(500).then(() => FIGURE);
	const stream = BluebirdToReadable(promise);
	await t.throwsAsync(read(stream, false, true));
	t.true(promise.isCancelled());
});
test.todo('.push() returns false');
