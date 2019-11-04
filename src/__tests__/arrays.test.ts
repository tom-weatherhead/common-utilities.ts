import * as arrays from '../arrays';

test('max', () => {
	// Arrange
	const expectedValue: number = 9;

	// Act
	const actualValue: number = arrays.max([8, 6, 9, 5, 3, 0, 7]);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

test('min', () => {
	// Arrange
	const expectedValue: number = 1;

	// Act
	const actualValue: number = arrays.min([8, 6, 9, 5, 3, 1, 7]);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

test('maxEmptyArray', () => {
	// Arrange
	// Act
	// Assert
	expect(arrays.max([])).toThrow();
});
