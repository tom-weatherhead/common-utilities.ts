// github:tom-weatherhead/common-utilities.ts/src/collection-classes/interfaces/iset.ts

import { ICollection } from './icollection';

import { IImmutableCollection } from './iimmutable-collection';

export interface IImmutableSet<T> extends IImmutableCollection<T> {
	clone(): ISet<T>;
	isASubsetOf(otherSet: IImmutableSet<T>): boolean;
	intersection(otherSet: IImmutableSet<T>): ISet<T>;
	union(otherSet: IImmutableSet<T>): ISet<T>;
	getAllSubsets(): ISet<T>[];
}

export interface ISet<T> extends ICollection<T>, IImmutableSet<T> {
	remove(item: T): boolean;
	intersectionInPlace(otherSet: IImmutableSet<T>): void;
	// Or: intersectionInPlace(iterable: Iterable<T>): void;
	unionInPlace(otherSet: IImmutableSet<T>): void;
}
