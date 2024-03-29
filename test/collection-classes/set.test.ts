// github:tom-weatherhead/common-utilities.ts/test/collection-classes/set.test.ts

'use strict';

import { createSet } from '../..';

test('Set test 1', () => {
	// Arrange
	const set = createSet<number>();

	// Act
	// Assert
	expect(set).toBeTruthy();
	expect(set.isEmpty()).toBeTruthy();
});

test('Set test 2', () => {
	// Arrange
	const set = createSet<number>();
	const item1 = 2;
	const item2 = 3;
	const item3 = 5;
	const absentItem = 4;

	// Act
	set.add(item1);
	set.add(item2);
	set.add(item3);

	// Assert
	expect(set).toBeTruthy();
	expect(set.isEmpty()).toBeFalsy();
	expect(set.contains(item1)).toBeTruthy();
	expect(set.contains(item2)).toBeTruthy();
	expect(set.contains(item3)).toBeTruthy();
	expect(set.contains(absentItem)).toBeFalsy();
});

test('Set test 3', () => {
	// Arrange
	const set = createSet<number>();
	const item1 = 2;
	const item2 = 3;
	const item3 = 5;
	const itemToRemove = item2;

	// Act
	set.add(item1);
	set.add(item2);
	set.add(item3);

	// Assert
	expect(set).toBeTruthy();
	expect(set.isEmpty()).toBeFalsy();
	expect(set.contains(item1)).toBeTruthy();
	expect(set.contains(item2)).toBeTruthy();
	expect(set.contains(item3)).toBeTruthy();

	// Act 2
	set.remove(itemToRemove);

	// Assert 2
	expect(set.contains(itemToRemove)).toBeFalsy();
});

test('Set test 4', () => {
	// Arrange
	const set = createSet<number>();
	const item1 = 2;
	const item2 = 3;
	const item3 = 5;

	// Act
	set.add(item1);
	set.add(item2);
	set.add(item3);

	// Assert
	expect(set).toBeTruthy();
	expect(set.isEmpty()).toBeFalsy();
	expect(set.contains(item1)).toBeTruthy();
	expect(set.contains(item2)).toBeTruthy();
	expect(set.contains(item3)).toBeTruthy();

	// Act 2
	set.clear();

	// Assert 2
	expect(set).toBeTruthy();
	expect(set.isEmpty()).toBeTruthy();
	expect(set.contains(item1)).toBeFalsy();
	expect(set.contains(item2)).toBeFalsy();
	expect(set.contains(item3)).toBeFalsy();
});

test('unionInPlace test', () => {
	// Arrange
	const set1 = createSet([1, 3, 5, 7]);
	const set2 = createSet([2, 8]);
	const expectedResult = createSet([1, 2, 3, 5, 7, 8]);

	// Act
	set1.unionInPlace(set2);

	// Assert
	expect(set1.equals(expectedResult)).toBeTruthy();
});

test('getAllSubsets test', () => {
	// Arrange
	const set = createSet([1, 2, 3]);
	const expectedResult = [
		createSet([1, 2, 3]),
		createSet([1, 2]),
		createSet([1, 3]),
		createSet([1]),
		createSet([2, 3]),
		createSet([2]),
		createSet([3]),
		createSet([])
	];

	// Act
	const actualResult = set.getAllSubsets();

	// Assert
	expect(actualResult).toStrictEqual(expectedResult);
});
