// github:tom-weatherhead/common-utilities.ts/src/interfaces/istringifiable.ts

export interface IStringifiable {
	toString(): string;
}

export function isIStringifiable(obj: unknown): obj is IStringifiable {
	const isf = obj as IStringifiable;

	return typeof isf !== 'undefined' && typeof isf.toString === 'function';
	// ... and ensure that isf.toString() takes exactly zero parameters:
	// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
	// && isf.toString.length === 0;
}
