// github:tom-weatherhead/common-utilities.ts/src/collection-classes/icollection.ts

// TODO: As much as is possible, make our collection interfaces extend
// Typescript's own collection interfaces, e.g.:
// MapLike<T>, ReadonlyCollection<K>, Collection<K>, ReadonlyESMap<K, V>,
// ReadonlyMap<T>, ESMap<K, V>, Map<T>, ReadonlySet<T>, Set<T>.
// See the first ~80 lines of node_modules/typescript/lib/typescript.d.ts

// import { IEqualityComparable } from '../interfaces/iequality-comparable';
//
// export interface IImmutableCollection<T> extends IEqualityComparable, Iterable<T> {
// 	// Iterable<T> contains: [Symbol.iterator](): IterableIterator<T>
//
// 	size: number;
// 	toString(): string;
// 	toArray(): T[];
// 	isEmpty(): boolean;
// 	contains(item: T): boolean;
//
// 	// The signature and semantics of remove() can be class-specific.
// 	// remove(item: T): boolean;
//
// 	// Iterator-based methods
// 	find(pred: (item: T) => boolean): T | undefined;
// 	some(pred: (item: T) => boolean): boolean;
// 	every(pred: (item: T) => boolean): boolean;
// }

export interface ICollection<T> extends IImmutableCollection<T> {
	clear(): void;
	add(item: T): boolean;
}
