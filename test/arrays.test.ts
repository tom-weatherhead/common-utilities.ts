// github:tom-weatherhead/common-utilities.ts/test/arrays.test.ts

'use strict';

import * as engine from '..';

test('max', () => {
	// Arrange
	const expectedValue = 9;

	// Act
	const actualValue: number = engine.max([8, 6, 9, 5, 3, 0, 7]);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

test('min', () => {
	// Arrange
	const expectedValue = 1;

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
	const expectedValue: number[][] = [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]];

	// Act
	const actualValue: number[][] = engine.generateAllSubsets([1, 2, 3]);

	// Assert
	expect(actualValue).toStrictEqual(expectedValue);
});

test('transpose2d', () => {
	// Arrange
	const input = [
		['A1', 'A2', 'A3'],
		['B1', 'B2', 'B3', 'B4'],
		['C1', 'C2', 'C3']
	];
	const expectedResult = [
		['A1', 'B1', 'C1'],
		['A2', 'B2', 'C2'],
		['A3', 'B3', 'C3']
	];

	// Act
	const actualResult = engine.transpose2d(input);

	// Assert
	expect(actualResult).toStrictEqual(expectedResult);
});

test('cascade 1', () => {
	// Arrange
	const fn = (seed: number, n: number) => 2 * seed + n;
	const inputArray = [1, 2, 3, 4, 5, 6, 7];
	const seed = 3;

	const expectedResult = [7, 16, 35, 74, 153, 312, 631];

	// Act
	const actualResult = engine.cascade(fn, seed, inputArray);

	// Assert
	expect(actualResult).toStrictEqual(expectedResult);
});
