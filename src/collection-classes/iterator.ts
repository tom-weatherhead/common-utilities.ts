// github:tom-weatherhead/common-utilities.ts/src/collection-classes/iterator.ts

'use strict';

import { clone } from '../objects';

import { IIterator } from './iiterator';
import { IteratorBase } from './iterator-base';

export class Iterator<T> extends IteratorBase<T> {
	public static cloneAndConstruct<T>(items: T[]): Iterator<T> {
		return new Iterator<T>(clone(items));
	}

	private items: T[] = [];
	private index = 0;

	constructor(items: T[]) {
		super();

		this.items = items;
	}

	public next(): T | undefined {
		if (this.isDone()) {
			return undefined;
		}

		return this.items[this.index++]; // Evaluate, then increment
	}

	public isDone(): boolean {
		return this.index >= this.items.length;
	}

	protected cloneAndConstruct<U>(items: U[]): IIterator<U> {
		return Iterator.cloneAndConstruct(items);
	}
}
