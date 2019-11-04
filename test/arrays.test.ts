import * as engine from '../lib/main';

test('max', () => {
	// Arrange
	const expectedValue: number = 9;

	// Act
	const actualValue: number = engine.max([8, 6, 9, 5, 3, 0, 7]);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

test('min', () => {
	// Arrange
	const expectedValue: number = 1;

	// Act
	const actualValue: number = engine.min([8, 6, 9, 5, 3, 1, 7]);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});

test('maxEmptyArray', () => {
	// Arrange
	// Act
	// Assert
	// Jest: toThrow() : See https://jestjs.io/docs/en/expect#tothrowerror
	expect(() => engine.max([])).toThrow();
});
