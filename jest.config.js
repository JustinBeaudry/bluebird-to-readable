
module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'json', 'js'],
  notify: true,
  testMatch: ['**/__tests__/test.ts'],
  verbose: true,
  collectCoverageFrom: [
    '**/bluebirdToReadable.ts'
  ]
};
