// github:tom-weatherhead/common-utilities.ts/src/json.js

'use strict';

export function safeJsonParse<T>(str: string, dflt?: T): T {
	let result: T | undefined;
	let errorToThrow = new Error('safeJsonParse() : Typecast error');

	try {
		result = JSON.parse(str) as T;
	} catch (e) {
		errorToThrow = e;
	}

	if (typeof result !== 'undefined') {
		return result;
	} else if (typeof dflt !== 'undefined') {
		return dflt;
	} else {
		throw errorToThrow;
	}
}
