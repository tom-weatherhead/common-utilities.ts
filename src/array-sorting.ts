// github:tom-weatherhead/common-utilities.ts/src/array-sorting.ts

import { cloneArray } from './arrays';

import { PriorityQueue } from './collection-classes/priority-queue';

export type SortingFunction<T> = (
	array: T[],
	fnComparator: (element1: T, element2: T) => boolean
) => T[];

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

	const result: T[] = cloneArray(array);

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

// Sorting algorithm number 6: Shell Sort

// export function shellSort<T>(
// 	array: T[],
// 	fnComparator: (element1: T, element2: T) => boolean
// ): T[] {
// 	// ...;
// }

export function getSortingFunctions<T>(): Record<string, SortingFunction<T>> {
	return {
		bubbleSort: bubbleSort,
		heapSort: heapSort,
		insertionSort: insertionSort,
		mergeSort: mergeSort,
		quickSort: quickSort // ,
		// 'shellSort': shellSort
	};
}
