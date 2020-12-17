// github:tom-weatherhead/common-utilities.ts/src/regexes.ts

'use strict';

import * as engine from '..';

// test('UniversalFunctor1', () => {
// 	// Arrange
// 	const expectedValue: number[] = [4, 6, 10];

// 	// Act
// 	const fnMapElement = (n: number) => 2 * n;
// 	const actualValue: number[] = new engine.UniversalFunctor<number[]>([2, 3, 5])
// 		.map((array: number[]) => array.map(fnMapElement))
// 		.getValue();

// 	// Assert
// 	expect(actualValue).toEqual(expectedValue);
// });

test('Integer Regular Expression Test', () => {
	// Arrange
	const inputString01 = '';
	const inputString02 = '0';
	const inputString03 = '+0';
	const inputString04 = '-0';
	const inputString05 = '1';
	const inputString06 = '+1';
	const inputString07 = '-1';
	const inputString08 = '01';
	const inputString09 = '00';
	const inputString10 = '001';
	const inputString11 = '1234';
	const inputString12 = '-999';
	const inputString13 = '1.5';
	const inputString14 = 'abc';
	const inputString15 = '--1';

	// Act
	// Assert
	expect(inputString01.match(engine.regexInteger)).toBeFalsy();
	expect(inputString02.match(engine.regexInteger)).toBeTruthy();
	expect(inputString03.match(engine.regexInteger)).toBeFalsy();
	expect(inputString04.match(engine.regexInteger)).toBeFalsy();
	expect(inputString05.match(engine.regexInteger)).toBeTruthy();
	expect(inputString06.match(engine.regexInteger)).toBeFalsy();
	expect(inputString07.match(engine.regexInteger)).toBeTruthy();
	expect(inputString08.match(engine.regexInteger)).toBeFalsy();
	expect(inputString09.match(engine.regexInteger)).toBeFalsy();
	expect(inputString10.match(engine.regexInteger)).toBeFalsy();
	expect(inputString11.match(engine.regexInteger)).toBeTruthy();
	expect(inputString12.match(engine.regexInteger)).toBeTruthy();
	expect(inputString13.match(engine.regexInteger)).toBeFalsy();
	expect(inputString14.match(engine.regexInteger)).toBeFalsy();
	expect(inputString15.match(engine.regexInteger)).toBeFalsy();
});

test('Floating-Point Number Regular Expression Test', () => {
	// Arrange
	const inputString01 = '';
	const inputString02 = '0';
	const inputString03 = '+0';
	const inputString04 = '-0';
	const inputString05 = '1';
	const inputString06 = '+1';
	const inputString07 = '-1';
	const inputString08 = '01';
	const inputString09 = '00';
	const inputString10 = '001';
	const inputString11 = '1234';
	const inputString12 = '-999';
	const inputString13 = '1.5';
	const inputString14 = 'abc';
	const inputString15 = '--1';
	const inputString16 = '-0.25';
	const inputString17 = '01.5';
	const inputString18 = '00.5';
	const inputString19 = '.5';
	const inputString20 = '1.';
	const inputString21 = '.';
	const inputString22 = '0.0';
	const inputString23 = '-0.0';

	// Act
	// Assert
	expect(inputString01.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString02.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString03.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString04.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString05.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString06.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString07.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString08.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString09.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString10.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString11.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString12.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString13.match(engine.regexFloatingPointNumber)).toBeTruthy();
	expect(inputString14.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString15.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString16.match(engine.regexFloatingPointNumber)).toBeTruthy();
	expect(inputString17.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString18.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString19.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString20.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString21.match(engine.regexFloatingPointNumber)).toBeFalsy();
	expect(inputString22.match(engine.regexFloatingPointNumber)).toBeTruthy();
	expect(inputString23.match(engine.regexFloatingPointNumber)).toBeFalsy();
});
