// github:tom-weatherhead/common-utilities.ts/src/collection-classes/queue.ts

import { CollectionArrayBase } from './collection-array-base';

export class Queue<T> extends CollectionArrayBase<T> {
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
}
