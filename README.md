# common-utilities.ts
Common utility functions implemented in TypeScript.

Obligatory BadgeFest:

[![build status][build-status-badge-image]][build-status-url]
[![npm version][npm-version-badge-image]][npm-version-url]
[![latest tag][latest-tag-badge-image]][latest-tag-url]
[![npm total downloads][npm-total-downloads-badge-image]][npm-total-downloads-url]
[![watchers][watchers-badge-image]][watchers-url]
[![stars][stars-badge-image]][stars-url]
[![forks][forks-badge-image]][forks-url]
[![repo dependents][repo-dependents-badge-image]][repo-dependents-url]
[![pkg dependents][pkg-dependents-badge-image]][pkg-dependents-url]
[![commits][commits-badge-image]][commits-url]
[![last commit][last-commit-badge-image]][last-commit-url]
[![types][types-badge-image]][types-url]
[![install size][install-size-badge-image]][install-size-url]
[![known vulnerabilities][known-vulnerabilities-badge-image]][known-vulnerabilities-url]
[![lines of code][lines-of-code-badge-image]][lines-of-code-url]
[![technical debt][technical-debt-badge-image]][technical-debt-url]
[![maintainability][maintainability-badge-image]][maintainability-url]
[![test coverage][test-coverage-badge-image]][test-coverage-url]
[![tested with jest][jest-badge-image]][jest-url]
[![code style: prettier][prettier-badge-image]][prettier-url]
[![license][license-badge-image]][license-url]
[![FOSSA Status][fossa-badge-image]][fossa-badge-url]

<!-- [![dependents](https://badgen.net/npm/dependents/thaw-common-utilities.ts)](https://badgen.net/npm/dependents/thaw-common-utilities.ts) -->

## Features

- Self-contained: No run-time package dependencies!

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

### Arrays of Numbers

### Array Sorting

### Asynchronous Functions

### Date/Time Functions

### JSON

### Lazy Evaluation

### Numbers

### Objects

### Regular Expressions

### Strings

### Types

### Trees

### Other Collections

## License
[MIT](https://choosealicense.com/licenses/mit/)

[build-status-badge-image]: https://secure.travis-ci.org/tom-weatherhead/common-utilities.ts.svg
[build-status-url]: https://travis-ci.org/tom-weatherhead/common-utilities.ts
[npm-version-badge-image]: https://img.shields.io/npm/v/thaw-common-utilities.ts.svg
[npm-version-url]: https://www.npmjs.com/package/thaw-common-utilities.ts
[latest-tag-badge-image]: https://badgen.net/github/tag/tom-weatherhead/common-utilities.ts
[latest-tag-url]: https://github.com/tom-weatherhead/common-utilities.ts/tags
[npm-total-downloads-badge-image]: https://img.shields.io/npm/dt/thaw-common-utilities.ts.svg
[npm-total-downloads-url]: https://www.npmjs.com/package/thaw-common-utilities.ts
[watchers-badge-image]: https://badgen.net/github/watchers/tom-weatherhead/common-utilities.ts
[watchers-url]: https://github.com/tom-weatherhead/common-utilities.ts/watchers
[stars-badge-image]: https://badgen.net/github/stars/tom-weatherhead/common-utilities.ts
[stars-url]: https://github.com/tom-weatherhead/common-utilities.ts/stargazers
[forks-badge-image]: https://badgen.net/github/forks/tom-weatherhead/common-utilities.ts
[forks-url]: https://github.com/tom-weatherhead/common-utilities.ts/network/members
[repo-dependents-badge-image]: https://badgen.net/github/dependents-repo/tom-weatherhead/common-utilities.ts
[repo-dependents-url]: https://badgen.net/github/dependents-repo/tom-weatherhead/common-utilities.ts
[pkg-dependents-badge-image]: https://badgen.net/github/dependents-pkg/tom-weatherhead/common-utilities.ts
[pkg-dependents-url]: https://badgen.net/github/dependents-pkg/tom-weatherhead/common-utilities.ts
[commits-badge-image]: https://badgen.net/github/commits/tom-weatherhead/common-utilities.ts
[commits-url]: https://github.com/tom-weatherhead/common-utilities.ts/commits/master
[last-commit-badge-image]: https://badgen.net/github/last-commit/tom-weatherhead/common-utilities.ts
[last-commit-url]: https://badgen.net/github/last-commit/tom-weatherhead/common-utilities.ts
[types-badge-image]: https://badgen.net/npm/types/thaw-common-utilities.ts
[types-url]: https://badgen.net/npm/types/thaw-common-utilities.ts
[install-size-badge-image]: https://badgen.net/packagephobia/install/thaw-common-utilities.ts
[install-size-url]: https://badgen.net/packagephobia/install/thaw-common-utilities.ts
[known-vulnerabilities-badge-image]: https://snyk.io/test/github/tom-weatherhead/common-utilities.ts/badge.svg?targetFile=package.json&package-lock.json
[known-vulnerabilities-url]: https://snyk.io/test/github/tom-weatherhead/common-utilities.ts?targetFile=package.json&package-lock.json
[lines-of-code-badge-image]: https://badgen.net/codeclimate/loc/tom-weatherhead/common-utilities.ts
[lines-of-code-url]: https://badgen.net/codeclimate/loc/tom-weatherhead/common-utilities.ts
[technical-debt-badge-image]: https://badgen.net/codeclimate/tech-debt/tom-weatherhead/common-utilities.ts
[technical-debt-url]: https://badgen.net/codeclimate/tech-debt/tom-weatherhead/common-utilities.ts
[maintainability-badge-image]: https://api.codeclimate.com/v1/badges/2a66d64a08223583a60d/maintainability
[maintainability-url]: https://codeclimate.com/github/tom-weatherhead/common-utilities.ts/maintainability
[test-coverage-badge-image]: https://api.codeclimate.com/v1/badges/2a66d64a08223583a60d/test_coverage
[test-coverage-url]: https://codeclimate.com/github/tom-weatherhead/common-utilities.ts/test_coverage
[jest-badge-image]: https://img.shields.io/badge/tested_with-jest-99424f.svg
[jest-url]: https://github.com/facebook/jest
[prettier-badge-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[license-badge-image]: https://img.shields.io/github/license/mashape/apistatus.svg
[license-url]: https://github.com/tom-weatherhead/common-utilities.ts/blob/master/LICENSE
[fossa-badge-image]: https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fmoment%2Fmoment.svg?type=shield
[fossa-badge-url]: https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2Fmoment%2Fmoment?ref=badge_shield
