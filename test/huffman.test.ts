// github:tom-weatherhead/common-utilities.ts/test/huffman.test.ts

'use strict';

import * as engine from '..';

function findEncodingForKey(key: string, data: [string, string][]): string {
	const result = data.find((datum: [string, string]) => datum[0] === key);

	if (typeof result === 'undefined') {
		throw new Error(`HuffmanEncoding: findEncodingForKey('${key}') failed.`);
	}

	console.log(`The Huffman encoding for '${key}' is '${result[1]}'.`);

	return result[1];
}

test('HuffmanEncoding', () => {
	// Arrange
	const input = [
		['a', 1],
		['b', 5],
		['c', 1],
		['d', 1],
		['e', 1]
	];

	// Act
	const actualResult = engine.createHuffmanEncoding(input);

	// Assert
	expect(actualResult.length).toEqual(5);

	expect(findEncodingForKey('a', actualResult).length).toEqual(3);
	expect(findEncodingForKey('b', actualResult).length).toEqual(1);
	expect(findEncodingForKey('c', actualResult).length).toEqual(3);
	expect(findEncodingForKey('d', actualResult).length).toEqual(3);
	expect(findEncodingForKey('e', actualResult).length).toEqual(3);
});
