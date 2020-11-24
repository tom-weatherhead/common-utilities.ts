/**
 * Copyright (c) Tom Weatherhead. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// From https://stackoverflow.com/questions/63752210/javascript-module-require-is-not-defined :

/*
Try checking if module exists:

// utils.js

function foo() { return 42; }

if(module) module.exports = {foo}; // On node.js, use exports
else if(window) window.foo = foo; // In browser, use window
else console.error('Unknown environment');
 */

'use strict';

// export default { // if "type": "module" in package.json
module.exports = { // if not
	'collectCoverage': true,
	'coverageDirectory': './coverage/',
	'moduleFileExtensions': ['ts', 'js'],
	'runner': 'jest-runner-tsc',
	'testEnvironment': 'node',
	'testRegex': '(/test/.+\\.test\\.ts$)' // ,
	// 'transformIgnorePatterns': ['/node_modules/(?!thaw-common-utilities.ts)/']
};
