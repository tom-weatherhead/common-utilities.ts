// rollup.config.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { terser } = require("rollup-plugin-terser");

export default [
	{
		input: "./esm/main.js",
		output: [
			{
				file: "dist/thaw-common-utilities.cjs.js",
				format: "cjs",
				exports: "named"
			},
			{
				file: "dist/thaw-common-utilities.esm.js",
				format: "es",
				compact: true,
				plugins: [terser()]
			},
			{
				file: "dist/thaw-common-utilities.js",
				name: "thaw-common-utilities.ts",
				format: "umd",
				compact: true,
				plugins: [terser()]
			}
		]
	}
];
