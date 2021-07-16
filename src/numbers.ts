// github:tom-weatherhead/common-utilities.ts/src/numbers.ts

// import { createArrayFromElement } from './arrays';

import { replicateString } from './strings';

import { isNumber, isSafeNumber } from './types';

// export function isSafeNumber(arg: unknown): boolean {
// 	return (
// 		typeof arg === 'number' && !Number.isNaN(arg) && Number.isFinite(arg)
// 	);
// }

export const isGreaterThan = (x: number, y: number): boolean => isNumber(x) && isNumber(y) && x > y;
export const isLessThan = (x: number, y: number): boolean => isNumber(x) && isNumber(y) && x < y;

export const fnIsGreaterThan = isGreaterThan;
export const fnIsLessThan = isLessThan;

export const isNegative = (n: number): boolean => isNumber(n) && n < 0;
export const isNonNegative = (n: number): boolean => isNumber(n) && n >= 0;

export const isPositive = (n: number): boolean => isNumber(n) && n > 0;
export const isNonPositive = (n: number): boolean => isNumber(n) && n <= 0;

// **** negate ****
export const negate = (n: number): number => -n;

// **** add ****
export const binaryAdd = (a: number, b: number): number => a + b;
export const fnAddition = binaryAdd;
export const additiveIdentity = 0;

// export function add(...arg: number[]): number {
// 	return arg.reduce(binaryAdd, additiveIdentity);
// }
export function add(...arg: unknown[]): number {
	return removeNonNumbers(arg).reduce(binaryAdd, additiveIdentity);
}

export const sum = add;

// export function arraySum(arg: unknown[]): number {
// 	return sum(...arg);
// }

// **** subtract ****
export const subtract = (a: number, b: number): number => a - b;
export const fnSubtraction = subtract;

// **** multiply ****
export const binaryMultiply = (a: number, b: number): number => a * b;
export const fnMultiplication = binaryMultiply;
export const multiplicativeIdentity = 1;

// export function multiply(...arg: number[]): number {
// 	return arg.reduce(
// 		binaryMultiply,
// 		multiplicativeIdentity
// 	);
// }
export function multiply(...arg: unknown[]): number {
	return removeNonNumbers(arg).reduce(binaryMultiply, multiplicativeIdentity);
}

export const product = multiply;

// **** divide ****
export const divide = (a: number, b: number): number => a / b;

// export const fnSafeDivision = (a: number, b: number, dflt = 0): number =>
// 	!b ? dflt : a / b;

export function safeDivide(a: number, b: number, dflt = 0): number {
	// return Number.isNaN(a) || !b ? dflt : a / b;

	let result: number;

	try {
		result = a / b;
	} catch (error) {
		result = NaN; // Not a safe number.
	}

	return isSafeNumber(result) ? result : dflt;
}

export const fnSafeDivision = safeDivide;

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
	return generateNonNegativeIntegersLessThan(end - start + 1).map((n) => start + n);
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
		throw new Error(`getRandomNonNegativeInteger() : ${n} is not an integer.`);
	}

	return Math.floor(Math.random() * n);
}

export function zeroPadNumber(n: number, minLength: number): string {
	return (replicateString('0', minLength) + n).slice(-minLength);
}

export function zeroExtendNumber(n: number, minNumberOfDecimalPlaces: number): string {
	let str = n.toString();
	let indexOfDecimalPoint = str.indexOf('.');

	if (indexOfDecimalPoint < 0) {
		indexOfDecimalPoint = str.length;
		str = str + '.';
	}

	return (
		str + replicateString('0', indexOfDecimalPoint + 1 + minNumberOfDecimalPlaces - str.length)
	);
}

export function removeNonNumbers(arg: unknown[]): number[] {
	// return arg.map((o) => o as number).filter((o) => o !== undefined);

	return arg
		.filter((o) => typeof o === 'number')
		.map((o): number => o as number)
		.filter((n) => !Number.isNaN(n));
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
export function histogramLookup(hist: histogramType, key: keyType): number | undefined {
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
	// return product(...createArrayFromElement(a, b)); // Creates a circular reference between arrays.ts and numbers.ts
	return product(...new Array<number>(Math.max(b, 0)).fill(a));
}

export function tenToThePowerOfN(n: number): number {
	return aToThePowerOfB(10, n);
}

export function roundMToNDigits(m: number, n: number): number {
	const valueOfTenToThePowerOfN = tenToThePowerOfN(n);

	return Math.round(m * valueOfTenToThePowerOfN) / valueOfTenToThePowerOfN;
}

export function factory_fnRoundToNDigits(n: number): (m: number) => number {
	return (m: number) => roundMToNDigits(m, n);
}

// A more efficient way: Calculate valueOfTenToThePowerOfN once,
// and then bind it inside the closure that will be returned:

// export function factory_fnRoundToNDigitsV2(n: number): (m: number) => number {
// 	const valueOfTenToThePowerOfN = tenToThePowerOfN(n);

// 	return (m: number) =>
// 		Math.round(m * valueOfTenToThePowerOfN) / valueOfTenToThePowerOfN;
// }

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

export function numberToFixedPrecisionString(n: number, digits: number): string {
	return zeroExtendNumber(factory_fnRoundToNDigits(digits)(n), digits);
}

export function randomNumberNormalDistribution(): number {
	// This code from https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve/36481059#36481059

	// The output of Math.random() is uniformly distributed within [0,1).
	// This Box-Mueller transforms the uniform distribution to a normal distribution (i.e. bell-curve-shaped), with mean = 0 and stddev = 1.

	// See also https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform

	// var u = 0, v = 0;
	// while(u === 0) u = Math.random(); // Converting [0,1) to (0,1)
	// while(v === 0) v = Math.random();

	let u: number;
	let v: number;

	// These two loops convert [0,1) to (0,1).

	do {
		u = Math.random();
	} while (u === 0);

	do {
		v = Math.random();
	} while (v === 0);

	return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export function ifDefinedAndNotNaNThenElse(
	valueIn: number | undefined,
	defaultOut: number
): number {
	if (typeof valueIn === 'undefined' || Number.isNaN(valueIn)) {
		return defaultOut;
	}

	return valueIn;
}
