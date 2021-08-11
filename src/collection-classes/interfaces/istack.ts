// github:tom-weatherhead/common-utilities.ts/src/collection-classes/interfaces/istack.ts

import { ICollection } from './icollection';
import { IImmutableCollection } from './iimmutable-collection';

export interface IImmutableStack<T> extends IImmutableCollection<T> {
	clone(): IStack<T>;
	peek(): T;
}

export interface IStack<T> extends ICollection<T>, IImmutableStack<T> {
	push(item: T): void;
	pop(): T;
}
