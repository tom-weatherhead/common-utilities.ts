// github:tom-weatherhead/common-utilities.ts/src/interfaces/istringifiable.ts

export interface IStringifiable {
	toString(): string;
}

export function isIStringifiable(obj: unknown): obj is IStringifiable {
	const iec = obj as IStringifiable;

	return typeof iec !== 'undefined' && typeof iec.toString === 'function';
}
