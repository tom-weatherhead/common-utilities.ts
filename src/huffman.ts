// github:tom-weatherhead/common-utilities.ts/src/huffman.ts

import { PriorityQueue } from './collection-classes/priority-queue';

export interface IHuffmanEncodingTreeNode<T> {
	readonly datum?: T;
	readonly count: number;
	readonly leftChild?: IHuffmanEncodingTreeNode<T>;
	readonly rightChild?: IHuffmanEncodingTreeNode<T>;
}

function treeTraversal<T>(
	treeNode: IHuffmanEncodingTreeNode<T>,
	result: [T, string][],
	bitString: string
): [T, string][] {
	if (typeof treeNode.datum !== 'undefined') {
		result.push([treeNode.datum, bitString]);

		// if (
		// 	typeof treeNode.leftChild === 'undefined' ||
		// 	typeof treeNode.rightChild === 'undefined'
		// ) {
		// 	throw new Error('HuffmanEncoding treeTraversal: Children should be undefined.');
		// }
	} else if (
		typeof treeNode.leftChild !== 'undefined' &&
		typeof treeNode.rightChild !== 'undefined'
	) {
		treeTraversal(treeNode.leftChild, result, bitString + '0');
		treeTraversal(treeNode.rightChild, result, bitString + '1');
	} else {
		throw new Error('HuffmanEncoding treeTraversal: Too many undefineds.');
	}

	return result;
}

export function createHuffmanEncoding<T>(input: Iterable<[T, number]>): [T, string][] {
	const fnComparator = (
		t1: IHuffmanEncodingTreeNode<T>,
		t2: IHuffmanEncodingTreeNode<T>
	): boolean => t1.count < t2.count;
	// const iterable: Iterable<IHuffmanEncodingTreeNode<T>> = Array.from(input).map(
	// 	([datum, count]: [T, number]): IHuffmanEncodingTreeNode<T> => {
	// 		return { datum, count };
	// 	}
	// );
	// const pq = new PriorityQueue<IHuffmanEncodingTreeNode<T>>(fnComparator, iterable);
	const pq = new PriorityQueue<IHuffmanEncodingTreeNode<T>>(fnComparator);

	for (const [datum, count] of input) {
		const foo: IHuffmanEncodingTreeNode<T> = { datum, count };

		pq.enqueue(foo);
	}

	while (pq.size > 1) {
		const t1 = pq.dequeue();
		const t2 = pq.dequeue();

		if (typeof t1 === 'undefined' || typeof t2 === 'undefined') {
			throw new Error('createHuffmanEncoding() : t1 or t2 is undefined.');
		}

		pq.enqueue({
			count: t1.count + t2.count,
			leftChild: t1,
			rightChild: t2
		});
	}

	const t = pq.dequeue();

	if (typeof t === 'undefined') {
		throw new Error('createHuffmanEncoding() : t is undefined.');
	}

	return treeTraversal(t, [], '');
}
