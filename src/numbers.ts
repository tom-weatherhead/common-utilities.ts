// github:tom-weatherhead/common-utilities.ts/src/numbers.ts

'use strict';

import { createArrayFromElement } from './arrays';

import { replicateString } from './strings';

import { isNumber } from './types';

export function isSafeNumber(arg: unknown): boolean {
	return (
		typeof arg === 'number' && !Number.isNaN(arg) && Number.isFinite(arg)
	);
}

export const fnIsGreaterThan = (x: number, y: number): boolean => x > y;
export const fnIsLessThan = (x: number, y: number): boolean => x < y;

export const fnAddition = (a: number, b: number): number => a + b;
export const additiveIdentity = 0;

export const fnSubtraction = (a: number, b: number): number => a - b;

export const fnMultiplication = (a: number, b: number): number => a * b;
export const multiplicativeIdentity = 1;

// export const fnSafeDivision = (a: number, b: number, dflt = 0): number =>
// 	!b ? dflt : a / b;

export function fnSafeDivision(a: number, b: number, dflt = 0): number {
	// return Number.isNaN(a) || !b ? dflt : a / b;

	let result: number;

	try {
		result = a / b;
	} catch (error) {
		result = NaN; // Not a safe number.
	}

	return isSafeNumber(result) ? result : dflt;
}

export function getSign(n: number): number {
	if (!isNumber(n)) {
		return NaN;
	} else if (n > 0) {
		return 1;
	} else if (n < 0) {
		return -1;
	} else {
		return 0;
	}
}

// range() : Stolen from https://stackoverflow.com/questions/36947847/how-to-generate-range-of-numbers-from-0-to-n-in-es2015-only#comment68007528_36953272

/**
 * range
 *
 * @method range
 * @param  {Int}   start				The smallest integer in the array to be generated
 * @param  {Int}   end					The largest integer in the array to be generated
 * @return {Array<Int>}					The integers from start to end, inclusive, in increasing order
 */
/*
function range (start, end) {
	// return [...Array(end - start + 1).keys()].map(n => start + n);

	return [...Array.from(Array(end - start + 1).keys())].map(n => start + n); // The Array.from() is for TypeScript, where Array.keys() returns an iterator, not an array.
}
 */

export function generateNonNegativeIntegersLessThan(n: number): number[] {
	// return generateRange(0, n - 1);
	return [...Array(n).keys()];
}

export function generateRange(start: number, end: number): number[] {
	// const result: number[] = [];

	// while (start <= end) {
	// 	result.push(start);
	// 	start++;
	// }

	// return result;
	// return [...Array(end - start + 1).keys()].map(n => start + n);
	return generateNonNegativeIntegersLessThan(end - start + 1).map(
		(n) => start + n
	);
}

export function generateFirstNNaturalNumbers(n: number): number[] {
	return generateRange(1, n);
}

export function getRandomNonNegativeInteger(n: number): number {
	// Returns a value in the range [0, 1, 2, ..., n - 1].

	if (Number.isNaN(n) || n <= 0) {
		return NaN;
	}

	if (n !== Math.floor(n)) {
		throw new Error(
			`getRandomNonNegativeInteger() : ${n} is not an integer.`
		);
	}

	return Math.floor(Math.random() * n);
}

export function zeroPadNumber(n: number, minLength: number): string {
	return (replicateString('0', minLength) + n).slice(-minLength);
}

export function zeroExtendNumber(
	n: number,
	minNumberOfDecimalPlaces: number
): string {
	let str = n.toString();
	let indexOfDecimalPoint = str.indexOf('.');

	if (indexOfDecimalPoint < 0) {
		indexOfDecimalPoint = str.length;
		str = str + '.';
	}

	return (
		str +
		replicateString(
			'0',
			indexOfDecimalPoint + 1 + minNumberOfDecimalPlaces - str.length
		)
	);
}

export function removeNonNumbers(arg: unknown[]): number[] {
	// return arg.map((o) => o as number).filter((o) => o !== undefined);

	return arg
		.filter((o) => typeof o === 'number')
		.map((o): number => o as number)
		.filter((n) => !Number.isNaN(n));
}

export function sum(...arg: unknown[]): number {
	return removeNonNumbers(arg).reduce(fnAddition, additiveIdentity);
}

export function arraySum(arg: unknown[]): number {
	return sum(...arg);
}

export function product(...arg: unknown[]): number {
	return removeNonNumbers(arg).reduce(
		fnMultiplication,
		multiplicativeIdentity
	);
}

type keyType = number | string;
type histogramType = Map<keyType, number>;

export function histogram(arg: keyType[]): histogramType {
	return arg.reduce(
		(accumulator: histogramType, element: keyType): histogramType => {
			// accumulator[element] = (accumulator[element] || 0) + 1;
			accumulator.set(element, (accumulator.get(element) || 0) + 1);

			return accumulator;
		},
		new Map<keyType, number>() // {}
	);
}

// export function histogramLookup(hist: object, key: number | string, fnEqual: (number | string, number | string) => boolean): number | undefined {
// 	const pair: [number | string, number] = hist.find((he: [number | string, number]) => fnEqual(he[0], key));
// export function histogramLookup(hist: object, key: keyType, fnEqual: (a: keyType, b: keyType) => boolean): number | undefined {
// 	const pair: [keyType, number] = hist.find((he: [keyType, number]) => fnEqual(he[0], key));

// 	if (pair) {
// 		return pair[1];
// 	} else {
// 		return undefined;
// 	}
// }
export function histogramLookup(
	hist: histogramType,
	key: keyType
): number | undefined {
	return hist.get(key);
}

interface IModeResult {
	element?: keyType;
	count: number;
}

export function mode(arg: keyType[]): IModeResult {
	const hist = histogram(arg);

	// return Object.keys(hist).reduce(
	// TODO: Call reduce() on a duplicate-free version of arg
	return arg.reduce(
		(accumulator: IModeResult, element: keyType) => {
			const elementCount = hist.get(element) || 0;

			if (elementCount > accumulator.count) {
				// accumulator = { element: element || undefined, count: elementCount };
				accumulator = { element, count: elementCount };
			}

			return accumulator;
		},
		{ element: undefined, count: 0 }
	);
}

export function aToThePowerOfB(a: number, b: number): number {
	return product(...createArrayFromElement(a, b));
}

export function tenToThePowerOfN(n: number): number {
	return aToThePowerOfB(10, n);
}

export function factory_fnRoundToNDigits(n: number): (m: number) => number {
	const valueOfTenToThePowerOfN = tenToThePowerOfN(n);

	return (m: number) =>
		Math.round(m * valueOfTenToThePowerOfN) / valueOfTenToThePowerOfN;
}

// export function isInteger(n: number): boolean {
// 	// return Number.isInteger(n);

// 	return Number.isSafeInteger(n); // ThAW 2020-01-06 : Q: Which integers are not 'safe'?
// }

export function isInteger(n: unknown): boolean {
	return typeof n === 'number' && Number.isSafeInteger(n);
}

export function isNonNegativeInteger(n: unknown): boolean {
	return isInteger(n) && (n as number) >= 0;
}

export function isPositiveInteger(n: unknown): boolean {
	return isInteger(n) && (n as number) > 0;
}

export function isNonNegativeNumber(n: unknown): boolean {
	return isNumber(n) && (n as number) >= 0;
}

export function isPositiveNumber(n: unknown): boolean {
	return isNumber(n) && (n as number) > 0;
}

export function integerDivision(n1: number, n2: number): number {
	return parseInt(`${n1 / n2}`, 10);

	// try {
	// 	return parseInt(n1 / n2, 10);
	// } catch (error) {
	// 	return undefined;
	// }
}
