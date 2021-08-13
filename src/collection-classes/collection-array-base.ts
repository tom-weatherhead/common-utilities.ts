// github:tom-weatherhead/common-utilities.ts/src/collection-classes/collection-array-base.ts

import { ICollection } from './interfaces/icollection';
import { IEqualityComparable, isIEqualityComparable } from '../interfaces/iequality-comparable';

export function getEqualityComparisonFunction<T>(item: T): (otherItem: T) => boolean {
	if (isIEqualityComparable(item)) {
		const castItem = item as IEqualityComparable;

		return (otherItem: T) => castItem.equals(otherItem);
	}

	return (otherItem: T) => otherItem === item;
}

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

	public equals(other: unknown): boolean {
		const otherCollection = other as CollectionArrayBase<T>;

		if (
			typeof otherCollection === 'undefined' ||
			typeof otherCollection.items === 'undefined' ||
			otherCollection.items.length !== this.items.length
		) {
			return false;
		}

		return this.items.every((item: T, i: number) => {
			const eqFn = getEqualityComparisonFunction(item);

			return eqFn(otherCollection.items[i]);
		});
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
		const fn = getEqualityComparisonFunction(item);

		return typeof this.items.find(fn) !== 'undefined';
	}

	public add(item: T): boolean {
		return this.protectedAdd(item);
	}

	// public abstract remove(item: T): boolean;

	// Iterator-based methods

	public find(pred: (item: T) => boolean): T | undefined {
		for (const item of this) {
			if (pred(item)) {
				return item;
			}
		}
		return undefined;
	}

	public some(pred: (item: T) => boolean): boolean {
		for (const item of this) {
			if (pred(item)) {
				return true;
			}
		}
		return false;
	}

	public every(pred: (item: T) => boolean): boolean {
		for (const item of this) {
			if (!pred(item)) {
				return false;
			}
		}
		return true;
	}

	// Protected methods

	protected abstract protectedAdd(item: T): boolean;

	// protected getEqualityComparisonFunction(item: T): (otherItem: T) => boolean {
	// 	if (isIEqualityComparable(item)) {
	// 		const castItem = item as IEqualityComparable;
	//
	// 		return (otherItem: T) => castItem.equals(otherItem);
	// 	}
	//
	// 	return (otherItem: T) => otherItem === item;
	// }

	// Private methods
}
