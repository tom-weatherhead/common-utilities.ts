// github:tom-weatherhead/common-utilities.ts/src/functions.ts

'use strict';

import { transpose2d } from './arrays';

import { generateNonNegativeIntegersLessThan } from './numbers';

export function identityFunction<T>(arg: T): T {
	return arg;
}

export const booleanInvertFunction = (arg: boolean): boolean => !arg;

// 'Composite' as a verb, not an adjective:
export function compositeFunctions(
	fnArray: ((x: any) => any)[]
): (x: any) => any {
	return fnArray.reduce(
		(accumulator, element) => (arg) => element(accumulator(arg)),
		identityFunction
	);
}

// Function.length is the number of parameters that a function expects.
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length

// E.g. If fn.length === 2, then curry(fn) returns x => y => fn(x, y);

function curryHelper(fn: (...args: any[]) => any, args: any[]): any {
	return (arg: any) => {
		args.push(arg);

		if (args.length >= fn.length) {
			return fn(...args);
		}

		return curryHelper(fn, args);
	};
}

export function curry(fn: (...args: any[]) => any): any {
	return curryHelper(fn, []);
}

export function pointwise<T, U>(
	operation: (...series: T[]) => U,
	...serieses: T[][]
): U[] {
	if (serieses.length === 0) {
		return [];
	}

	const lengths = serieses.map((series) => series.length);
	const iseries = (j: number): T[] => serieses.map((x) => x[j]);

	return generateNonNegativeIntegersLessThan(Math.min(...lengths)).map(
		(i: number): U => operation(...iseries(i))
	);
}

export function rolling<T, U>(
	operation: (...series: T[]) => U,
	series: T[],
	window: number
): U[] {
	return generateNonNegativeIntegersLessThan(series.length).map(
		(i: number): U =>
			operation(...series.slice(Math.max(i + 1 - window, 0), i + 1))
	);
}

export function cascade<T>(
	operation: (seedValue: T, ...iseries: T[]) => T,
	seedValue: T,
	...serieses: T[][]
): T[] {
	return transpose2d(serieses).map((iseries: T[]) => {
		seedValue = operation(seedValue, ...iseries);

		return seedValue;
	});
}

export function spreadArrayParameter<T, U>(
	fn: (...array: T[]) => U
): (array: T[]) => U {
	return (array: T[]) => fn(...array);
}

export function unspreadArrayParameter<T, U>(
	fn: (array: T[]) => U
): (...array: T[]) => U {
	return (...array: T[]) => fn(array);
}
