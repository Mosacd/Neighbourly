/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Tell ts-jest to use our new test-specific tsconfig file
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json'
    }
  }
};