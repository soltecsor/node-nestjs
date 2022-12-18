import { pathsToModuleNameMapper } from 'ts-jest'
import { Config } from  'jest'
import { compilerOptions } from 'tsconfig.json'

const esModules = ['@agm', 'ngx-bootstrap'].join('|');

const config: Config = {
    moduleFileExtensions: [
      'js',
      'json',
      'ts'
    ],
    testRegex: ".*\\.spec\\.ts$",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
      prefix:'<rootDir>/'
    }),
    collectCoverageFrom: [
      "**/*.(t|j)s"
    ],
    coverageDirectory: "../coverage",
    testEnvironment: "node" ,
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  }

  export default config;