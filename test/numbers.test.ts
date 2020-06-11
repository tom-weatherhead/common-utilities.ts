// github:tom-weatherhead/common-utilities.ts/test/numbers.test.ts

'use strict';

import * as engine from '../lib/main';

test('fnAddition', () => {
	// Arrange
	const expectedValue: number = 5;

	// Act
	const actualValue: number = engine.fnAddition(2, 3);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

test('generateRange Test 1', () => {
	// Arrange
	const start = 3;
	const end = 5;
	const expectedValue = [3, 4, 5];

	// Act
	const actualValue = engine.generateRange(start, end);

	// Assert
	expect(actualValue).toStrictEqual(expectedValue);
});

test('generateRange Test 2', () => {
	// Arrange
	const start = 8;
	const end = 8;
	const expectedValue = [8];

	// Act
	const actualValue = engine.generateRange(start, end);

	// Assert
	expect(actualValue).toStrictEqual(expectedValue);
});

test('generateRange Test 3', () => {
	// Arrange
	const start = 8;
	const end = 7;
	const expectedValue: number[] = [];

	// Act
	const actualValue = engine.generateRange(start, end);

	// Assert
	expect(actualValue).toStrictEqual(expectedValue);
});

test('generateFirstNNaturalNumbers Test', () => {
	// Arrange
	const n = 7;
	const expectedValue = [1, 2, 3, 4, 5, 6, 7];

	// Act
	const actualValue = engine.generateFirstNNaturalNumbers(n);

	// Assert
	expect(actualValue).toStrictEqual(expectedValue);
});

test('zeroPadNumber Test', () => {
	// Arrange
	const n = 13;
	const desiredMinLength = 4;
	const expectedValue = '0013';

	// Act
	const actualValue = engine.zeroPadNumber(n, desiredMinLength);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

// test('sum Test 1', () => {
// 	// Arrange
// 	const input = ['abc', 'def'];
// 	const expectedValue = undefined;

// 	// Act
// 	const actualValue = engine.sum(...input);

// 	// Assert
// 	expect(actualValue).toStrictEqual(expectedValue);
// });

test('sum Test 2', () => {
	// Arrange
	const input: number[] = [];
	const expectedValue = 0;

	// Act
	const actualValue = engine.sum(...input);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

test('sum Test 3', () => {
	// Arrange
	const input = [2, 3, 5, 7];
	const expectedValue = 17;

	// Act
	const actualValue = engine.sum(...input);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

// test('sum Test 4', () => {
// 	// Arrange
// 	const input = [1, 'a', 2, {}, 3, /abc/, 4];
// 	const expectedValue = 10;

// 	// Act
// 	const actualValue = engine.sum(...input);

// 	// Assert
// 	expect(actualValue).toStrictEqual(expectedValue);
// });

test('product Test 1', () => {
	// Arrange
	const input = [2, 3, 5, 7];
	const expectedValue = 210;

	// Act
	const actualValue = engine.product(...input);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

// test('product Test 2', () => {
// 	// Arrange
// 	const input = [1, 'a', 2, {}, 3, /abc/, 4];
// 	const expectedValue = 24;

// 	// Act
// 	const actualValue = engine.product(...input);

// 	// Assert
// 	expect(actualValue).toStrictEqual(expectedValue);
// });

test('histogram Test', () => {
	// Arrange
	const input = [5, 1, 2, 5, 6, 5, 5, 2, 1, 8, 5, 7, 5];
	// const expectedValue = {
	// 	1: 2,
	// 	2: 2,
	// 	5: 6,
	// 	6: 1,
	// 	7: 1,
	// 	8: 1
	// };
	const expectedValue = new Map();

	expectedValue.set(1, 2);
	expectedValue.set(2, 2);
	expectedValue.set(5, 6);
	expectedValue.set(6, 1);
	expectedValue.set(7, 1);
	expectedValue.set(8, 1);

	// Act
	const actualValue = engine.histogram(input);

	// Assert
	expect(actualValue).toStrictEqual(expectedValue);
});

test('mode Test', () => {
	// Arrange
	const input = [5, 1, 2, 5, 6, 5, 5, 2, 1, 8, 5, 7, 5];
	const expectedValue = {
		// element: '5',
		element: 5, // The histogram() function uses the elements of the input array as keys in an object, so they are converted to strings.
		count: 6
	};

	// Act
	const actualValue = engine.mode(input);

	// Assert
	expect(actualValue).toStrictEqual(expectedValue);
});

test('zeroExtendNumber Test', () => {
	// Arrange
	const n = 1.25;
	const minNumberOfDecimalPlaces = 5;
	const expectedValue = '1.25000';

	// Act
	const actualValue = engine.zeroExtendNumber(n, minNumberOfDecimalPlaces);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

test('getSign Test', () => {
	// Arrange
	// const input1 = 'Foo';
	const input2 = 3.14;
	const input3 = -4;
	const input4 = 0;
	// const expectedValue1 = undefined;
	const expectedValue2 = 1;
	const expectedValue3 = -1;
	const expectedValue4 = 0;

	// Act
	// const actualValue1 = engine.getSign(input1);
	const actualValue2 = engine.getSign(input2);
	const actualValue3 = engine.getSign(input3);
	const actualValue4 = engine.getSign(input4);

	// Assert
	// expect(actualValue1).toEqual(expectedValue1);
	expect(actualValue2).toEqual(expectedValue2);
	expect(actualValue3).toEqual(expectedValue3);
	expect(actualValue4).toEqual(expectedValue4);
});

test('isInteger Test', () => {
	// Arrange
	const input1 = 0;
	const input2 = 1;
	const input3 = -1;
	const input4 = 12345;
	const input5 = 1.5;
	const input6 = undefined;
	const input7 = null;
	const input8 = NaN;
	const input9 = '';
	const input10 = 'abc';
	const input11: number[] = [];
	const input12 = [1, 2, 3];
	const input13 = {};
	const input14 = { a: 1, b: 2 };
	const input15 = /abc/;
	const expectedValue1 = true;
	const expectedValue2 = true;
	const expectedValue3 = true;
	const expectedValue4 = true;
	const expectedValue5 = false;
	const expectedValue6 = false;
	const expectedValue7 = false;
	const expectedValue8 = false;
	const expectedValue9 = false;
	const expectedValue10 = false;
	const expectedValue11 = false;
	const expectedValue12 = false;
	const expectedValue13 = false;
	const expectedValue14 = false;
	const expectedValue15 = false;

	// Act
	const actualValue1 = engine.isInteger(input1);
	const actualValue2 = engine.isInteger(input2);
	const actualValue3 = engine.isInteger(input3);
	const actualValue4 = engine.isInteger(input4);
	const actualValue5 = engine.isInteger(input5);
	const actualValue6 = engine.isInteger(input6);
	const actualValue7 = engine.isInteger(input7);
	const actualValue8 = engine.isInteger(input8);
	const actualValue9 = engine.isInteger(input9);
	const actualValue10 = engine.isInteger(input10);
	const actualValue11 = engine.isInteger(input11);
	const actualValue12 = engine.isInteger(input12);
	const actualValue13 = engine.isInteger(input13);
	const actualValue14 = engine.isInteger(input14);
	const actualValue15 = engine.isInteger(input15);

	// Assert
	expect(actualValue1).toEqual(expectedValue1);
	expect(actualValue2).toEqual(expectedValue2);
	expect(actualValue3).toEqual(expectedValue3);
	expect(actualValue4).toEqual(expectedValue4);
	expect(actualValue5).toEqual(expectedValue5);
	expect(actualValue6).toEqual(expectedValue6);
	expect(actualValue7).toEqual(expectedValue7);
	expect(actualValue8).toEqual(expectedValue8);
	expect(actualValue9).toEqual(expectedValue9);
	expect(actualValue10).toEqual(expectedValue10);
	expect(actualValue11).toEqual(expectedValue11);
	expect(actualValue12).toEqual(expectedValue12);
	expect(actualValue13).toEqual(expectedValue13);
	expect(actualValue14).toEqual(expectedValue14);
	expect(actualValue15).toEqual(expectedValue15);
});

test('isNonNegativeInteger Test', () => {
	// Arrange
	const input1 = 0;
	const input2 = 1;
	const input3 = -1;
	const input4 = 12345;
	const input5 = 1.5;
	const input6 = undefined;
	const input7 = null;
	const input8 = NaN;
	const input9 = '';
	const input10 = 'abc';
	const input11: number[] = [];
	const input12 = [1, 2, 3];
	const input13 = {};
	const input14 = { a: 1, b: 2 };
	const input15 = /abc/;
	const expectedValue1 = true;
	const expectedValue2 = true;
	const expectedValue3 = false;
	const expectedValue4 = true;
	const expectedValue5 = false;
	const expectedValue6 = false;
	const expectedValue7 = false;
	const expectedValue8 = false;
	const expectedValue9 = false;
	const expectedValue10 = false;
	const expectedValue11 = false;
	const expectedValue12 = false;
	const expectedValue13 = false;
	const expectedValue14 = false;
	const expectedValue15 = false;

	// Act
	const actualValue1 = engine.isNonNegativeInteger(input1);
	const actualValue2 = engine.isNonNegativeInteger(input2);
	const actualValue3 = engine.isNonNegativeInteger(input3);
	const actualValue4 = engine.isNonNegativeInteger(input4);
	const actualValue5 = engine.isNonNegativeInteger(input5);
	const actualValue6 = engine.isNonNegativeInteger(input6);
	const actualValue7 = engine.isNonNegativeInteger(input7);
	const actualValue8 = engine.isNonNegativeInteger(input8);
	const actualValue9 = engine.isNonNegativeInteger(input9);
	const actualValue10 = engine.isNonNegativeInteger(input10);
	const actualValue11 = engine.isNonNegativeInteger(input11);
	const actualValue12 = engine.isNonNegativeInteger(input12);
	const actualValue13 = engine.isNonNegativeInteger(input13);
	const actualValue14 = engine.isNonNegativeInteger(input14);
	const actualValue15 = engine.isNonNegativeInteger(input15);

	// Assert
	expect(actualValue1).toEqual(expectedValue1);
	expect(actualValue2).toEqual(expectedValue2);
	expect(actualValue3).toEqual(expectedValue3);
	expect(actualValue4).toEqual(expectedValue4);
	expect(actualValue5).toEqual(expectedValue5);
	expect(actualValue6).toEqual(expectedValue6);
	expect(actualValue7).toEqual(expectedValue7);
	expect(actualValue8).toEqual(expectedValue8);
	expect(actualValue9).toEqual(expectedValue9);
	expect(actualValue10).toEqual(expectedValue10);
	expect(actualValue11).toEqual(expectedValue11);
	expect(actualValue12).toEqual(expectedValue12);
	expect(actualValue13).toEqual(expectedValue13);
	expect(actualValue14).toEqual(expectedValue14);
	expect(actualValue15).toEqual(expectedValue15);
});

test('isPositiveInteger Test', () => {
	// Arrange
	const input1 = 0;
	const input2 = 1;
	const input3 = -1;
	const input4 = 12345;
	const input5 = 1.5;
	const input6 = undefined;
	const input7 = null;
	const input8 = NaN;
	const input9 = '';
	const input10 = 'abc';
	const input11: number[] = [];
	const input12 = [1, 2, 3];
	const input13 = {};
	const input14 = { a: 1, b: 2 };
	const input15 = /abc/;
	const expectedValue1 = false;
	const expectedValue2 = true;
	const expectedValue3 = false;
	const expectedValue4 = true;
	const expectedValue5 = false;
	const expectedValue6 = false;
	const expectedValue7 = false;
	const expectedValue8 = false;
	const expectedValue9 = false;
	const expectedValue10 = false;
	const expectedValue11 = false;
	const expectedValue12 = false;
	const expectedValue13 = false;
	const expectedValue14 = false;
	const expectedValue15 = false;

	// Act
	const actualValue1 = engine.isPositiveInteger(input1);
	const actualValue2 = engine.isPositiveInteger(input2);
	const actualValue3 = engine.isPositiveInteger(input3);
	const actualValue4 = engine.isPositiveInteger(input4);
	const actualValue5 = engine.isPositiveInteger(input5);
	const actualValue6 = engine.isPositiveInteger(input6);
	const actualValue7 = engine.isPositiveInteger(input7);
	const actualValue8 = engine.isPositiveInteger(input8);
	const actualValue9 = engine.isPositiveInteger(input9);
	const actualValue10 = engine.isPositiveInteger(input10);
	const actualValue11 = engine.isPositiveInteger(input11);
	const actualValue12 = engine.isPositiveInteger(input12);
	const actualValue13 = engine.isPositiveInteger(input13);
	const actualValue14 = engine.isPositiveInteger(input14);
	const actualValue15 = engine.isPositiveInteger(input15);

	// Assert
	expect(actualValue1).toEqual(expectedValue1);
	expect(actualValue2).toEqual(expectedValue2);
	expect(actualValue3).toEqual(expectedValue3);
	expect(actualValue4).toEqual(expectedValue4);
	expect(actualValue5).toEqual(expectedValue5);
	expect(actualValue6).toEqual(expectedValue6);
	expect(actualValue7).toEqual(expectedValue7);
	expect(actualValue8).toEqual(expectedValue8);
	expect(actualValue9).toEqual(expectedValue9);
	expect(actualValue10).toEqual(expectedValue10);
	expect(actualValue11).toEqual(expectedValue11);
	expect(actualValue12).toEqual(expectedValue12);
	expect(actualValue13).toEqual(expectedValue13);
	expect(actualValue14).toEqual(expectedValue14);
	expect(actualValue15).toEqual(expectedValue15);
});

test('integerDivision Test', () => {
	// Arrange
	const numerator1 = 22;
	const numerator2 = 0;
	// const numerator3 = 'abc';
	const denominator1 = 7;
	const denominator2 = 0;
	// const denominator3 = 'def';
	const expectedValue1 = 3;

	// Act
	const actualValue1 = engine.integerDivision(numerator1, denominator1);
	const actualValue2 = engine.integerDivision(numerator2, denominator2);
	// const actualValue3 = engine.integerDivision(numerator3, denominator3);

	// Assert
	expect(actualValue1).toEqual(expectedValue1);
	expect(Number.isNaN(actualValue2)).toBeTruthy();
	// expect(Number.isNaN(actualValue3)).toBeTruthy();
});
