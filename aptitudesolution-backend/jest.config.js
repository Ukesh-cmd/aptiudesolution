module.exports = {
  testEnvironment: "node",
  verbose: true,
  testMatch: ["**/*.test.js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
};
