// github:tom-weatherhead/common-utilities.ts/src/collection-classes/queue.ts

'use strict';

import { IIterator } from './iiterator';
import { Iterator } from './iterator';

export class Queue<T> {
	private readonly items: T[] = [];

	public enqueue(item: T): void {
		this.items.push(item);
	}

	public dequeue(): T | undefined {
		// if (this.isEmpty()) {
		// 	throw new EmptyQueueException();
		// }

		return this.items.shift();
	}

	public isEmpty(): boolean {
		return this.items.length === 0;
	}

	public getIterator(): IIterator<T> {
		return Iterator.cloneAndConstruct(this.items);
	}
}
