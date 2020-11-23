// github:tom-weatherhead/common-utilities.ts/src/asynchronous.ts

'use strict';

// From https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404 :

// const waitFor = ms => new Promise(r => setTimeout(r, ms));

export async function asyncForEach<T>(
	array: T[],
	callback: (element: T, index: number, array: T[]) => unknown
): Promise<void> {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

/*
asyncForEach([1, 2, 3], async (num) => {
	await waitFor(50);
	console.log(num);
});

console.log('Done');
*/

export async function asyncMap<T, U>(
	array: T[],
	callback: (element: T, index: number, array: T[]) => U
): Promise<U[]> {
	const result: U[] = [];

	for (let index = 0; index < array.length; index++) {
		result.push(await callback(array[index], index, array));
	}

	return result;
}

export function delayAndResolve(ms: number): Promise<void> {
	return new Promise<void>(
		(
			resolve: (value?: void) => void,
			/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
			reject: (reason?: unknown) => void
		): void => {
			setTimeout(() => {
				resolve();
			}, ms);
		}
	);
}

export function delayAndResolveWithValue<T>(ms: number, t: T): Promise<T> {
	return new Promise<T>(
		(
			resolve: (value: T | PromiseLike<T>) => void,
			/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
			reject: (reason?: unknown) => void
		): void => {
			setTimeout(() => {
				resolve(t);
			}, ms);
		}
	);
}
