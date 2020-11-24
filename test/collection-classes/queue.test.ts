// github:tom-weatherhead/common-utilities.ts/test/collection-classes/queue.test.ts

'use strict';

import { Queue } from '../../esm/main';

test('Queue test', () => {
	// Arrange
	const item1 = 2;
	const item2 = 3;
	const item3 = 5;
	const queue = new Queue<number>();

	// Act
	queue.enqueue(item1);
	queue.enqueue(item2);
	queue.enqueue(item3);

	const dequeuedValue1 = queue.dequeue();
	const dequeuedValue2 = queue.dequeue();
	const dequeuedValue3 = queue.dequeue();

	// Assert
	expect(dequeuedValue1).toEqual(item1);
	expect(dequeuedValue2).toEqual(item2);
	expect(dequeuedValue3).toEqual(item3);
});

test('Queue iterator test', () => {
	// Arrange
	const item1 = 2;
	const item2 = 3;
	const item3 = 5;
	const queue = new Queue<number>();

	// Act
	queue.enqueue(item1);
	queue.enqueue(item2);
	queue.enqueue(item3);

	const iterator = queue.getIterator();

	// Assert
	expect(iterator.isDone()).toBeFalsy();

	const dequeuedValue1 = iterator.next();

	expect(iterator.isDone()).toBeFalsy();

	const dequeuedValue2 = iterator.next();

	expect(iterator.isDone()).toBeFalsy();

	const dequeuedValue3 = iterator.next();

	expect(iterator.isDone()).toBeTruthy();
	expect(dequeuedValue1).toEqual(item1);
	expect(dequeuedValue2).toEqual(item2);
	expect(dequeuedValue3).toEqual(item3);

	const dequeuedValue4 = iterator.next();

	expect(dequeuedValue4).toEqual(undefined);
});
