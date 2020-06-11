// github:tom-weatherhead/common-utilities.ts/src/functions.ts

'use strict';

export const identityFunction = (arg: any) => arg;

export const booleanInvertFunction = (arg: boolean) => !arg;

// 'Composite' as a verb, not an adjective:
export function compositeFunctions(fnArray: ((x: any) => any)[]) {
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
