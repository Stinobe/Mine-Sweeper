import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  // @link https://jestjs.io/docs/configuration#testregex-string--arraystring
  testRegex: ["**/tests/**/*.[jt]sx?$"]
};

export default config;