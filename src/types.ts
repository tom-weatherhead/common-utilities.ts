// github:tom-weatherhead/common-utilities.ts/src/types.ts

'use strict';

import { booleanInvertFunction, compositeFunctions } from './functions';

export function getTypeString(obj: any): string {
	return Object.prototype.toString.call(obj);
}

export function areTypesEqual(obj1: any, obj2: any): boolean {
	return getTypeString(obj1) === getTypeString(obj2);
}

function factory_fnIsType(typeName: string): (obj: any) => boolean {
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
export const isUndefined: (obj: any) => boolean = (obj) =>
	typeof obj === 'undefined';
// I.e. isDefined(arg) === booleanInvertFunction(isUndefined(arg))
// export const isDefined: (obj: any) => boolean = compositeFunctions([isUndefined, booleanInvertFunction]);
// export const isDefined: (obj: any) => boolean = obj =>
// 	!factory_fnIsType('Undefined')(obj);
export const isDefined: (obj: any) => boolean = (obj) =>
	typeof obj !== 'undefined';

export const isArray: (obj: any) => boolean = factory_fnIsType('Array');

export const isBoolean: (obj: any) => boolean = factory_fnIsType('Boolean');

export const isDate: (obj: any) => boolean = factory_fnIsType('Date');

export const isFunction: (obj: any) => boolean = factory_fnIsType('Function');

const isNumberType: (obj: any) => boolean = factory_fnIsType('Number');
// export const isNumber = arg => isNumberType(arg) && arg === arg; // This works too, since NaN !== NaN.
export const isNumber: (obj: any) => boolean = (arg) =>
	isNumberType(arg) && !Number.isNaN(arg);
// && Number.isFinite(arg);

export const isObject: (obj: any) => boolean = factory_fnIsType('Object');

export const isRegularExpression: (obj: any) => boolean = factory_fnIsType(
	'RegExp'
);

export const isString: (obj: any) => boolean = factory_fnIsType('String');

export const isArrayOf: (
	obj: any,
	fn: (element: any) => boolean
) => boolean = (arg, fn) => isArray(arg) && arg.every(fn);

// export const isArrayOfNumbers = arg => isArray(arg) && arg.every(isNumber);
export const isArrayOfNumbers: (obj: any) => boolean = (arg) =>
	isArrayOf(arg, isNumber);

export const isAggregateEntity: (obj: any) => boolean = (arg) =>
	isArray(arg) || isObject(arg);

// Deprecated. Superseded by ifDefinedThenElse<T>()
export const ifDefinedElse: (obj: any, dflt: any) => boolean = (arg, dflt) =>
	isDefined(arg) ? arg : dflt;

export function ifDefinedThenElse<T>(
	valueIn: T | undefined,
	defaultOut: T
): T {
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
