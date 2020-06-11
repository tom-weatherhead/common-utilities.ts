// github:tom-weatherhead/common-utilities.ts/src/collection-classes/stack.ts

'use strict';

import { IIterator } from './iiterator';
import { Iterator } from './iterator';

export class Stack<T> {
	private readonly items: T[] = [];

	// constructor() {
	// }

	public push(item: T): void {
		this.items.push(item);
	}

	public pop(): T | undefined {
		// if (this.isEmpty()) {
		// 	throw new EmptyStackException();
		// }

		return this.items.pop();
	}

	public isEmpty(): boolean {
		return this.items.length === 0;
	}

	public getIterator(): IIterator<T> {
		return Iterator.cloneAndConstruct(this.items);
	}
}
