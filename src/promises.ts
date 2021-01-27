// github:tom-weatherhead/common-utilities.ts/src/promises.ts

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function promisify(
	fn: Function,
	context: any
): (...args: any[]) => Promise<any> {
	return (...args: any[]) => {
		return new Promise((resolve, reject) => {
			function customCallback(err: any, result: any) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}

			args.push(customCallback);
			// fn.call(context || this, ...args);
			fn.call(context, ...args);
		});
	};
}
