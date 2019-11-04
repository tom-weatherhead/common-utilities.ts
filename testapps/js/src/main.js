"use strict";

const engine = require('thaw-common-utilities.ts');

const x = 2;
const y = 3;

console.log(`JavaScript app test: ${x} plus ${y} equals ${engine.fnAddition(x, y)}.`);
