// github:tom-weatherhead/common-utilities.ts/src/collection-classes/stack.ts

import { CollectionArrayBase } from './collection-array-base';

export class Stack<T> extends CollectionArrayBase<T> {
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
			throw new Error(
				'Stack.pop() : Stack underflow: The stack is empty.'
			);
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
