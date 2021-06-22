// github:tom-weatherhead/common-utilities.ts/src/collection-classes/set.ts

// import { ICollection } from './icollection';
// import {
// 	IEqualityComparable,
// 	isIEqualityComparable
// } from '../interfaces/iequality-comparable';
import { IIterator } from './iiterator';
import { Iterator } from './iterator';

import { CollectionArrayBase } from './collection-array-base';

export class Set<T> extends CollectionArrayBase<T> {
	// Static methods

	public static createFromArray<U>(array: U[]): Set<U> {
		const result = new Set<U>();

		for (const element of array) {
			result.add(element);
		}

		return result;
	}

	public static createFromIterator<U>(iterator: IIterator<U>): Set<U> {
		const result = new Set<U>();

		while (!iterator.isDone()) {
			const element = iterator.next() as U;

			result.add(element);
		}

		return result;
	}

	// Fields (private member data)

	// private items: T[] = [];

	// Constructor

	constructor(iterable?: Iterable<T>) {
		super(iterable);
		// if (typeof iterable !== 'undefined') {
		// 	for (const item of iterable) {
		// 		this.add(item);
		// 	}
		// }
	}

	// Fundamental methods

	// public [Symbol.iterator](): IterableIterator<T> {
	// 	return this.items[Symbol.iterator]();
	// }

	// public toString(): string {
	// 	return `[${this.items.join(', ')}]`;
	// }

	// Accessors

	// public get size(): number {
	// 	return this.items.length;
	// }

	// Other public methods

	public clone(): Set<T> {
		// Creates a shallow copy
		// const result = new Set<T>();

		// for (const item of this.items) {
		// 	result.add(item);
		// }

		// return result;

		return new Set<T>(this);
	}

	// public toArray(): T[] {
	// 	// Creates a shallow copy
	// 	// return this.items.slice(0);

	// 	// return [...this[Symbol.iterator]()];

	// 	return [...this];
	// }

	// public isEmpty(): boolean {
	// 	return this.size === 0;
	// }

	// public clear(): void {
	// 	this.items = [];
	// }

	public add(item: T): void {
		if (!this.contains(item)) {
			this.items.push(item);
		}
	}

	public remove(item: T): void {
		// Or: Use indexOf() and splice(), since item should occur in this.items at most one time?
		// let fn = (otherItem: T) => otherItem !== item;

		// if (isIEqualityComparable(item)) {
		// 	const castItem = item as IEqualityComparable;

		// 	// return (
		// 	// 	typeof this.items.find((i: T) => castItem.strictEquals(i)) !==
		// 	// 	'undefined'
		// 	// );

		// 	fn = (otherItem: T) => !castItem.strictEquals(otherItem);
		// }
		const fn = this.getEqualityComparisonFunction(item);

		this.items = this.items.filter((otherItem: T) => !fn(otherItem));
	}

	// public contains(item: T): boolean {
	// 	// if (isIEqualityComparable(item)) {
	// 	// 	const castItem = item as IEqualityComparable;

	// 	// 	return (
	// 	// 		typeof this.items.find((otherItem: T) =>
	// 	// 			castItem.strictEquals(otherItem)
	// 	// 		) !== 'undefined'
	// 	// 	);
	// 	// }

	// 	// return this.items.indexOf(item) >= 0;
	// 	// Or? : this.items.includes(item)
	// 	// Or? : item in this.items
	// 	const fn = this.getEqualityComparisonFunction(item);

	// 	return typeof this.items.find(fn) !== 'undefined';
	// }

	public isASubsetOf(otherSet: Set<T>): boolean {
		return this.items.every((element: T) => otherSet.contains(element));
	}

	public isEqualTo(otherSet: Set<T>): boolean {
		return this.isASubsetOf(otherSet) && otherSet.isASubsetOf(this);
	}

	// Return a new set that is the intersection of this set and otherSet.
	// This set is not modified.

	public intersection(otherSet: Set<T>): Set<T> {
		// const result = this.clone();

		// result.intersectionInPlace(otherSet);

		// return result;

		return new Set<T>(
			this.items.filter((item: T) => otherSet.contains(item))
		);
	}

	// Remove any of this set's elements that are not also in otherSet, in place (i.e. this set may be modified).

	public intersectionInPlace(otherSet: Set<T>): void {
		// const elementsToRemove = new Set<T>();

		// this.items.forEach((element: T) => {
		// 	if (!otherSet.contains(element)) {
		// 		elementsToRemove.add(element);
		// 	}
		// });
		// for (const item of this.items) {
		// 	;
		// }
		const itemsToRemove = this.items.filter(
			(item: T) => !otherSet.contains(item)
		);

		// elementsToRemove.items.forEach((element: T) => {
		// 	this.remove(element);
		// });
		for (const item of itemsToRemove) {
			this.remove(item);
		}
	}

	// Return a new set that is the union of this set and otherSet.
	// This set is not modified.

	public union(otherSet: Set<T>): Set<T> {
		const result = this.clone();

		result.unionInPlace(otherSet);

		return result;
	}

	// Add otherSet's elements to this set, in place (i.e. this set may be modified).

	public unionInPlace(otherSet: Set<T>): void {
		for (const item of otherSet) {
			this.add(item);
		}
	}

	public getAllSubsets(): Set<T>[] {
		const result: Set<T>[] = [];

		// this.getAllSubsetsHelper(result, [], 0);
		this.getAllSubsetsHelper(result);

		return result;
	}

	public getIterator(): IIterator<T> {
		return Iterator.cloneAndConstruct(this.items);
	}

	// Private methods

	private getAllSubsetsHelper(
		arrayOfSubsets: Set<T>[],
		subsetAsArray: T[] = [],
		index = 0
	): void {
		if (index >= this.items.length) {
			// arrayOfSubsets.push(Set.createFromArray(subsetAsArray));
			arrayOfSubsets.push(new Set<T>(subsetAsArray));
		} else {
			subsetAsArray.push(this.items[index]);
			this.getAllSubsetsHelper(arrayOfSubsets, subsetAsArray, index + 1);
			subsetAsArray.pop();
			this.getAllSubsetsHelper(arrayOfSubsets, subsetAsArray, index + 1);
		}
	}

	// private getEqualityComparisonFunction(item: T): (otherItem: T) => boolean {
	// 	if (isIEqualityComparable(item)) {
	// 		const castItem = item as IEqualityComparable;

	// 		// return (
	// 		// 	typeof this.items.find((i: T) => castItem.strictEquals(i)) !==
	// 		// 	'undefined'
	// 		// );

	// 		return (otherItem: T) => castItem.strictEquals(otherItem);
	// 	}

	// 	return (otherItem: T) => otherItem === item;
	// }

	// Iterators and generators:
	// See e.g. https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html

	// Q: ThAW 2020-01-11 : Can a class implement both [Symbol.iterator]() and [Symbol.asyncIterator]() ?
	// public get synchronousIterator(): Iterable<string> {
	// error TS2740: Type 'Generator<any, any, unknown>' is missing the following properties from type 'Iterator<T>': items, index, isDone, cloneAndConstruct, and 5 more.
	// public *[Symbol.iterator]() {
	// 	// : Iterator<T> { // or Iterable<T> ?
	// 	// return this.syncGenerate();

	// 	for (const item of this.items) {
	// 		yield item;
	// 	}
	// }

	// public [Symbol.asyncIterator](): AsyncIterator<string> {
	// 	// Implementing this method makes objects of this class asynchronously iterable.
	// 	return this.asyncGenerate();
	// }

	// **** Iterator generators. Private. ****

	// private *syncGenerate(): Iterator<T> {
	// 	// not Iterable<T>
	// 	// This function generates an iterator.

	// 	for (const item of this.items) {
	// 		yield item;
	// 	}
	// }

	// private async *asyncGenerate(): AsyncIterator<string> {
	// 	// This function generates an asynchronous iterator.

	// 	for (const str of this.stringArray) {
	// 		yield str;
	// 	}
	// }
}
