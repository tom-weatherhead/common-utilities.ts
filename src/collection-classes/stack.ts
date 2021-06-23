// github:tom-weatherhead/common-utilities.ts/src/collection-classes/stack.ts

import { ICollection } from './icollection';
import {
	IEqualityComparable,
	isIEqualityComparable
} from '../interfaces/iequality-comparable';
import { IIterator } from './iiterator';
import { Iterator } from './iterator';

// TODO:
// import { CollectionArrayBase } from './collection-array-base';

// export class Stack<T> extends CollectionArrayBase<T> { ... }

export class Stack<T> implements ICollection<T> {
	// Fields (private member data)

	private items: T[] = [];

	// Constructor

	constructor(iterable?: Iterable<T>) {
		if (typeof iterable !== 'undefined') {
			for (const item of iterable) {
				this.push(item);
			}
		}
	}

	// Fundamental methods

	public [Symbol.iterator](): IterableIterator<T> {
		return this.items[Symbol.iterator]();
	}

	public toString(): string {
		return `[${this.items.join(', ')}]`;
	}

	// Accessors

	public get size(): number {
		return this.items.length;
	}

	// Other public methods

	public clone(): Stack<T> {
		// Creates a shallow copy

		return new Stack<T>(this);
	}

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

	public push(item: T): void {
		this.items.push(item);
	}

	public pop(): T | undefined {
		if (this.isEmpty()) {
			// throw new EmptyStackException();
			throw new Error(
				'Stack.pop() : Stack underflow: The stack is empty.'
			);
		}

		return this.items.pop();
	}

	protected protectedAdd(item: T): boolean {
		this.push(item);

		return true;
	}

	public add(item: T): boolean {
		return this.protectedAdd(item);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// public remove(item: T): void {
	// 	throw new Error('Stack.remove() : Boom.');
	// }

	public contains(item: T): boolean {
		const fn = this.getEqualityComparisonFunction(item);

		return typeof this.items.find(fn) !== 'undefined';
	}

	// public isEqualTo(otherStack: Stack<T>): boolean {
	// 	return ...;
	// }

	public getIterator(): IIterator<T> {
		return Iterator.cloneAndConstruct(this.items);
	}

	// Private methods

	private getEqualityComparisonFunction(item: T): (otherItem: T) => boolean {
		if (isIEqualityComparable(item)) {
			const castItem = item as IEqualityComparable;

			return (otherItem: T) => castItem.strictEquals(otherItem);
		}

		return (otherItem: T) => otherItem === item;
	}
}
