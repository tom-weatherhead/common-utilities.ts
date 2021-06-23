// github:tom-weatherhead/common-utilities.ts/src/collection-classes/queue.ts

// import { IIterator } from './iiterator';
// import { Iterator } from './iterator';

import { CollectionArrayBase } from './collection-array-base';

export class Queue<T> extends CollectionArrayBase<T> {
	// private readonly items: T[] = [];

	public enqueue(item: T): void {
		this.items.push(item);
	}

	public dequeue(): T | undefined {
		// if (this.isEmpty()) {
		// 	throw new EmptyQueueException();
		// }

		return this.items.shift();
	}

	protected protectedAdd(item: T): boolean {
		this.enqueue(item);

		return true;
	}

	// public isEmpty(): boolean {
	// 	return this.items.length === 0;
	// }

	// public getIterator(): IIterator<T> {
	// 	return Iterator.cloneAndConstruct(this.items);
	// }
}
