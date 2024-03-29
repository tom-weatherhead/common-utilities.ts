// github:tom-weatherhead/common-utilities.ts/src/types.ts

// import { booleanInvertFunction, compositeFunctions } from './functions';

/**
 * @method getTypeString
 * @param  {unknown}   obj			The data to be tested for type
 * @return {string}					The name of the data's type
 */
export function getTypeString(obj: unknown): string {
	return Object.prototype.toString.call(obj);

	// ? See https://stackoverflow.com/questions/13613524/get-an-objects-class-name-at-runtime
	// Minification may change the class name.
	// return obj.constructor.name; // obj.constructor fails if typeof obj is unknown
}

export function areTypesEqual(obj1: unknown, obj2: unknown): boolean {
	return getTypeString(obj1) === getTypeString(obj2);
}

function factory_fnIsType(typeName: string): (obj: unknown) => boolean {
	return (arg) => getTypeString(arg) === `[object ${typeName}]`;
}

// Done: npm i -D @babel/preset-env
// Done: Babel presets in Gruntfile: "presets": [ "@babel/preset-env" ]
// See https://github.com/babel/babel/issues/8575
// See https://github.com/storybooks/storybook/issues/3937
// See https://stackoverflow.com/questions/52092739/upgrade-to-babel-7-cannot-read-property-bindings-of-null

// export function isDefined (obj) {
// 	return typeof obj !== '[object Undefined]';
// }

// export const isUndefined: (obj: any) => boolean = factory_fnIsType(
// 	'Undefined'
// );
export const isUndefined: (obj: unknown) => boolean = (obj) => typeof obj === 'undefined';
// I.e. isDefined(arg) === booleanInvertFunction(isUndefined(arg))
// export const isDefined: (obj: any) => boolean = compositeFunctions([isUndefined, booleanInvertFunction]);
// export const isDefined: (obj: any) => boolean = obj =>
// 	!factory_fnIsType('Undefined')(obj);
export const isDefined: (obj: unknown) => boolean = (obj) => typeof obj !== 'undefined';

export const isArray: (obj: unknown) => boolean = factory_fnIsType('Array');

export const isBoolean: (obj: unknown) => boolean = factory_fnIsType('Boolean');

export const isDate: (obj: unknown) => boolean = factory_fnIsType('Date');

export const isFunction: (obj: unknown) => boolean = factory_fnIsType('Function');

const isNumberType: (obj: unknown) => boolean = factory_fnIsType('Number');
// export const isNumber = arg => isNumberType(arg) && arg === arg; // This works too, since NaN !== NaN.
export const isNumber: (obj: unknown) => boolean = (arg) =>
	isNumberType(arg) && !Number.isNaN(arg as number);
// && typeof arg === 'number'
// && Number.isFinite(arg);

export function isSafeNumber(n: unknown): boolean {
	return typeof n === 'number' && !Number.isNaN(n) && Number.isFinite(n);
}

// isInteger() is in numbers.ts
// export function isInteger(arg: unknown): boolean {
// 	return typeof arg === 'number' && Number.isInteger(arg);
// }

export const isObject: (obj: unknown) => boolean = factory_fnIsType('Object');

export const isRegularExpression: (obj: unknown) => boolean = factory_fnIsType('RegExp');

export const isString: (obj: unknown) => boolean = factory_fnIsType('String');

export const isArrayOf: (obj: unknown, fn: (element: unknown) => boolean) => boolean = (
	arg,
	fn
) => isArray(arg) && (arg as unknown[]).every(fn);

// export const isArrayOfNumbers = arg => isArray(arg) && arg.every(isNumber);
export const isArrayOfNumbers: (obj: unknown) => boolean = (arg) => isArrayOf(arg, isNumber);

export const isAggregateEntity: (obj: unknown) => boolean = (arg) =>
	isArray(arg) || isObject(arg);

// Deprecated. Superseded by ifDefinedThenElse<T>()
// export const ifDefinedElse: (obj: any, dflt: any) => boolean = (arg, dflt) =>
// 	isDefined(arg) ? arg : dflt;

export function ifDefinedThenElse<T>(valueIn: T | undefined, defaultOut: T): T {
	if (typeof valueIn !== 'undefined') {
		return valueIn;
	} else {
		return defaultOut;
	}
}

export function ifDefinedThenMapElse<T, U>(
	valueIn: T | undefined,
	fn: (value: T) => U,
	defaultOut: U
): U {
	if (typeof valueIn !== 'undefined') {
		return fn(valueIn);
	} else {
		return defaultOut;
	}
}
