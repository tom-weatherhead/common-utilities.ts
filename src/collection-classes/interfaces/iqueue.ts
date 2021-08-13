// github:tom-weatherhead/common-utilities.ts/src/collection-classes/interfaces/iqueue.ts

import { ICollection } from './icollection';

export interface IQueue<T> extends ICollection<T> {
	enqueue(item: T): void;
	dequeue(): T | undefined;
}
