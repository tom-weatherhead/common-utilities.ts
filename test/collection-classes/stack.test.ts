// github:tom-weatherhead/common-utilities.ts/test/collection-classes/stack.test.ts

'use strict';

import { Stack } from '../../lib/main';

test('Stack test', () => {
	// Arrange
	const item1 = 2;
	const item2 = 3;
	const item3 = 5;
	const stack = new Stack<number>();

	// Act
	stack.push(item1);
	stack.push(item2);
	stack.push(item3);

	const poppedValue1 = stack.pop();
	const poppedValue2 = stack.pop();
	const poppedValue3 = stack.pop();

	// Assert
	expect(poppedValue1).toEqual(item3);
	expect(poppedValue2).toEqual(item2);
	expect(poppedValue3).toEqual(item1);
});
