// github:tom-weatherhead/common-utilities.ts/test/collection-classes/priority-queue.test.ts

'use strict';

import { PriorityQueue } from '../..';

test('Priority Queue test', () => {
	// Arrange
	const item1 = 2;
	const item2 = 5;
	const item3 = 3;
	const fnComparator = (item1: number, item2: number) => item1 > item2;
	const priorityQueue = new PriorityQueue<number>(fnComparator);

	// Act
	priorityQueue.enqueue(item1);
	priorityQueue.enqueue(item2);
	priorityQueue.enqueue(item3);

	const dequeuedValue1 = priorityQueue.dequeue();
	const dequeuedValue2 = priorityQueue.dequeue();
	const dequeuedValue3 = priorityQueue.dequeue();

	// Assert
	expect(priorityQueue).toBeTruthy();
	expect(dequeuedValue1).toEqual(item2);
	expect(dequeuedValue2).toEqual(item3);
	expect(dequeuedValue3).toEqual(item1);
});

test('Priority Queue iterator test', () => {
	// Arrange
	const item1 = 2;
	const item2 = 5;
	const item3 = 3;
	const item4 = 7;
	const fnComparator = (item1: number, item2: number) => item1 > item2;
	const priorityQueue = new PriorityQueue<number>(fnComparator);

	// Act
	priorityQueue.enqueue(item1);
	priorityQueue.enqueue(item2);
	priorityQueue.enqueue(item3);

	const iterator = priorityQueue.getIterator();

	priorityQueue.enqueue(item4); // The iterator above should not see this value

	const dequeuedValue1 = iterator.next();
	const dequeuedValue2 = iterator.next();
	const dequeuedValue3 = iterator.next();
	const dequeuedValue4 = iterator.next();

	// Assert
	expect(priorityQueue).toBeTruthy();
	expect(dequeuedValue1).toEqual(item2);
	expect(dequeuedValue2).toEqual(item3);
	expect(dequeuedValue3).toEqual(item1);
	expect(dequeuedValue4).toEqual(undefined);
});
