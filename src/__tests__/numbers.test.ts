import * as numbers from '../numbers';

test('fnAddition', () => {
	// Arrange
	const expectedValue: number = 5;

	// Act
	const actualValue: number = numbers.fnAddition(2, 3);

	// Assert
	expect(actualValue).toEqual(expectedValue);
});
