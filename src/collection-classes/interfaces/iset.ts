// github:tom-weatherhead/common-utilities.ts/src/collection-classes/interfaces/iset.ts

import { ICollection } from './icollection';
import { IImmutableSet } from './iimmutable-set';

export interface ISet<T> extends ICollection<T>, IImmutableSet<T> {
	remove(item: T): boolean;
	intersectionInPlace(otherSet: IImmutableSet<T>): void;
	unionInPlace(otherSet: IImmutableSet<T>): void;
}
