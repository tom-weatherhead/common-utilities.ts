// github:tom-weatherhead/common-utilities.ts/test/functions.test.ts

'use strict';

import * as engine from '..';

test('booleanInvertFunction', () => {
	// Arrange
	// Act
	// Assert
	expect(engine.booleanInvertFunction(false)).toBe(true);
	expect(engine.booleanInvertFunction(true)).toBe(false);
});

test('compositeFunctions', () => {
	// Arrange
	const expectedResult = [10, 11, 12];
	const fn1 = (arg: number) => arg * 2;
	const fn2 = (arg: number) => [arg, arg + 1, arg + 2];

	// Act
	const fnComposite = engine.compositeFunctions([fn1, fn2]);
	const actualResult = fnComposite(5);

	// Assert
	expect(actualResult).toStrictEqual(expectedResult);
});

test('curry Test', () => {
	// Arrange
	const expectedResult = 6;

	// Act
	const actualResult = engine.curry(
		(x: number, y: number, z: number) => x + y + z
	)(1)(2)(3);

	// Assert
	expect(actualResult).toBe(expectedResult);
});
