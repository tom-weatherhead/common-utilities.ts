// github:tom-weatherhead/common-utilities.ts/src/collection-classes/icollection.ts

import { IEqualityComparable } from '../interfaces/iequality-comparable';

export interface IImmutableCollection<T> extends IEqualityComparable, Iterable<T> {
	// Iterable<T> contains: [Symbol.iterator](): IterableIterator<T>

	size: number;
	toString(): string;
	toArray(): T[];
	isEmpty(): boolean;
	// clear(): void;
	contains(item: T): boolean;
	// add(item: T): boolean;

	// The signature and semantics of remove() can be class-specific.
	// remove(item: T): boolean;
}

// TODO?:

// export interface IImmutableCollection<T> extends Iterable<T> { ... }
//
export interface ICollection<T> extends IImmutableCollection<T> {
	clear(): void;
	add(item: T): boolean;
}
