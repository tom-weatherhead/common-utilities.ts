// github:tom-weatherhead/common-utilities.ts/src/array-sorting.ts

import { cloneArray } from './arrays';

import { PriorityQueue } from './collection-classes/priority-queue';

// If f is a comparator function, then f(element1, element2) must return true
// if and only if element1 must be placed before element2 in the sorted array
export type ComparatorFunction<T> = (element1: T, element2: T) => boolean;

export type SortingFunction<T> = (
	array: T[],
	fnComparator: ComparatorFunction<T>
) => T[];

export const numericComparator: ComparatorFunction<number> = (
	element1: number,
	element2: number
) => element1 < element2;

// Sorting algorithm number 1: Bubble Sort

export function genericBubbleSort<T>(
	array: T[],
	fnComparator: ComparatorFunction<T>
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

export function bubbleSort(array: number[]): number[] {
	return genericBubbleSort(array, numericComparator);
}

// Sorting algorithm number 2: Heap Sort

export function genericHeapSort<T>(
	array: T[],
	fnComparator: ComparatorFunction<T>
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

export function heapSort(array: number[]): number[] {
	return genericHeapSort(array, numericComparator);
}

// Sorting algorithm number 3: Insertion Sort

export function insertNumberIntoArray<T>(
	n: T,
	array: T[],
	fnComparator: ComparatorFunction<T>
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

export function genericInsertionSort<T>(
	array: T[],
	fnComparator: ComparatorFunction<T>
): T[] {
	return array.reduce(
		(accumulator: T[], n: T) =>
			insertNumberIntoArray(n, accumulator, fnComparator),
		[]
	);
}

export function insertionSort(array: number[]): number[] {
	return genericInsertionSort(array, numericComparator);
}

// Sorting algorithm number 4: Merge Sort

export function mergeTwoSortedArrays<T>(
	array1: T[],
	array2: T[],
	fnComparator: ComparatorFunction<T>
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

export function genericMergeSort<T>(
	array: T[],
	fnComparator: ComparatorFunction<T>
): T[] {
	if (array.length <= 1) {
		return array;
	}

	const midpoint = Math.trunc(array.length / 2);

	const array1: T[] = array.slice(0, midpoint);
	const array2: T[] = array.slice(midpoint);

	const sortedArray1: T[] = genericMergeSort(array1, fnComparator);
	const sortedArray2: T[] = genericMergeSort(array2, fnComparator);

	const mergedArray: T[] = mergeTwoSortedArrays(
		sortedArray1,
		sortedArray2,
		fnComparator
	);

	return mergedArray;
}

export function mergeSort(array: number[]): number[] {
	return genericMergeSort(array, numericComparator);
}

// Sorting algorithm number 5: Quicksort

export function genericQuickSort<T>(
	array: T[],
	fnComparator: ComparatorFunction<T>
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

	return genericQuickSort(subArray1, fnComparator)
		.concat([pivotElement])
		.concat(genericQuickSort(subArray2, fnComparator));
}

export function quickSort(array: number[]): number[] {
	return genericQuickSort(array, numericComparator);
}

// Sorting algorithm number 6: Shell Sort

// See e.g.https://www.geeksforgeeks.org/shellsort/

export function genericShellSort<T>(
	arrayParam: T[],
	fnComparator: ComparatorFunction<T>
): T[] {
	const array = cloneArray(arrayParam);

	// Start with a big gap, then reduce the gap.

	for (
		// let gap = Math.ceil(array.length / 2);
		let gap = Math.floor(array.length / 2);
		gap > 0;
		gap = Math.floor(gap / 2)
	) {
		// Do a gapped insertion sort for this gap size.
		// The first gap elements a[0..gap-1] are already
		// in gapped order keep adding one more element
		// until the entire array is gap-sorted.

		for (let i = gap; i < array.length; i++) {
			// Add a[i] to the elements that have been gap-sorted,
			// save a[i] in temp, and make a hole at position i.
			const temp = array[i];

			// Shift earlier gap-sorted elements up until
			// the correct location for array[i] is found.
			let j;

			for (
				j = i;
				j >= gap && !fnComparator(array[j - gap], temp);
				j -= gap
			) {
				array[j] = array[j - gap];
			}

			// Put temp (the original array[i]) in its correct location.
			array[j] = temp;
		}
	}

	return array;
}

export function shellSort(array: number[]): number[] {
	return genericShellSort(array, numericComparator);
}

// ****

export function getGenericSortingFunctions<T>(): Record<
	string,
	SortingFunction<T>
> {
	return {
		bubbleSort: genericBubbleSort,
		heapSort: genericHeapSort,
		insertionSort: genericInsertionSort,
		mergeSort: genericMergeSort,
		quickSort: genericQuickSort,
		shellSort: genericShellSort
	};
}

export function getNumericSortingFunctions(): Record<
	string,
	SortingFunction<number>
> {
	return {
		bubbleSort: bubbleSort,
		heapSort: heapSort,
		insertionSort: insertionSort,
		mergeSort: mergeSort,
		quickSort: quickSort,
		shellSort: shellSort
	};
}
