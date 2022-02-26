// github:tom-weatherhead/common-utilities.ts/src/interfaces/icomparable.ts

export interface IComparable<T> {
	compareTo(other: T): number;
}

// A user-defined type guard. See e.g. https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates

export function isIComparable<T>(obj: unknown): obj is IComparable<T> {
	const ic = obj as IComparable<T>;

	return typeof ic !== 'undefined' && typeof ic.compareTo === 'function';
	// ... and ensure that ic.compareTo() takes exactly one parameter:
	// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
	// && ic.compareTo.length === 1;
}
