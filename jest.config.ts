const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Mapeia @/ diretamente para a raiz do projeto
    "\\.(css|scss|sass)$": "identity-obj-proxy", // Ignora arquivos de estilo
  },
};

module.exports = createJestConfig(customJestConfig);
