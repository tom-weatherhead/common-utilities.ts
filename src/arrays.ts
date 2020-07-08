// github:tom-weatherhead/common-utilities.ts/src/arrays.ts

'use strict';

import { getRandomNonNegativeInteger, sum } from './numbers';

import { clone } from './objects';

import { isArray } from './types';

import { PriorityQueue } from './collection-classes/priority-queue';

export function cloneArray<T>(array: T[]): T[] {
	return array.slice(0); // See https://davidwalsh.name/javascript-clone-array
	// TODO: Try: return array.slice();
}

// Sorting algorithm number 1: Bubble Sort

export function bubbleSort<T>(
	array: T[],
	fnComparator: (element1: T, element2: T) => boolean
): T[] {
	let changeDetected = true;

	array = cloneArray(array);

	for (let i = array.length - 1; i > 0 && changeDetected; i--) {
		changeDetected = false;

		for (let j = 0; j < i; j++) {
			const element1 = array[j];
			const element2 = array[j + 1];

			if (!fnComparator(element1, element2)) {
				array[j] = element2;
				array[j + 1] = element1;
				changeDetected = true;
			}
		}
	}

	return array;
}

// Sorting algorithm number 2: Heap Sort

export function heapSort<T>(
	array: T[],
	fnComparator: (element1: T, element2: T) => boolean
): T[] {
	const priorityQueue = new PriorityQueue<T>(fnComparator);

	array.forEach((element: T) => {
		priorityQueue.enqueue(element);
	});

	const result: T[] = [];

	while (!priorityQueue.isEmpty()) {
		result.push(priorityQueue.dequeue() as T);
	}

	return result;
}

// Sorting algorithm number 3: Insertion Sort

export function insertNumberIntoArray<T>(
	n: T,
	array: T[],
	fnComparator: (element1: T, element2: T) => boolean
): T[] {
	// array must already be sorted in the proper order.

	let i = array.findIndex((m) => !fnComparator(m, n));

	if (i < 0) {
		i = array.length;
	}

	const result: T[] = clone(array);

	// Array.splice modifies the array in place. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
	result.splice(i, 0, n);

	return result;
}

export function insertionSort<T>(
	array: T[],
	fnComparator: (element1: T, element2: T) => boolean
): T[] {
	return array.reduce(
		(accumulator: T[], n: T) =>
			insertNumberIntoArray(n, accumulator, fnComparator),
		[]
	);
}

// Sorting algorithm number 4: Merge Sort

export function mergeTwoSortedArrays<T>(
	array1: T[],
	array2: T[],
	fnComparator: (element1: T, element2: T) => boolean
): T[] {
	let index1 = 0;
	let index2 = 0;
	const result: T[] = [];

	while (index1 < array1.length && index2 < array2.length) {
		const element1 = array1[index1];
		const element2 = array2[index2];

		if (fnComparator(element1, element2)) {
			result.push(element1);
			index1++;
		} else {
			result.push(element2);
			index2++;
		}
	}

	if (index1 < array1.length) {
		// Array.concat() does not modify the array in place; it returns a new array.
		return result.concat(array1.slice(index1));
	} else if (index2 < array2.length) {
		return result.concat(array2.slice(index2));
	} else {
		return result;
	}
}

export function mergeSort<T>(
	array: T[],
	fnComparator: (element1: T, element2: T) => boolean
): T[] {
	if (array.length <= 1) {
		return array;
	}

	const midpoint = Math.trunc(array.length / 2);

	const array1: T[] = array.slice(0, midpoint);
	const array2: T[] = array.slice(midpoint);

	const sortedArray1: T[] = mergeSort(array1, fnComparator);
	const sortedArray2: T[] = mergeSort(array2, fnComparator);

	const mergedArray: T[] = mergeTwoSortedArrays(
		sortedArray1,
		sortedArray2,
		fnComparator
	);

	return mergedArray;
}

// Sorting algorithm number 5: Quicksort

export function quickSort<T>(
	array: T[],
	fnComparator: (element1: T, element2: T) => boolean
): T[] {
	if (array.length <= 1) {
		return array;
	}

	// const pivotElement = array.shift(); // No. Don't destroy the parameter.
	const pivotElement = array[0];
	const subArray1: T[] = [];
	const subArray2: T[] = [];

	array.slice(1).forEach((element: T) => {
		if (fnComparator(element, pivotElement)) {
			subArray1.push(element);
		} else {
			subArray2.push(element);
		}
	});

	return quickSort(subArray1, fnComparator)
		.concat([pivotElement])
		.concat(quickSort(subArray2, fnComparator));
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
	return doesConsecutiveElementsConditionHold(
		array,
		(x, y) => x <= y,
		true
	);
}

export function isArrayInDecreasingOrder(array: number[]): boolean {
	return doesConsecutiveElementsConditionHold(array, (x, y) => x > y, true);
}

export function isArrayInNonIncreasingOrder(array: number[]): boolean {
	return doesConsecutiveElementsConditionHold(
		array,
		(x, y) => x >= y,
		true
	);
}

export function findSuperlativeElement<T>(
	array: T[],
	fn: (x: T, y: T) => T
): T {
	if (!array.length) {
		// From https://www.sitepen.com/blog/typescript-2-3-the-sexy-default-type-argument/ :
		// return <T> {}; // Return the default value for type T.

		throw new Error(
			'findSuperlativeElement() : array has a length of zero.'
		);
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

export function flattenOneLevel(a: any[], b: any[] = []): any[] {
	return a.reduce((accumulator, element) => {
		if (isArray(element)) {
			return accumulator.concat(element);
		} else {
			accumulator.push(element);

			return accumulator;
		}
	}, b);
}

export function flattenAllLevels(a: any[], b: any[] = []): any[] {
	return a.reduce((accumulator, element) => {
		if (isArray(element)) {
			flattenAllLevels(element, accumulator);
		} else {
			accumulator.push(element);
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

export function propertySum(array: any[], propertyName: string): number {
	return sum(array.map((element: any) => element[propertyName] as number));
}

// Categorize? Or pigeonhole?

export function categorizeArrayElementsByFunction<T>(
	array: T[],
	fn: (element: T) => any
): object {
	// [...new Set(array)] : Remove duplicate elements
	// const propertyValues = [...new Set(array.map(element => fn(element)))];
	const propertyValues = removeDuplicatesFromArray(
		array.map((element) => fn(element))
	);

	propertyValues.sort();

	return propertyValues.reduce((accumulator, propertyValue) => {
		accumulator[propertyValue] = array.filter(
			(element) => fn(element) === propertyValue
		);

		return accumulator;
	}, {});
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

export function categorizeArrayElementsByProperty<T>(
	array: T[],
	propertyName: any
): object {
	return categorizeArrayElementsByFunction(
		array,
		(element: any) => element[propertyName]
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

export function createAndFillArray(obj: any, ...dimensions: number[]): any {
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

export function generateAllSubsets<T>(
	array: T[],
	i = 0,
	accumulator: T[] = []
): T[][] {
	if (i >= array.length) {
		return [accumulator];
	}

	const list1 = generateAllSubsets(array, i + 1, accumulator);
	const list2 = generateAllSubsets(
		array,
		i + 1,
		accumulator.concat([array[i]])
	);

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
