// See e.g. https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c

// import {
// 	fnAddition
// } from './numbers.ts';

import * as arrays from './arrays';
import * as functors from './functors';
import * as numbers from './numbers';

export const findSuperlativeElement = arrays.findSuperlativeElement;
export const max = arrays.max;
export const min = arrays.min;

export interface IFunctor<T> extends functors.IFunctor<T> {}

export class UniversalFunctor<T> extends functors.UniversalFunctor<T> {}

export const fnAddition = numbers.fnAddition;
