export default {
	files: [
		'test/test.js'
	],
	sources: [
		'bluebirdToReadable.ts'
	],
	concurrency: 20,
	compileEnhancements: false,
	extensions: [
		'ts'
	],
	require: [
		'ts-node/register'
	]
}
