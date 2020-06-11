// github:tom-weatherhead/common-utilities.ts/src/json.js

'use strict';

import { isDefined } from './types';

export function safeJsonParse(str: string, dflt: any): any {
	try {
		return JSON.parse(str);
	} catch (e) {
		if (!isDefined(dflt)) {
			throw e;
		}

		return dflt;
	}
}
