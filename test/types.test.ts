// github:tom-weatherhead/common-utilities.ts/test/types.test.ts

'use strict';

import * as engine from '../lib/main';

test('Type Tests', () => {
	// Arrange
	let undefinedVar;
	const definedVar = 0;
	const testDate = new Date();
	const testArrayOfNumbers = [2, 3, 5, 7];
	const testObject = { key1: 'value1', key3: 3 };
	const testFunction = (a: number, b: number) => a + b;
	const testRegularExpression = /^[0-9]+$/;
	const testString = 'Hello world!';

	// Act
	// Assert
	expect(engine.getTypeString(undefined)).toBe('[object Undefined]');

	// The six 'falsy' values in JavaScript:
	expect(engine.isDefined(undefined)).toBe(false);
	expect(engine.isDefined(null)).toBe(true);
	expect(engine.isDefined(0)).toBe(true);
	expect(engine.isDefined(NaN)).toBe(true);
	expect(engine.isDefined('')).toBe(true);
	expect(engine.isDefined(false)).toBe(true);

	expect(engine.isDefined([])).toBe(true);
	expect(engine.isDefined({})).toBe(true);
	expect(engine.isDefined(/abc/)).toBe(true);
	expect(engine.isDefined(undefinedVar)).toBe(false);
	expect(engine.isDefined(definedVar)).toBe(true);
	expect(engine.isDefined(testObject.key1)).toBe(true);
	// expect(engine.isDefined(testObject.key2)).toBe(false);

	expect(engine.getTypeString(testDate)).toBe('[object Date]');
	expect(engine.isDate(testDate)).toBe(true);
	expect(engine.getTypeString(testArrayOfNumbers)).toBe('[object Array]');
	expect(engine.isArray(testArrayOfNumbers)).toBe(true);
	expect(engine.isArrayOfNumbers(testArrayOfNumbers)).toBe(true);
	expect(engine.getTypeString(testArrayOfNumbers[0])).toBe(
		'[object Number]'
	);
	expect(engine.isNumber(testArrayOfNumbers[0])).toBe(true);
	expect(engine.isNumber(NaN)).toBe(false);
	expect(engine.isNumber(Infinity)).toBe(true);
	expect(engine.isNumber(Number.EPSILON)).toBe(true);
	expect(engine.getTypeString(false)).toBe('[object Boolean]');
	expect(engine.getTypeString(true)).toBe('[object Boolean]');
	expect(engine.isBoolean(false)).toBe(true);
	expect(engine.isBoolean(true)).toBe(true);
	expect(engine.isBoolean(null)).toBe(false);
	expect(engine.isBoolean(undefined)).toBe(false);
	expect(engine.isBoolean(0)).toBe(false);
	expect(engine.isBoolean(1)).toBe(false);
	expect(engine.isBoolean(NaN)).toBe(false);
	expect(engine.getTypeString(testFunction)).toBe('[object Function]');
	expect(engine.isFunction(testFunction)).toBe(true);
	expect(engine.getTypeString(testObject)).toBe('[object Object]');
	expect(engine.isObject(testObject)).toBe(true);
	expect(engine.getTypeString(testRegularExpression)).toBe(
		'[object RegExp]'
	);
	expect(engine.isRegularExpression(testRegularExpression)).toBe(true);
	expect(engine.getTypeString(testString)).toBe('[object String]');
	expect(engine.isString(testString)).toBe(true);
});

test('isArray Tests', () => {
	expect(engine.isArray([1, 2, 3])).toBe(true);
	expect(engine.isArray(undefined)).toBe(false);
	expect(engine.isArray(null)).toBe(false);
	expect(engine.isArray(true)).toBe(false);
	expect(engine.isArray(0)).toBe(false);
	expect(engine.isArray(/abc/)).toBe(false);
	expect(engine.isArray({})).toBe(false);
	expect(engine.isArray('abc')).toBe(false);
});

test('isArrayOfNumbers Tests', () => {
	expect(engine.isArrayOfNumbers([])).toBe(true);
	expect(engine.isArrayOfNumbers([1, 2.5, -3])).toBe(true);
	expect(engine.isArrayOfNumbers(['abc'])).toBe(false);
	expect(engine.isArrayOfNumbers([1, 2, 3, false])).toBe(false);
});
