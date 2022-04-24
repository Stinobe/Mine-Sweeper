import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  // @link https://jestjs.io/docs/configuration#testregex-string--arraystring
  testMatch: ["**/tests/**/*.[jt]s?(x)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  preset: "ts-jest"
};

export default config;