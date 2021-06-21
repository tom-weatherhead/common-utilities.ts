// github:tom-weatherhead/common-utilities.ts/src/collection-classes/icollection.ts

export interface ICollection<T> {
	// [Symbol.iterator]()

	size: number;
	toString(): string;
	toArray(): T[];
	clear(): void;
	add(item: T): void;
	remove(item: T): void;
	contains(item: T): boolean;
	isEmpty(): boolean;
}
