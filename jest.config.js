// jest.config.js
export default {
  // Use jsdom so `expect`, `window`, `document`, etc. exist
  testEnvironment: "jsdom",

  //Compile JS/JSX via babel-jest
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },

  // Stub out CSS and image imports, plus our react-router-dom mock
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
       // add this line to mock images
   "\\.(png|jpe?g|gif|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(png|jpe?g|gif|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
    "^react-router-dom$": "<rootDir>/src/__mocks__/react-router-dom.js",
    "^../firebase$": "<rootDir>/src/__mocks__/firebase.js"
  },

  // Run setupTests.js *after* jsdom + globals are in place
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],

  moduleFileExtensions: ["js", "jsx", "json", "node"]
};
