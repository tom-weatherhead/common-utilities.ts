// github:tom-weatherhead/common-utilities.ts/src/trees/avl-hash-tree.ts

// import IAVLHashTreeKey from './iavl-hash-tree-key';

// export default interface IAVLHashTreeKey<K> {
// 	equals(other: K): boolean;
// 	getHashCode(): number;
// }

// class AVLHashTreeNode<K, V> {
// 	private hashCode: number;
// 	private hashBucket: Array<[K, V]>;
// 	private leftChild: AVLHashTreeNode<K, V> | null;
// 	private rightChild: AVLHashTreeNode<K, V> | null;

// 	constructor(hashCode: number) {
// 		this.hashCode = hashCode;
// 		this.hashBucket = [];
// 		this.leftChild = null;
// 		this.rightChild = null;
// 	}

// 	public get(key: K, hashCodeOfKey: number): V | null {

// 		if (hashCodeOfKey < this.hashCode) {
// 			return this.leftChild ? this.leftChild.get(key, hashCodeOfKey) : null;
// 		} else if (hashCodeOfKey > this.hashCode) {
// 			return this.rightChild ? this.rightChild.get(key, hashCodeOfKey) : null;
// 		} else {
// 			const bucketEntry = this.hashBucket.find((be: [K, V]) => key.equals(be[0]));

// 			if (bucketEntry) {
// 				return bucketEntry[1];
// 			} else {
// 				return null;
// 			}
// 		}
// 	}

// 	// public set(key: K, hashCodeOfKey: number, value: V): void {
// 	// 	return;
// 	// }

// 	// public delete(key: K, hashCodeOfKey: number): boolean {
// 	// 	return true;
// 	// }
// }

// export default class AVLHashTree<K, V> where K implements IAVLHashTreeKey<K> {
// export default class AVLHashTree<K implements IAVLHashTreeKey<K>, V> {
export default class AVLHashTree<K, V> {
	// private root: AVLHashTreeNode<K, V> | null;
	private internalMap = new Map<number, [K, V][]>();
	private fnGetHashCode: (key: K) => number;
	private fnKeyEquals: (key1: K, key2: K) => boolean;

	constructor(
		fnGetHashCode: (key: K) => number,
		fnKeyEquals: (key1: K, key2: K) => boolean
	) {
		// this.root = null;
		this.fnGetHashCode = fnGetHashCode;
		this.fnKeyEquals = fnKeyEquals;
	}

	public get(key: K): V | null {
		// if (this.root) {
		// 	return this.root.get(key, key.getHashCode());
		// } else {
		// 	return null;
		// }

		const hashCodeOfKey = this.fnGetHashCode(key);
		const keyValuePairArray = this.internalMap.get(hashCodeOfKey);

		// if (!(keyValuePairArray instanceof Array<[K, V]>)) {
		if (typeof keyValuePairArray === 'undefined') {
			return null;
		}

		const keyValuePair = keyValuePairArray.find((kvp: [K, V]) =>
			this.fnKeyEquals(kvp[0], key)
		);

		if (typeof keyValuePair === 'undefined') {
			return null;
		}

		return keyValuePair[1];
	}

	public set(key: K, value: V): void {
		// This may insert a node, which may cause pivots to occur.

		const hashCodeOfKey = this.fnGetHashCode(key);
		const keyValuePairArray = this.internalMap.get(hashCodeOfKey);

		// if (!(keyValuePairArray instanceof Array<[K, V]>)) {
		if (typeof keyValuePairArray === 'undefined') {
			this.internalMap.set(hashCodeOfKey, [[key, value]]);

			return;
		}

		const i = keyValuePairArray.findIndex((kvp: [K, V]) =>
			this.fnKeyEquals(kvp[0], key)
		);

		if (i < 0) {
			keyValuePairArray.push([key, value]);
		} else {
			// We need to replace an existing value.
			keyValuePairArray[i][1] = value;
		}

		this.internalMap.set(hashCodeOfKey, keyValuePairArray);
	}

	// public delete(key: K): boolean {
	// 	// This may delete a node, which may cause pivots to occur.

	// 	return true;
	// }
}
