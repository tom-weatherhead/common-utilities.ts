// github:tom-weatherhead/common-utilities.ts/src/interfaces/iequality-comparable.ts

export interface IEqualityComparable {
	equals(other: unknown): boolean;
}

// A user-defined type guard. See e.g. https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates

export function isIEqualityComparable(obj: unknown): obj is IEqualityComparable {
	const iec = obj as IEqualityComparable;

	return typeof iec !== 'undefined' && typeof iec.equals === 'function';
	// ... and ensure that iec.equals() takes exactly one parameter:
	// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
	// && iec.equals.length === 1;
}
