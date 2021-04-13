// github:tom-weatherhead/common-utilities.ts/src/arrays-of-numbers.ts

import {
	createArrayFromElement,
	getLastElementOfArray,
	max,
	min
} from './arrays';

import { pointwise } from './functions';

import { product, sum } from './numbers';

import { clone } from './objects';

import { ifDefinedThenElse } from './types';

export function createNaNArray(length: number): number[] {
	return createArrayFromElement(NaN, length);
}

export function normalize(array: number[]): number[] {
	if (!array.length) {
		return [];
	}

	const minValue = min(array);
	const maxValue = max(array);
	const range = maxValue - minValue;

	if (!range) {
		return createNaNArray(array.length);
	}

	return array.map((n) => (n - minValue) / (maxValue - minValue));
}

export function mean(arg: number[]): number {
	if (arg.length <= 0) {
		return NaN;
	}

	return sum(...arg) / arg.length;
}

export function median(arg: number[]): number {
	if (arg.length <= 0) {
		return NaN;
	}

	const sortedArray = clone(arg).sort(); // Array.sort() sorts the array *in place*

	return sortedArray[Math.floor(sortedArray.length / 2)];
}

// Version 1: Dot product of 2 arrays.
// Version 2: Dot product of n arrays.
// export function dotProductVersion1(
// 	array1: number[],
// 	array2: number[]
// ): number {
// 	const len = Math.min(array1.length, array2.length);

// 	return sum(
// 		...array1.slice(0, len).map((n1: number, i: number) => n1 * array2[i])
// 	);
// }

// Was dotProductVersion2
export function dotProduct(...serieses: number[][]): number {
	if (serieses.length === 0) {
		return NaN;
	}

	return sum(...pointwise(product, ...serieses));
}

// Cross product (i.e. Cartesian product)
// Version 1: Cross product of 2 arrays.
// Version 2: Cross product of n arrays.
// export function crossProductVersion1(
// 	array1: number[],
// 	array2: number[]
// ): number[][] {
// 	return array1.reduce(
// 		(accumulator1: number[][], n1: number) =>
// 			accumulator1.concat(
// 				array2.reduce(
// 					(accumulator2: number[][], n2: number) =>
// 						accumulator2.concat([[n1, n2]]),
// 					[]
// 				)
// 			),
// 		[]
// 	);
// }

function crossProductVersion2Helper(
	accumulator: number[][],
	...aa: number[][]
): number[][] {
	if (aa.length === 0) {
		return accumulator;
	}

	accumulator = accumulator.reduce(
		(accumulator1: number[][], accumulatorElement: number[]) =>
			accumulator1.concat(
				aa[0].reduce(
					(accumulator2: number[][], n2: number) =>
						accumulator2.concat([accumulatorElement.concat([n2])]),
					[]
				)
			),
		[]
	);

	return crossProductVersion2Helper(accumulator, ...aa.slice(1));
}

// Cross product (i.e. Cartesian product)
// Was crossProductVersion2
export function crossProduct(...aa: number[][]): number[][] {
	return crossProductVersion2Helper([[]], ...aa);
}

export function generateHierarchyOfLocalMaximaAndMinima(
	array: number[]
): Record<string, unknown>[][] {
	const result = [];

	let currentTier = array.map((element) => {
		return {
			maximum: element,
			minimum: element
		};
	});

	result.unshift(currentTier);

	while (currentTier.length > 1) {
		const newTier = [];

		for (let i = 0; i < currentTier.length; i += 2) {
			const value1 = currentTier[i];
			let combinedValue;

			if (i + 1 < currentTier.length) {
				const value2 = currentTier[i + 1];

				combinedValue = {
					maximum: Math.max(value1.maximum, value2.maximum),
					minimum: Math.min(value1.minimum, value2.minimum)
				};
			} else {
				combinedValue = {
					maximum: value1.maximum,
					minimum: value1.minimum
				};
			}

			newTier.push(combinedValue);
		}

		currentTier = newTier;
		result.unshift(currentTier);
	}

	return result;
}

// from core.ts in ta-math :

// export function sd(series: Array<number>) {
// 	let E = mean(series);
// 	let E2 = mean(pointwise((x: number) => x * x, series));

// 	return Math.sqrt(E2 - E * E);
// }

export function standardDeviation(arg: number[]): number {
	if (arg.length <= 1) {
		return NaN;
	}

	// const meanOfArg = mean(arg);
	const square = (n: number) => n * n;

	// return Math.sqrt(
	// 	sum(...arg.map((n) => square(n - meanOfArg))) / (arg.length - 1)
	// );

	// See https://www.mathsisfun.com/data/standard-deviation-formulas.html :

	// 1) Celcualte the mean
	// 2) Array of (pointwise) differences
	// 3) Array of squares of differences
	// 4) Sum of array of squares of differences
	// 5) Average of array of squares of differences
	// 6) Square root of average of array of squares of differences (between each value in the array and the mean of the array)

	const mu = mean(arg);
	const sumOfSquares = sum(...arg.map((n) => square(n - mu)));

	return Math.sqrt(sumOfSquares / arg.length);
}

export function mapToNumStdDeviationsFromMean(a: number[]): number[] {
	const m = mean(a);
	const stdDev = standardDeviation(a);

	if (Number.isNaN(stdDev) || stdDev === 0) {
		return createNaNArray(a.length);
	} else {
		return a.map((value) => (value - m) / stdDev);
	}
}

// Covariance: See https://www.investopedia.com/terms/c/covariance.asp

/*
When an analyst has a set of data, a pair of x and y values, covariance can be calculated using five variables from that data. They are:

    xi = a given x value in the data set
    xm = the mean, or average, of the x values
    yi = the y value in the data set that corresponds with xi
    ym = the mean, or average, of the y values
    n = the number of data points

Given this information, the formula for covariance is:

Covariance(x, y) = SUM [(xi - xm) * (yi - ym)] / (n - 1)
 */

function createCovarianceFunction(
	k: number
): (x: number[], y: number[]) => number {
	return (x: number[], y: number[]): number => {
		if (x.length !== y.length || x.length <= 1) {
			return NaN;
		}

		const meanX = mean(x);
		const meanY = mean(y);

		// Note that if x is a list of numbers, then covariance(x, x) === (standardDeviation(x)) ^ 2

		return (
			sum(
				...pointwise(
					(xi: number, yi: number): number =>
						(xi - meanX) * (yi - meanY),
					x,
					y
				)
			) /
			(x.length - k)
		);
	};
}

// If you are saying "populationCovariance vs. sampleCovariance? WTF???"
// then see https://www.educba.com/covariance-formula/
export const populationCovariance = createCovarianceFunction(0);
export const sampleCovariance = createCovarianceFunction(1);

// R Squared function: Calculates the coefficient of determination
// See e.g. https://www.statisticshowto.com/probability-and-statistics/coefficient-of-determination-r-squared/

export function coefficientOfDetermination(x: number[], y: number[]): number {
	const n = x.length;

	if (n !== y.length || n === 0) {
		return NaN;
	}

	const numerator = n * sum(pointwise(product, x, y)) - sum(x) * sum(y);
	const square = (i: number) => i * i;
	const fn = (z: number[]): number => n * sum(z.map(square)) - square(sum(z));
	const denominatorSquared = fn(x) * fn(y);

	return (numerator * numerator) / denominatorSquared;
}

export function clamp(value: number, minimum: number, maximum: number): number {
	if (value < minimum) {
		return minimum;
	} else if (value > maximum) {
		return maximum;
	} else {
		return value;
	}
}

// Correlation Coefficient: See https://www.investopedia.com/terms/c/correlationcoefficient.asp

// Also known as the Pearson product-moment correlation coefficient

// CorrelationCoefficient(x, y) = covariance(x, y) / (standardDeviation(x) * standardDeviation(y))

function createCorrelationCoefficientFunction(
	k: number
): (x: number[], y: number[]) => number {
	return (x: number[], y: number[]): number => {
		if (x.length !== y.length || x.length <= 1) {
			return NaN;
		}

		// const numerator = covariance(x, y);
		const numerator = createCovarianceFunction(k)(x, y);
		const denominator = standardDeviation(x) * standardDeviation(y);

		if (denominator === 0) {
			return NaN; // numerator ? NaN : 0;
		}

		return clamp(numerator / denominator, -1, 1);
	};
}

export const populationCorrelationCoefficient = createCorrelationCoefficientFunction(
	0
);
export const sampleCorrelationCoefficient = createCorrelationCoefficientFunction(
	1
);

export function getLastElementOfNumericArray(
	array: number[],
	dflt = NaN
): number {
	return ifDefinedThenElse(getLastElementOfArray(array), dflt);
}
