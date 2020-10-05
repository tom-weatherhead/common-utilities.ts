// github:tom-weatherhead/common-utilities.ts/src/collection-classes/hashtable.ts

'use strict';

export interface IHashable {
	getHashCode(): number;
	equals(obj: unknown): boolean;
}

// See https://www.typescriptlang.org/docs/handbook/generics.html

export interface IHashTable<K extends IHashable, V> {
	get(key: K): V | undefined;
	set(key: K, value: V): boolean; // Returns true for insert, false for update
	delete(key: K): boolean; // Returns true if value was found and removed
}

interface KeyValuePair<K, V> {
	key: K;
	value: V;
}

class HashTable<K extends IHashable, V> implements IHashTable<K, V> {
	// Map key hashes to buckets of values:
	// private readonly hashTable = new Map<number, [K, V][]>();
	private readonly hashTable = new Map<number, KeyValuePair<K, V>[]>();

	public get(key: K): V | undefined {
		const bucket = this.findBucket(key) || [];
		const keyValuePair = bucket.find((kvp) => key.equals(kvp.key));

		if (typeof keyValuePair !== 'undefined') {
			return keyValuePair.value;
		}

		return undefined;
	}

	public set(key: K, value: V): boolean {
		const bucket = this.findBucket(key) || [];
		const newBucket = [{ key, value }].concat(
			this.bucketWithKeyRemoved(bucket, key)
		);

		return newBucket.length > bucket.length;
	}

	public delete(key: K): boolean {
		const bucket = this.findBucket(key);

		if (typeof bucket === 'undefined') {
			return false;
		}

		const newBucket = this.bucketWithKeyRemoved(bucket, key);
		const wasDeleted = newBucket.length < bucket.length;

		if (newBucket.length > 0) {
			this.hashTable.set(key.getHashCode(), newBucket);
		} else {
			this.hashTable.delete(key.getHashCode());
		}

		return wasDeleted;
	}

	private findBucket(key: K): KeyValuePair<K, V>[] | undefined {
		return this.hashTable.get(key.getHashCode());
	}

	private bucketWithKeyRemoved(
		bucket: KeyValuePair<K, V>[],
		key: K
	): KeyValuePair<K, V>[] {
		return bucket.filter((kvp) => !key.equals(kvp.key));
	}
}

export function createHashTable<K extends IHashable, V>(): IHashTable<K, V> {
	return new HashTable<K, V>();
}
