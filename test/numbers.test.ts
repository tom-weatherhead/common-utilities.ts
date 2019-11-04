import * as engine from '../lib/main';

test('fnAddition', () => {
	// Arrange
	const expectedValue: number = 5;

	// Act
	const actualValue: number = engine.fnAddition(2, 3);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});
