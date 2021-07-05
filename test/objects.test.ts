// github:tom-weatherhead/common-utilities.ts/test/objects.test.ts

'use strict';

import { deepEquals } from '..';

test('deepEquals test', () => {
	// Arrange
	// Act
	// Assert
	expect(deepEquals(0, 0)).toBeTruthy();
	expect(deepEquals(1, 1)).toBeTruthy();
	expect(deepEquals(0, 1)).toBeFalsy();

	expect(deepEquals(new Date('2021-01-01'), new Date('2021-01-01'))).toBeTruthy();

	expect(deepEquals({}, {})).toBeTruthy();
	expect(deepEquals([], [])).toBeTruthy();
	expect(deepEquals({}, [])).toBeFalsy();

	expect(deepEquals([1, 2, [3, 4, 5]], [1, 2, [3, 4, 5]])).toBeTruthy();
	expect(deepEquals([1, 2, [3, 4, 5]], [1, 2, [4, 4, 5]])).toBeFalsy();
	expect(deepEquals([1, 2, [3, 4, 5]], [1, 2, [4, 4, 5], 6])).toBeFalsy();

	expect(deepEquals([{ a: 1 }, { b: 2, c: 3 }], [{ a: 1 }, { b: 2, c: 3 }])).toBeTruthy();
	expect(deepEquals([{ a: 1 }, { b: 2, c: 3 }], [{ a: 1 }, { c: 3, b: 2 }])).toBeTruthy();
	expect(deepEquals([{ a: 1 }, { b: 2, c: 3 }], [{ b: 2, c: 3 }, { a: 1 }])).toBeFalsy();
});
