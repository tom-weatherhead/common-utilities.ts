// github:tom-weatherhead/common-utilities.ts/src/strings.ts

'use strict';

export function replicateString(str: string, n: number): string {
	// if (!isNumber(n)) {
	// 	return undefined;
	// }

	let result = '';

	while (n > 0) {
		result = result + `${str}`;
		--n;
	}

	return result;
}

/*
    numberOfOccurrencesOfSubstringInString(substr: string, str: string): number {

        if (!substr || !str || substr.length === 0) {
            return 0;
        }

        // See https://stackoverflow.com/questions/881085/count-the-number-of-occurrences-of-a-character-in-a-string-in-javascript

        // An older, faster solution:
        return str.split(substr).length - 1;

        // A newer, regex-based solution. (What happens if substr contains special characters?)
        //return (str.match(new RegExp(substr, 'g')) || []).length);
    }
 */
