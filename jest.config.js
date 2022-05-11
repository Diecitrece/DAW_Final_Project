const config = {
  verbose: true,
  transform: {
    "^.+\\.js?$": "js-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
};

module.exports = config;

// Or async function
module.exports = async () => {
  return {
    testEnvironment: "node",
  };
};
