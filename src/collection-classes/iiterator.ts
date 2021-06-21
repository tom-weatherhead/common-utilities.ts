// github:tom-weatherhead/common-utilities.ts/src/collection-classes/iiterator.ts

// error TS2488: Type 'IIterator<T>' must have a '[Symbol.iterator]()' method that returns an iterator.

export interface IIterator<T> {
	isDone(): boolean;
	next(): T | undefined;

	// filter(pred: (element: T) => boolean): IIterator<T>;
	forEach(fn: (element: T) => unknown): void;
}
