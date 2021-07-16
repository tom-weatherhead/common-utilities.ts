// github:tom-weatherhead/common-utilities.ts/test/functors.test.ts

'use strict';

import * as engine from '..';

test('UniversalFunctor test 1', () => {
	// Arrange
	const expectedResult = [4, 6, 10];
	const fnMapElement = (n: number) => 2 * n;
	const fnMapArray = (array: number[]) => array.map(fnMapElement);

	// Act
	const actualResult: number[] = engine.createFunctor([2, 3, 5]).map(fnMapArray).getValue();

	// Assert
	expect(actualResult).toEqual(expectedResult);
});

test('UniversalFunctor test 2', () => {
	// Arrange
	const expectedResult = 7;
	const fnToString = (value: unknown) => value.toString();
	const fnStringToLength = (str: string) => str.length;
	const initialValue = 8675309;

	// Act
	const actualResult = engine
		.createFunctor(initialValue)
		.map(fnToString)
		.map(fnStringToLength)
		.getValue();

	// Assert
	expect(actualResult).toEqual(expectedResult);
});
