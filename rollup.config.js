// rollup.config.js

/**
 * Copyright (c) Tom Weatherhead. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { terser } from 'rollup-plugin-terser';

export default {
	input: './dist/lib/main.js',
	output: [
		{
			file: 'dist/thaw-common-utilities.cjs.js',
			format: 'cjs',
			exports: 'named'
		},
		{
			file: 'dist/thaw-common-utilities.esm.js',
			format: 'es',
			esModule: true,
			compact: true,
			plugins: [terser()]
		},
		{
			file: 'dist/thaw-common-utilities.js',
			name: 'thaw-common-utilities.ts',
			format: 'umd',
			compact: true,
			plugins: [terser()]
		}
	],
	// context: 'window'
	context: 'this'
};
