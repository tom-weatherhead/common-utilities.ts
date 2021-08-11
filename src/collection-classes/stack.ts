// github:tom-weatherhead/common-utilities.ts/src/collection-classes/stack.ts

import { CollectionArrayBase } from './collection-array-base';

// import { ICollection, IImmutableCollection } from './icollection';

import { IStack } from './interfaces/istack';

// export interface IImmutableStack<T> extends IImmutableCollection<T> {
// 	clone(): Stack<T>;
// 	peek(): T;
// }
//
// export interface IStack<T> extends ICollection<T>, IImmutableStack<T> {
// 	push(item: T): void;
// 	pop(): T;
// }

export class Stack<T> extends CollectionArrayBase<T> implements IStack<T> {
	// Fields (private member data)

	// Constructor

	// Fundamental methods

	// Accessors

	// Other public methods

	public clone(): Stack<T> {
		// Creates a shallow copy

		return new Stack<T>(this);
	}

	public push(item: T): void {
		this.items.push(item);
	}

	public pop(): T {
		const result = this.items.pop();

		if (typeof result === 'undefined') {
			// throw new EmptyStackException();
			throw new Error('Stack.pop() : Stack underflow: The stack is empty.');
		}

		return result;
	}

	public peek(): T {
		if (this.isEmpty()) {
			// throw new EmptyStackException();
			throw new Error('Stack.peek() : The stack is empty.');
		}

		return this.items[this.items.length - 1];
	}

	protected protectedAdd(item: T): boolean {
		this.push(item);

		return true;
	}

	// Private methods
}
