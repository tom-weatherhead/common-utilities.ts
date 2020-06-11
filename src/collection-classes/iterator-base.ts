// github:tom-weatherhead/common-utilities.ts/src/collection-classes/iterator-base.ts

'use strict';

import { IIterator } from './iiterator';

export abstract class IteratorBase<T> implements IIterator<T> {
	public abstract isDone(): boolean;
	public abstract next(): T | undefined;

	// The methods in this class are implemented in terms of isDone(), next(), and cloneAndConstruct().

	public every(pred: (element: T) => boolean): boolean {
		while (!this.isDone()) {
			if (!pred(this.next() as T)) {
				return false;
			}
		}

		return true;
	}

	public filter(pred: (element: T) => boolean): IIterator<T> {
		const resultArray: T[] = [];

		while (!this.isDone()) {
			const element = this.next() as T;

			if (pred(element)) {
				resultArray.push(element);
			}
		}

		return this.cloneAndConstruct(resultArray);
	}

	public forEach(fn: (element: T) => any): void {
		while (!this.isDone()) {
			fn(this.next() as T);
		}
	}

	public map<U>(fnMapElement: (element: T) => U): IIterator<U> {
		const resultArray: U[] = [];

		while (!this.isDone()) {
			resultArray.push(fnMapElement(this.next() as T));
		}

		return this.cloneAndConstruct(resultArray);
	}

	public some(pred: (element: T) => boolean): boolean {
		while (!this.isDone()) {
			if (pred(this.next() as T)) {
				return true;
			}
		}

		return false;
	}

	protected abstract cloneAndConstruct<U>(items: U[]): IIterator<U>;
}
