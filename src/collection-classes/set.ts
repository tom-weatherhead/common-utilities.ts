// github:tom-weatherhead/common-utilities.ts/src/collection-classes/set.ts

import { IIterator } from './iiterator';
import { Iterator } from './iterator';

export class Set<T> {
	public static createFromArray<U>(array: U[]): Set<U> {
		const result = new Set<U>();

		array.forEach((element: U) => {
			result.add(element);
		});

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

	private items: T[] = [];

	public clone(): Set<T> {
		const result = new Set<T>();

		this.items.forEach((element: T) => {
			result.add(element);
		});

		return result;
	}

	public clear(): void {
		this.items = [];
	}

	public add(item: T): void {
		if (!this.contains(item)) {
			this.items.push(item);
		}
	}

	public remove(item: T): void {
		// Or: Use indexOf() and splice(), since item should occur in this.items at most one time?
		this.items = this.items.filter((otherItem: T) => otherItem !== item);
	}

	public contains(item: T): boolean {
		// TODO? : Pass in the equality test predicate as a parameter?

		return this.items.indexOf(item) >= 0;
	}

	public isEmpty(): boolean {
		return this.items.length === 0;
	}

	public isASubsetOf(otherSet: Set<T>): boolean {
		return this.items.every((element: T) => otherSet.contains(element));
	}

	public isEqualTo(otherSet: Set<T>): boolean {
		return this.isASubsetOf(otherSet) && otherSet.isASubsetOf(this);
	}

	// Return a new set that is the intersection of this set and otherSet.
	// This set is not modified.

	public intersection(otherSet: Set<T>): Set<T> {
		const result = this.clone();

		result.intersectionInPlace(otherSet);

		return result;
	}

	// Remove any of this set's elements that are not also in otherSet, in place (i.e. this set may be modified).

	public intersectionInPlace(otherSet: Set<T>): void {
		const elementsToRemove = new Set<T>();

		this.items.forEach((element: T) => {
			if (!otherSet.contains(element)) {
				elementsToRemove.add(element);
			}
		});

		elementsToRemove.items.forEach((element: T) => {
			this.remove(element);
		});
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
		otherSet.items.forEach((element: T) => {
			this.add(element);
		});
	}

	public getAllSubsets(): Set<T>[] {
		const result: Set<T>[] = [];

		this.getAllSubsetsHelper(result, [], 0);

		return result;
	}

	public getIterator(): IIterator<T> {
		return Iterator.cloneAndConstruct(this.items);
	}

	private getAllSubsetsHelper(
		arrayOfSubsets: Set<T>[],
		subsetAsArray: T[],
		index: number
	): void {
		if (index >= this.items.length) {
			arrayOfSubsets.push(Set.createFromArray(subsetAsArray));
		} else {
			subsetAsArray.push(this.items[index]);
			this.getAllSubsetsHelper(arrayOfSubsets, subsetAsArray, index + 1);
			subsetAsArray.pop();
			this.getAllSubsetsHelper(arrayOfSubsets, subsetAsArray, index + 1);
		}
	}
}
