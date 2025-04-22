export default {
  testEnvironment: "jsdom",
  transform: { "^.+\\.[jt]sx?$": "babel-jest" },
  moduleNameMapper: { "\\.(css|less)$": "identity-obj-proxy",
                      "^react-router-dom$": "<rootDir>/src/__mocks__/react-router-dom.js",
                    },
  setupFiles: ["<rootDir>/src/setupTests.js"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleFileExtensions: ["js", "jsx", "json", "node"]
};