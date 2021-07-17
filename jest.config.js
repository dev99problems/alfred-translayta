/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  clearMocks: true,
  coveragePathIgnorePatterns: ['/node_modules/'],

  maxWorkers: 2,
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'json'],
  testEnvironment: 'node'
}
