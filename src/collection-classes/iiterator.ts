// github:tom-weatherhead/common-utilities.ts/src/collection-classes/iiterator.ts

export interface IIterator<T> {
	isDone(): boolean;
	next(): T | undefined;

	// filter(pred: (element: T) => boolean): IIterator<T>;
	forEach(fn: (element: T) => unknown): void;
}
