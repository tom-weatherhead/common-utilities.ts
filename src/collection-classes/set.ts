// github:tom-weatherhead/common-utilities.ts/src/collection-classes/set.ts

import { CollectionArrayBase, getEqualityComparisonFunction } from './collection-array-base';

// import { ICollection, IImmutableCollection } from './icollection';

import { IImmutableSet } from './interfaces/iimmutable-set';
import { ISet } from './interfaces/iset';

// export interface IImmutableSet<T> extends IImmutableCollection<T> {
// 	clone(): Set<T>;
// 	isASubsetOf(otherSet: IImmutableSet<T>): boolean;
// 	intersection(otherSet: IImmutableSet<T>): Set<T>;
// 	union(otherSet: IImmutableSet<T>): Set<T>;
// 	getAllSubsets(): Set<T>[];
// }

// export interface ISet<T> extends ICollection<T>, IImmutableSet<T> {
// 	remove(item: T): boolean;
// 	intersectionInPlace(otherSet: IImmutableSet<T>): void;
// 	unionInPlace(otherSet: IImmutableSet<T>): void;
// }

const typenameSet = 'Set';

export function isSet<T>(obj: unknown): obj is Set<T> {
	const otherSet = obj as Set<T>;

	return typeof otherSet !== 'undefined' && otherSet.typename === typenameSet;
}

export class Set<T> extends CollectionArrayBase<T> implements ISet<T> {
	// Static methods

	public static createFromArray<U>(array: U[]): Set<U> {
		return new Set<U>(array);
	}

	// Fields (private member data)
	public readonly typename = typenameSet;

	// Constructor

	// constructor(iterable?: Iterable<T>) {
	// 	super(iterable);
	// }

	// Fundamental methods

	public override equals(other: unknown): boolean {
		const otherSet = other as IImmutableSet<T>;

		return isSet<T>(otherSet) && this.isASubsetOf(otherSet) && otherSet.isASubsetOf(this);
	}

	// Accessors

	// Other public methods

	public clone(): Set<T> {
		// Creates a shallow copy

		return new Set<T>(this);
	}

	protected protectedAdd(item: T): boolean {
		if (this.contains(item)) {
			return false;
		}

		this.items.push(item);

		return true;
	}

	public override add(item: T): boolean {
		return this.protectedAdd(item);
	}

	public remove(item: T): boolean {
		const oldSize = this.size;
		const fn = getEqualityComparisonFunction(item);

		this.items = this.items.filter((otherItem: T) => !fn(otherItem));

		return this.size < oldSize;
	}

	public isASubsetOf(otherSet: IImmutableSet<T>): boolean {
		return this.items.every((element: T) => otherSet.contains(element));
	}

	public isEqualTo(otherSet: IImmutableSet<T>): boolean {
		// Deprecated. Use equals()
		return this.isASubsetOf(otherSet) && otherSet.isASubsetOf(this);
	}

	// Return a new set that is the intersection of this set and otherSet.
	// This set is not modified.

	public intersection(otherSet: IImmutableSet<T>): Set<T> {
		return new Set<T>(this.items.filter((item: T) => otherSet.contains(item)));
	}

	// Remove any of this set's elements that are not also in otherSet, in place (i.e. this set may be modified).

	public intersectionInPlace(otherSet: IImmutableSet<T>): void {
		this.items = this.items.filter((item: T) => otherSet.contains(item));
	}

	// Return a new set that is the union of this set and otherSet.
	// This set is not modified.

	public union(otherSet: IImmutableSet<T>): Set<T> {
		return new Set<T>(this.items.concat(...otherSet));
	}

	// Add otherSet's elements to this set, in place (i.e. this set may be modified).

	public unionInPlace(otherSet: IImmutableSet<T>): void {
		for (const item of otherSet) {
			this.add(item);
		}
	}

	public getAllSubsets(): Set<T>[] {
		const result: Set<T>[] = [];

		this.getAllSubsetsHelper(result);

		return result;
	}

	// Private methods

	private getAllSubsetsHelper(
		arrayOfSubsets: Set<T>[],
		subsetAsArray: T[] = [],
		index = 0
	): void {
		if (index >= this.items.length) {
			arrayOfSubsets.push(new Set<T>(subsetAsArray));
		} else {
			subsetAsArray.push(this.items[index]);
			this.getAllSubsetsHelper(arrayOfSubsets, subsetAsArray, index + 1);
			subsetAsArray.pop();
			this.getAllSubsetsHelper(arrayOfSubsets, subsetAsArray, index + 1);
		}
	}

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
