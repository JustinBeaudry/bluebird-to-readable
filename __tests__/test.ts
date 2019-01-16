import Bluebird from 'bluebird';
import { BluebirdToReadable } from '../bluebirdToReadable';
import { FIGURE, OBJECT_FIGURE } from './data';
import { read } from './utils';

test('promise resolves string', async () => {
  expect.assertions(1);
	const promise = Bluebird.resolve(FIGURE);
	const stream = BluebirdToReadable(promise);
	expect(await read(stream)).toBe(FIGURE);
});
test('promise resolves buffer', async () => {
  expect.assertions(1);
	const figure = Buffer.from(FIGURE);
	const promise = Bluebird.resolve(figure);
	const stream = BluebirdToReadable(promise);
	expect(await read(stream)).toBe(figure.toString());
});
test('object mode', async () => {
  expect.assertions(1);
	const promise = Bluebird.resolve(OBJECT_FIGURE);
	const stream = BluebirdToReadable(promise, {
		objectMode: true
	});
	expect(await read(stream, true)).toBe(OBJECT_FIGURE);
});
test('stream destroyed before promise resolves should cancel promise', async () => {
  expect.assertions(2);
	const promise = Bluebird.delay(500).then(() => FIGURE);
	const stream = BluebirdToReadable(promise);
	try {
    await read(stream, false, true);
  } catch(e) {
	  expect(e.message).toMatch('stream destroyed');
  }
	expect(promise.isCancelled()).toBe(true);
});
// test('.push() returns false');
