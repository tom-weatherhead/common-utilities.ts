// github:tom-weatherhead/common-utilities.ts/src/collection-classes/priority-queue.ts

'use strict';

import { clone } from '../objects';

import { IIterator } from './iiterator';
import { Iterator } from './iterator';

export class PriorityQueue<T> {
	private items: T[] = [];

	// Returns true if item1 has a higher priority than item2.
	// Returns false if item2 has a higher priority than item1.
	private readonly fnComparator: (item1: T, item2: T) => boolean;

	constructor(fnComparator: (item1: T, item2: T) => boolean) {
		this.fnComparator = fnComparator;
	}

	public enqueue(item: T): void {
		this.items.push(item);

		// Now: Restore the heap condition throughout the heap by propagating
		// the element that is now at index heap.length - 1 up through the heap, as necessary.

		let index = this.items.length - 1;

		while (index) {
			const nextIndex = Math.trunc((index - 1) / 2);

			const elementAtIndex = this.items[index];
			const elementAtNextIndex = this.items[nextIndex];

			if (this.fnComparator(elementAtNextIndex, elementAtIndex)) {
				break;
			}

			// Swap the two elements:
			this.items[index] = elementAtNextIndex;
			this.items[nextIndex] = elementAtIndex;

			index = nextIndex;
		}
	}

	public dequeue(): T | undefined {
		if (!this.items.length) {
			return undefined;
		}

		const result = this.items[0];

		const lastElement = this.items.pop() as T;

		if (!this.items.length) {
			return result;
		}

		this.items[0] = lastElement;

		// Now: Restore the heap condition throughout the heap by propagating lastElement
		// (i.e. the element that is now at index 0) down through the heap, as necessary.

		// The heap condition is: For all integers i where 0 <= i < heap.length :
		// 1) If 2 * i + 1 < heap.length then heap[i] >= heap[2 * i + 1], and
		// 2) If 2 * i + 2 < heap.length then heap[i] >= heap[2 * i + 2]

		// The heap condition ensures that the largest element in the heap is at index 0.

		let index = 0;

		while (index < this.items.length) {
			const nextIndex1 = 2 * index + 1;
			const nextIndex2 = nextIndex1 + 1;

			let nextIndex;

			if (nextIndex1 >= this.items.length) {
				break;
			} else if (nextIndex2 >= this.items.length) {
				nextIndex = nextIndex1;
			} else if (
				this.fnComparator(
					this.items[nextIndex1],
					this.items[nextIndex2]
				)
			) {
				nextIndex = nextIndex1;
			} else {
				nextIndex = nextIndex2;
			}

			const elementAtIndex = this.items[index];
			const elementAtNextIndex = this.items[nextIndex];

			if (!this.fnComparator(elementAtNextIndex, elementAtIndex)) {
				break;
			}

			// Swap the two elements:
			this.items[index] = elementAtNextIndex;
			this.items[nextIndex] = elementAtIndex;

			index = nextIndex;
		}

		return result;
	}

	public isEmpty(): boolean {
		return this.items.length === 0;
	}

	public getIterator(): IIterator<T> {
		const originalItems = this.items;
		const sortedItems: T[] = [];

		this.items = clone(this.items);

		while (!this.isEmpty()) {
			sortedItems.push(this.dequeue() as T);
		}

		this.items = originalItems;

		return new Iterator<T>(sortedItems); // No need to clone sortedItems
	}
}
