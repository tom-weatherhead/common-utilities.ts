// github:tom-weatherhead/common-utilities.ts/src/collection-classes/collection-array-base.ts

import { ICollection } from './icollection';
import {
	IEqualityComparable,
	isIEqualityComparable
} from '../interfaces/iequality-comparable';

export abstract class CollectionArrayBase<T> implements ICollection<T> {
	// Static methods

	// Fields (private member data)

	protected items: T[] = [];

	// Constructor

	constructor(iterable?: Iterable<T>) {
		if (typeof iterable !== 'undefined') {
			for (const item of iterable) {
				this.protectedAdd(item);
			}
		}
	}

	// Fundamental methods

	public [Symbol.iterator](): IterableIterator<T> {
		return this.items[Symbol.iterator]();
	}

	public toString(): string {
		return `[${this.items.join(', ')}]`;
	}

	// Accessors

	public get size(): number {
		return this.items.length;
	}

	// Other public methods

	public toArray(): T[] {
		// Creates a shallow copy

		return [...this];
	}

	public isEmpty(): boolean {
		return this.size === 0;
	}

	public clear(): void {
		this.items = [];
	}

	public contains(item: T): boolean {
		const fn = this.getEqualityComparisonFunction(item);

		return typeof this.items.find(fn) !== 'undefined';
	}

	public add(item: T): boolean {
		return this.protectedAdd(item);
	}

	// public abstract remove(item: T): boolean;

	// Protected methods

	protected abstract protectedAdd(item: T): boolean;

	protected getEqualityComparisonFunction(
		item: T
	): (otherItem: T) => boolean {
		if (isIEqualityComparable(item)) {
			const castItem = item as IEqualityComparable;

			return (otherItem: T) => castItem.strictEquals(otherItem);
		}

		return (otherItem: T) => otherItem === item;
	}

	// Private methods
}
