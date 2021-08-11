// github:tom-weatherhead/common-utilities.ts/src/collection-classes/interfaces/iimmutable-set.ts

import { IImmutableCollection } from './iimmutable-collection';

export interface IImmutableSet<T> extends IImmutableCollection<T> {
	clone(): Set<T>;
	isASubsetOf(otherSet: IImmutableSet<T>): boolean;
	intersection(otherSet: IImmutableSet<T>): Set<T>;
	union(otherSet: IImmutableSet<T>): Set<T>;
	getAllSubsets(): Set<T>[];
}
