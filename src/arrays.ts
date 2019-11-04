// github.com/tom-weatherhead/common-utilities.ts/src/arrays.ts

export function findSuperlativeElement<T>(array: T[], fn: (x: T, y: T) => T): T {

	if (!array.length) {
		// From https://www.sitepen.com/blog/typescript-2-3-the-sexy-default-type-argument/ :
		// return <T> {}; // Return the default value for type T.

		throw new Error('findSuperlativeElement() : array has a length of zero.');
	}

	return array.slice(1).reduce(
		fn,
		array[0]
	);
}

export function max<T>(array: T[]): T {
	return findSuperlativeElement(array, (x, y) => x > y ? x : y);
}

export function min<T>(array: T[]): T {
	return findSuperlativeElement(array, (x, y) => x < y ? x : y);
}
