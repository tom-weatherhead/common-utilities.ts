// github:tom-weatherhead/common-utilities.ts/src/trees/idictionary.ts

'use strict';

export interface IDictionary<K, V> {
	clear(): void;
	// size(): number;
	insert(key: K, value: V): void;
	delete(keyToDelete: K): boolean;
	find(keyToFind: K): V | undefined;
	// getKeys(): K[];
	// getValues(): V[];
}
