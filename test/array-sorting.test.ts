// github:tom-weatherhead/common-utilities.ts/test/array-sorting.test.ts

'use strict';

import * as engine from '../esm/main';

const array1Unsorted = [8, 6, 7, 5, 3, 0, 9];
const array1Sorted = [0, 3, 5, 6, 7, 8, 9];

test('Sort Test 1: bubbleSort', () => {
	// Arrange
	const input = array1Unsorted;
	const expectedValue = array1Sorted;

	// Act
	const actualValue = engine.bubbleSort(input, engine.numericalComparator);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

test('Sort Test 2: heapSort', () => {
	// Arrange
	const input = array1Unsorted;
	const expectedValue = array1Sorted;

	// Act
	const actualValue = engine.heapSort(input, engine.numericalComparator);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

test('Sort Test 3: insertionSort', () => {
	// Arrange
	const input = array1Unsorted;
	const expectedValue = array1Sorted;

	// Act
	const actualValue = engine.insertionSort(
		input,
		engine.numericalComparator
	);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

test('Sort Test 4: mergeSort', () => {
	// Arrange
	const input = array1Unsorted;
	const expectedValue = array1Sorted;

	// Act
	const actualValue = engine.mergeSort(input, engine.numericalComparator);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

test('Sort Test 5: quickSort', () => {
	// Arrange
	const input = array1Unsorted;
	const expectedValue = array1Sorted;

	// Act
	const actualValue = engine.quickSort(input, engine.numericalComparator);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

test('Sort Test 6: shellSort', () => {
	// Arrange
	const input = array1Unsorted;
	const expectedValue = array1Sorted;

	// Act
	const actualValue = engine.shellSort(input, engine.numericalComparator);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});
