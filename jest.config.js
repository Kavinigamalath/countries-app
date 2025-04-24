// jest.config.js
export default {
  // 1) Use jsdom so `expect`, `window`, `document`, etc. exist
  testEnvironment: "jsdom",

  // 2) Compile JS/JSX via babel-jest
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },

  // 3) Stub out CSS and image imports, plus our react-router-dom mock
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
       // ← add this line to mock images
   "\\.(png|jpe?g|gif|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(png|jpe?g|gif|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
    "^react-router-dom$": "<rootDir>/src/__mocks__/react-router-dom.js"
  },

  // 4) Run setupTests.js *after* jsdom + globals are in place
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],

  moduleFileExtensions: ["js", "jsx", "json", "node"]
};
