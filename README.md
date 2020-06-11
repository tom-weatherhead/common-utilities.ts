# common-utilities.ts
Common utility functions translated from TypeScript to JavaScript

[![build status](https://secure.travis-ci.org/tom-weatherhead/common-utilities.ts.svg)](https://travis-ci.org/tom-weatherhead/common-utilities.ts)
[![npm](https://img.shields.io/npm/v/thaw-common-utilities.ts.svg)](https://www.npmjs.com/package/thaw-common-utilities.ts)
[![npm](https://img.shields.io/npm/dt/thaw-common-utilities.ts.svg)](https://www.npmjs.com/package/thaw-common-utilities.ts)
[![maintainability](https://api.codeclimate.com/v1/badges/2a66d64a08223583a60d/maintainability)](https://codeclimate.com/github/tom-weatherhead/common-utilities.ts/maintainability)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![test coverage](https://api.codeclimate.com/v1/badges/2a66d64a08223583a60d/test_coverage)](https://codeclimate.com/github/tom-weatherhead/common-utilities.ts/test_coverage)
[![known vulnerabilities](https://snyk.io/test/github/tom-weatherhead/common-utilities.ts/badge.svg?targetFile=package.json&package-lock.json)](https://snyk.io/test/github/tom-weatherhead/common-utilities.ts?targetFile=package.json&package-lock.json)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/tom-weatherhead/common-utilities.ts/blob/master/LICENSE)

## Installation
To install the stable version:
```
npm install --save thaw-common-utilities.ts
```

## API Information

### Arrays
```
findSuperlativeElement<T>(array: T[], fn: (x: T, y:T) => T): T
max<T>(array: T[]): T
min<T>(array: T[]): T
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
