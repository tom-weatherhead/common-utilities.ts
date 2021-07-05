// github:tom-weatherhead/common-utilities.ts/src/regexes.ts

export const regexInteger = /^(0|-?[1-9][0-9]*)$/;

// TODO: Allow 0.5 and 1.0 and 0.0, but not 00.5 or 01.0 or 0.50 or -0.0
// Note: We never allow a plus sign to be part of the number.
// Case 1: 0.0 : Zero. No minus sign is allowed.
// Case 2: -?(0|[1-9][0-9]*)\.[0-9]*[1-9] : The number can start with a zero, but it cannot end with a zero.
// Case 3: -?[1-9][0-9]*\.[0-9]+ : The number cannot start with a zero, but it can end with a zero.
// export const regexFloatingPointNumber = /^-?(0|[1-9][0-9]*)\.[0-9]+$/;
export const regexFloatingPointNumber = /^((0\.0)|(-?(0|[1-9][0-9]*)\.[0-9]*[1-9])|(-?[1-9][0-9]*\.[0-9]+))$/;
