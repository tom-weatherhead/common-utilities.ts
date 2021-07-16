// github:tom-weatherhead/common-utilities.ts/src/arrays.ts

// WARNING: Circular dependency: arrays -> numbers -> arrays
import { getRandomNonNegativeInteger, sum } from './numbers';

export function cloneArray<T>(array: T[]): T[] {
	return array.slice(0); // See https://davidwalsh.name/javascript-clone-array
	// TODO: Try: return array.slice();
}

export function doesConsecutiveElementsConditionHold<T>(
	array: T[],
	fn: (element1: T, element2: T) => boolean,
	defaultResult = true
): boolean {
	if (array.length <= 1) {
		// The array is too short to have any consecutive elements.

		return defaultResult;
	}

	for (let i = 0; i < array.length - 1; i++) {
		if (!fn(array[i], array[i + 1])) {
			return false;
		}
	}

	return true;
}

export function isArrayInIncreasingOrder(array: number[]): boolean {
	return doesConsecutiveElementsConditionHold(array, (x, y) => x < y, true);
}

export function isArrayInNonDecreasingOrder(array: number[]): boolean {
	return doesConsecutiveElementsConditionHold(array, (x, y) => x <= y, true);
}

export function isArrayInDecreasingOrder(array: number[]): boolean {
	return doesConsecutiveElementsConditionHold(array, (x, y) => x > y, true);
}

export function isArrayInNonIncreasingOrder(array: number[]): boolean {
	return doesConsecutiveElementsConditionHold(array, (x, y) => x >= y, true);
}

export function findSuperlativeElement<T>(array: T[], fn: (x: T, y: T) => T): T {
	if (!array.length) {
		// From https://www.sitepen.com/blog/typescript-2-3-the-sexy-default-type-argument/ :
		// return <T> {}; // Return the default value for type T.

		throw new Error('findSuperlativeElement() : array has a length of zero.');
	}

	return array.slice(1).reduce(fn, array[0]);
}

export function max<T>(array: T[]): T {
	return findSuperlativeElement(array, (x, y) => (x > y ? x : y));
}

export function min<T>(array: T[]): T {
	return findSuperlativeElement(array, (x, y) => (x < y ? x : y));
}

// NO: Array.includes() exists in Typescript, so we don't need to implement arrayIncludes()
// Note: error TS2339: Property 'includes' does not exist on type 'number[]'.
export function arrayIncludes<T>(array: T[], element: T): boolean {
	return array.indexOf(element) >= 0;
}

export function removeDuplicatesFromArray<T>(array: T[]): T[] {
	// See the discussion at https://gist.github.com/telekosmos/3b62a31a5c43f40849bb

	// JavaScript Set: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

	// See https://stackoverflow.com/questions/13486479/how-to-get-an-array-of-unique-values-from-an-array-containing-duplicates-in-java
	// Discussion about performace: See https://medium.com/@jakubsynowiec/unique-array-values-in-javascript-7c932682766c
	// return [...new Set(array)]; // Yes. Requires ES6, since it uses the "spread" operator ("...").

	// return Array.from(new Set(array)); // Yes

	return array.reduce(
		(x: T[], y: T) => (x.includes(y) ? x : [...x, y]), // Array.includes() exists in Typescript
		// (x: T[], y: T) => x.indexOf(y) >= 0 ? x : [...x, y],
		[]
	); // Yes. From svnpenn.
}

export function flattenOneLevel<T>(a: Array<T[] | T>, b: T[] = []): T[] {
	return a.reduce((accumulator: T[], element: T[] | T) => {
		const castedElement: T[] = element as T[];

		// if (isArray(element)) {
		if (typeof castedElement !== 'undefined') {
			return accumulator.concat(castedElement);
		} else {
			accumulator.push(element as T);

			return accumulator;
		}
	}, b);
}

export function flattenAllLevels<T>(a: unknown[], b: T[] = []): T[] {
	return a.reduce((accumulator: T[], element: unknown) => {
		const elementAsArray = element as unknown[];
		const elementAsT = element as T;

		if (typeof elementAsArray !== 'undefined') {
			flattenAllLevels(elementAsArray, accumulator);
		} else if (typeof elementAsT !== 'undefined') {
			accumulator.push(elementAsT);
		}

		return accumulator;
	}, b);
}

export function getRandomArrayElement<T>(array: T[]): T | undefined {
	if (!array.length) {
		return undefined;
	}

	return array[getRandomNonNegativeInteger(array.length)];
}

export function propertySum(array: Record<string, unknown>[], propertyName: string): number {
	return sum(array.map((element: Record<string, unknown>) => element[propertyName] as number));
}

// Categorize? Or pigeonhole?

// error TS2538: Type 'symbol' cannot be used as an index type.
// type ObjectKeyType = number | string | symbol;
type ObjectKeyType = number | string;

// TODO: Use this:
// export function categorizeArrayElementsByFunction<T, U>(
// 	array: T[],
// 	fn: (element: T) => U // (element: T) => ObjectKeyType
// ): Record<U, T[]> { ... }

// T must be an ObjectValueType
// export function categorizeArrayElementsByFunction<T>(
// 	array: T[],
// 	fn: (element: T) => string // (element: T) => ObjectKeyType
// ): Record<string, unknown> {

export function categorizeArrayElementsByFunction<T>(
	array: T[],
	fn: (element: T) => ObjectKeyType // (element: T) => ObjectKeyType
): Record<ObjectKeyType, T[]> {
	// [...new Set(array)] : Remove duplicate elements
	// const propertyValues = [...new Set(array.map(element => fn(element)))];
	const propertyValues = removeDuplicatesFromArray(array.map((element) => fn(element)));
	const start: Record<ObjectKeyType, T[]> = {};
	// Or: const start = new Map<U, T[]>();

	propertyValues.sort();

	return propertyValues.reduce((accumulator, propertyValue) => {
		accumulator[propertyValue] = array.filter((element) => fn(element) === propertyValue);

		return accumulator;
	}, start);
}

// export function categorizeArrayElementsByFunction_version2(array, fn) {

// 	if (!isArray(array)) {
// 		return undefined;
// 	}

// 	return array.reduce(
// 		(accumulator, element) => {
// 			const key = fn(element);

// 			if (!accumulator[key]) {
// 				accumulator[key] = [];
// 			}

// 			// Array.push() returns the length of the array after the push.
// 			accumulator[key].push(element);

// 			return accumulator;
// 		},
// 		{}
// 	);
// }

type Foo1ElementType = Record<ObjectKeyType, ObjectKeyType>;

export function categorizeArrayElementsByProperty(
	array: Foo1ElementType[],
	propertyName: ObjectKeyType
): Record<ObjectKeyType, Foo1ElementType[]> {
	return categorizeArrayElementsByFunction(
		array,
		(element: Foo1ElementType) => element[propertyName]
	);
}

export function getLastElementOfArray<T>(array: T[]): T | undefined {
	if (!array.length) {
		return undefined;
	}

	// From https://solidfoundationwebdev.com/blog/posts/3-methods-to-get-the-last-element-of-an-array-in-javascript :

	// return array[array.length - 1];

	// return array.pop(); // But this will remove the last element from the array.

	return array.slice(-1)[0];
}

// createAndFillArray(obj, d1, d2, d3, ... dn) :
// Create an n-dimensional array of size d1 x d2 x ... x dn, with all elements set to obj

// NO: Try this recursive type definition: type Foo<T> = T | Foo<T[]>
// export function createAndFillArray<T>(obj: T, ...dimensions: number[]): Foo<T> { ...

// error TS2456: Type alias 'Metaarray' circularly references itself.
// type Metaarray<T> = T | Metaarray<T[]>;

// export function createAndFillArray<T>(
// 	obj: T,
// 	...dimensions: number[]
// ): Metaarray<T> { ... }

export function createAndFillArray(obj: unknown, ...dimensions: number[]): unknown {
	if (!dimensions || !dimensions.length) {
		return obj;
	}

	const result = [];
	const d1 = dimensions.shift() as number;

	for (let i = 0; i < d1; i++) {
		result.push(createAndFillArray(obj, ...dimensions));
	}

	dimensions.unshift(d1);

	return result;
}

export function createArrayFromElement<T>(element: T, length: number): T[] {
	// if (length < 0) {
	// 	return [];
	// }

	// return createAndFillArray(element, length);

	// TODO: return new Array(length).fill(element);
	return new Array(Math.max(length, 0)).fill(element);
}

export function generateAllSubsets<T>(array: T[], i = 0, accumulator: T[] = []): T[][] {
	if (i >= array.length) {
		return [accumulator];
	}

	const list1 = generateAllSubsets(array, i + 1, accumulator);
	const list2 = generateAllSubsets(array, i + 1, accumulator.concat([array[i]]));

	return list1.concat(list2);
}

export function padOrTrimArrayAtStart<T>(
	array: T[],
	desiredLength: number,
	defaultElement: T
): T[] {
	const diff = array.length - desiredLength;

	if (diff >= 0) {
		return array.slice(diff);
	} else {
		return new Array(-diff).fill(defaultElement).concat(array);
	}
}

export function selectElementsByIndex<T>(array: T[], ...selectedIndices: number[]): T[] {
	return selectedIndices
		.filter((value: number) => value < array.length)
		.map((selectedIndex: number) => array[selectedIndex]);
}

export function selectElementsOrDefaultByIndex<T>(
	array: T[],
	defaultValue: T,
	...selectedIndices: number[]
): T[] {
	return selectedIndices.map((selectedIndex: number) =>
		selectedIndex < array.length ? array[selectedIndex] : defaultValue
	);
}

// transpose2d changes [[A1, A2, A3], [B1, B2, B3], [C1, C2, C3]]
// to: [[A1, B1, C1], [A2, B2, C2], [A3, B3, C3]]

export function transpose2d<T>(matrix: T[][]): T[][] {
	const minLength = Math.min(...matrix.map((row) => row.length));
	const result: T[][] = [];

	for (let i = 0; i < minLength; i++) {
		const row: T[] = [];

		for (const array of matrix) {
			row.push(array[i]);
		}

		result.push(row);
	}

	return result;
}

// export function cascade1d1array<T>(
// 	operation: (s: T, element: T) => T, // Function,
// 	seedValue: T,
// 	array: T[]
// ): T[] {
// 	return array.reduce((accumulator: T[], element: T) => {
// 		seedValue = operation(seedValue, element);
// 		accumulator.push(seedValue);

// 		return accumulator;
// 	}, []);
// }

// TODO: Function performed on arrays of Booleans:
// - all
// - any
// - none
// - notAll
// - some
// -

export function all(array: boolean[]): boolean {
	for (const value of array) {
		if (!value) {
			return false;
		}
	}

	return true;
}

export function any(array: boolean[]): boolean {
	for (const value of array) {
		if (value) {
			return true;
		}
	}

	return false;
}

export function none(array: boolean[]): boolean {
	for (const value of array) {
		if (value) {
			return false;
		}
	}

	return true;
}

export function notAll(array: boolean[]): boolean {
	for (const value of array) {
		if (!value) {
			return true;
		}
	}

	return false;
}

export const some = any;

export function mapLastElementOfArray<T, U>(array: T[], fn: (element: T) => U, dflt: U): U {
	if (array.length === 0) {
		return dflt;
	}

	const lastElement = array[array.length - 1];

	return fn(lastElement);
}
