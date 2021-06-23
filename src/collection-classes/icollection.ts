// github:tom-weatherhead/common-utilities.ts/src/collection-classes/icollection.ts

export interface ICollection<T> extends Iterable<T> {
	// Iterable<T> contains: [Symbol.iterator](): IterableIterator<T>

	size: number;
	toString(): string;
	toArray(): T[];
	isEmpty(): boolean;
	clear(): void;
	contains(item: T): boolean;
	add(item: T): boolean;

	// The signature and semantics of remove() can be class-specific.
	// remove(item: T): boolean;
}
