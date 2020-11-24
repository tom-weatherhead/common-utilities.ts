// github:tom-weatherhead/common-utilities.ts/test/arraysOfNumbers.test.ts

'use strict';

import * as engine from '../esm/main';

const array1Unsorted = [8, 6, 7, 5, 3, 0, 9];

test('mean Test', () => {
	// Arrange
	const input = [2, 3, 5, 7];
	const expectedValue = 4.25;

	// Act
	const actualValue = engine.mean(input);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

test('median Test', () => {
	// Arrange
	const input = [1, 9, 1, 4, 6, 3, 2, 7, 8];
	const expectedValue = 4;

	// Act
	const actualValue = engine.median(input);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

// test('dotProductVersion1 test 1', () => {
// 	// Arrange
// 	const expectedValue: number = 35;

// 	// Act
// 	const actualValue: number = engine.dotProductVersion1([1, 8], [3, 4]);

// 	// Assert
// 	expect(actualValue).toEqual(expectedValue);
// });

test('dotProduct test 1', () => {
	// Arrange
	const expectedValue = 233;

	// Act
	const actualValue: number = engine.dotProduct(
		[3, 7, 5, 2],
		[1, 8],
		[3, 4, 5]
	);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

// test('crossProductVersion1 test 1', () => {
// 	// Arrange
// 	const expectedValue: number[][] = [
// 		[1, 3],
// 		[1, 4],
// 		[8, 3],
// 		[8, 4]
// 	];

// 	// Act
// 	const actualValue: number[][] = engine.crossProductVersion1(
// 		[1, 8],
// 		[3, 4]
// 	);

// 	// Assert
// 	expect(actualValue).toStrictEqual(expectedValue);
// });

test('crossProduct test 1', () => {
	// Arrange
	const expectedValue: number[][] = [[]];

	// Act
	const actualValue: number[][] = engine.crossProduct();

	// Assert
	expect(actualValue).toStrictEqual(expectedValue);
});

test('crossProduct test 2', () => {
	// Arrange
	const expectedValue: number[][] = [[1], [2], [3]];

	// Act
	const actualValue: number[][] = engine.crossProduct([1, 2, 3]);

	// Assert
	expect(actualValue).toStrictEqual(expectedValue);
});

test('crossProduct test 3', () => {
	// Arrange
	const expectedValue: number[][] = [
		[1, 4],
		[1, 5],
		[2, 4],
		[2, 5],
		[3, 4],
		[3, 5]
	];

	// Act
	const actualValue: number[][] = engine.crossProduct([1, 2, 3], [4, 5]);

	// Assert
	expect(actualValue).toStrictEqual(expectedValue);
});

test('crossProduct test 4', () => {
	// Arrange
	const expectedValue: number[][] = [
		[1, 4, 6],
		[1, 4, 7],
		[1, 4, 8],
		[1, 5, 6],
		[1, 5, 7],
		[1, 5, 8],
		[2, 4, 6],
		[2, 4, 7],
		[2, 4, 8],
		[2, 5, 6],
		[2, 5, 7],
		[2, 5, 8],
		[3, 4, 6],
		[3, 4, 7],
		[3, 4, 8],
		[3, 5, 6],
		[3, 5, 7],
		[3, 5, 8]
	];

	// Act
	const actualValue: number[][] = engine.crossProduct(
		[1, 2, 3],
		[4, 5],
		[6, 7, 8]
	);

	// Assert
	expect(actualValue).toStrictEqual(expectedValue);
});

test('covariance and correlationCoefficient Test', () => {
	// Arrange
	const srcArray1 = array1Unsorted;
	const srcArray2 = srcArray1.map(engine.negate);
	const srcArray3 = engine.createArrayFromElement(1, srcArray1.length);
	const expectedValue1 = 1;
	const expectedValue2 = -1;
	// const expectedValue3 = 0;
	const squared = (x: number) => x * x;

	// Act
	const actualValue1 = engine.populationCorrelationCoefficient(
		srcArray1,
		srcArray1
	);
	const actualValue2 = engine.populationCorrelationCoefficient(
		srcArray1,
		srcArray2
	);
	const actualValue3 = engine.populationCorrelationCoefficient(
		srcArray1,
		srcArray3
	);

	// Assert
	expect(engine.populationCovariance(srcArray1, srcArray1)).toEqual(
		squared(engine.standardDeviation(srcArray1))
	);
	expect(engine.populationCovariance(srcArray2, srcArray2)).toEqual(
		squared(engine.standardDeviation(srcArray2))
	);
	expect(engine.populationCovariance(srcArray3, srcArray3)).toEqual(
		squared(engine.standardDeviation(srcArray3))
	);
	expect(actualValue1).toEqual(expectedValue1);
	expect(actualValue2).toEqual(expectedValue2);
	// expect(actualValue3).toEqual(expectedValue3);
	expect(Number.isNaN(actualValue3)).toBeTruthy();
});
