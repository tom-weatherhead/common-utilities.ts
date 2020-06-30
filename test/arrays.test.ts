// github:tom-weatherhead/common-utilities.ts/test/arrays.test.ts

'use strict';

import * as engine from '../lib/es2015/main';

test('max', () => {
	// Arrange
	const expectedValue: number = 9;

	// Act
	const actualValue: number = engine.max([8, 6, 9, 5, 3, 0, 7]);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

test('min', () => {
	// Arrange
	const expectedValue: number = 1;

	// Act
	const actualValue: number = engine.min([8, 6, 9, 5, 3, 1, 7]);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

test('maxEmptyArray', () => {
	// Arrange
	// Act
	// Assert
	// Jest: toThrow() : See https://jestjs.io/docs/en/expect#tothrowerror
	expect(() => engine.max([])).toThrow();
});

test('generateAllSubsets', () => {
	// Arrange
	const expectedValue: number[][] = [
		[],
		[3],
		[2],
		[2, 3],
		[1],
		[1, 3],
		[1, 2],
		[1, 2, 3]
	];

	// Act
	const actualValue: number[][] = engine.generateAllSubsets([1, 2, 3]);

	// Assert
	expect(actualValue).toStrictEqual(expectedValue);
});
