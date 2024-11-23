/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  testMatch: ["<rootDir>/__test__/**/*.test.ts"], // Adjust the path to match your test files
  moduleFileExtensions: ["ts", "js"],
};
