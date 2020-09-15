// github:tom-weatherhead/common-utilities.ts/src/lazy.ts

'use strict';

import { cloneArray } from './arrays';

function pushMe<T>(array: T[], element: T): T[] {
	array.push(element);

	return array;
}

// Here, fn can be an n-ary function, not just a binary function:

export function makeLazyList(
	fn: (...args: unknown[]) => unknown,
	...args: unknown[]
): unknown {
	// const argsClone = args.slice(0); // See https://davidwalsh.name/javascript-clone-array
	const argsClone = cloneArray(args);
	const arg1 = args.shift();

	return () => [arg1, makeLazyList(fn, ...pushMe(args, fn(...argsClone)))];
}
