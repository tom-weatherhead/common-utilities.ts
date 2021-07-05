// github:tom-weatherhead/common-utilities.ts/src/collection-classes/priority-queue.ts

import { CollectionArrayBase } from './collection-array-base';

export class PriorityQueue<T> extends CollectionArrayBase<T> {
	// fnComparator:
	// Returns true if item1 has a higher priority than item2.
	// Returns false if item2 has a higher priority than item1.

	constructor(private readonly fnComparator: (item1: T, item2: T) => boolean, iterable?: Iterable<T>) {
		super(iterable);
	}

	public enqueue(item: T): void {
		this.items.push(item);

		// Now: Restore the heap condition throughout the heap by propagating
		// the element that is now at index heap.length - 1 up through the heap, as necessary.

		let index = this.size - 1;

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

	public dequeue(): T {
		if (this.items.length === 0) {
			throw new Error('PriorityQueue.dequeue() : The queue is empty.');
		}

		const result = this.items[0];
		const lastElement = this.items.pop();

		if (typeof lastElement === 'undefined') {
			throw new Error('PriorityQueue.dequeue() : this.items.pop() returned undefined.');
		}

		if (this.items.length === 0) {
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
			} else if (this.fnComparator(this.items[nextIndex1], this.items[nextIndex2])) {
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

	protected protectedAdd(item: T): boolean {
		this.enqueue(item);

		return true;
	}
}
