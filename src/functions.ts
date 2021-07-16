// github:tom-weatherhead/common-utilities.ts/src/functions.ts

import { transpose2d } from './arrays';

import { generateNonNegativeIntegersLessThan } from './numbers';

export function identityFunction<T>(arg: T): T {
	return arg;
}

export const booleanInvertFunction = (arg: boolean): boolean => !arg;

// 'Composite' as a verb, not an adjective:
/* eslint-disable  @typescript-eslint/no-explicit-any */
export function compositeFunctions(fnArray: ((x: any) => any)[]): (x: any) => any {
	return fnArray.reduce(
		(accumulator, element) => (arg) => element(accumulator(arg)),
		identityFunction
	);
}
/* eslint-enable  @typescript-eslint/no-explicit-any */

// Function.length is the number of parameters that a function expects.
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length

// E.g. If fn.length === 2, then curry(fn) returns x => y => fn(x, y);

/* eslint-disable  @typescript-eslint/no-explicit-any */
function curryHelper(fn: (...args: any[]) => any, args: any[]): any {
	return (arg: any) => {
		args.push(arg);

		if (args.length >= fn.length) {
			return fn(...args);
		}

		return curryHelper(fn, args);
	};
}
/* eslint-enable  @typescript-eslint/no-explicit-any */

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function curry(fn: (...args: any[]) => any): any {
	return curryHelper(fn, []);
}
/* eslint-enable  @typescript-eslint/no-explicit-any */

export function curry2ArgumentFunction<A, B, C>(
	fn: (arg1: A, arg2: B) => C
): (arg1: A) => (arg2: B) => C {
	return (arg1: A) => (arg2: B) => fn(arg1, arg2);
}

export function pointwise<T, U>(operation: (...series: T[]) => U, ...serieses: T[][]): U[] {
	if (serieses.length === 0) {
		return [];
	}

	const lengths = serieses.map((series) => series.length);
	const iseries = (j: number): T[] => serieses.map((x) => x[j]);

	return generateNonNegativeIntegersLessThan(Math.min(...lengths)).map(
		(i: number): U => operation(...iseries(i))
	);
}

export function rolling<T, U>(operation: (...series: T[]) => U, series: T[], window: number): U[] {
	return generateNonNegativeIntegersLessThan(series.length).map(
		(i: number): U => operation(...series.slice(Math.max(i + 1 - window, 0), i + 1))
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

export function spreadArrayParameter<T, U>(fn: (...array: T[]) => U): (array: T[]) => U {
	return (array: T[]) => fn(...array);
}

export function unspreadArrayParameter<T, U>(fn: (array: T[]) => U): (...array: T[]) => U {
	return (...array: T[]) => fn(array);
}
