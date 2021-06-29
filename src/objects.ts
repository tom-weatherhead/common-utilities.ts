// github:tom-weatherhead/common-utilities.ts/src/objects.ts

// error TS2538: Type 'symbol' cannot be used as an index type.
// export type ObjectKeyType = number | string | symbol;
export type ObjectKeyType = number | string;
export type ObjectType<T> = Record<ObjectKeyType, T>;
export type DefaultObjectType = ObjectType<unknown>;

export function clone<T>(arg: T): T {
	// For an in-depth discussion of object copying, see https://scotch.io/bar-talk/copying-objects-in-javascript

	// **** Warning: JSON.parse(JSON.stringify(arg)) will fail for circular objects.
	// ? Do we need isCircular(obj) ?
	return JSON.parse(JSON.stringify(arg));

	// From avoidwork/haro/src/utility.js :
	// return JSON.parse(JSON.stringify(arg, null, 0)); // TODO: What are the second and third parameters to stringify() ?
}

export function copySpecifiedObjectProperties<T>(
	propertyList: string[],
	src: ObjectType<T>,
	dst: ObjectType<T> = {}
): ObjectType<T> {
	for (const property of propertyList.filter(
		(p: string) => typeof src[p] !== 'undefined'
	)) {
		// .for Each((property) => {
		dst[property] = src[property];
		// });
	}

	return dst;
}

export function combineObjects<T>(...objects: ObjectType<T>[]): ObjectType<T> {
	const combinedObject: ObjectType<T> = {};

	// objects.for Each((object) => {
	for (const object of objects) {
		// Object.keys(object).for Each((key) => {
		for (const key of Object.keys(object)) {
			combinedObject[key] = object[key];
		}
		// });
	} // );

	return combinedObject;
}

export function getOwnProperties(obj: DefaultObjectType = {}): ObjectKeyType[] {
	/*
	// Version 1
	// See https://stackoverflow.com/questions/208016/how-to-list-the-properties-of-a-javascript-object
	let result = [];

	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			result.push(key);
		}
	}

	return result;
	*/

	// Version 2
	// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
	return Object.getOwnPropertyNames(obj);
}

// E.g. getProperty(obj, 'subObj1.subObj2.arrayMember.length', 'Toast');

export function getProperty<T>(
	obj: DefaultObjectType,
	propertyPath: string,
	defaultValue: T
): T {
	const arrayOfProperties = propertyPath.split('.');
	let result: unknown = obj;

	for (const property of arrayOfProperties) {
		const tempObj = result as DefaultObjectType;

		// if (!isDefined(obj)) {
		if (typeof tempObj === 'undefined') {
			return defaultValue;
		}

		result = tempObj[property];
	}

	const castedResult = result as T;

	if (typeof castedResult === 'undefined') {
		return defaultValue;
	}

	return castedResult;
}

export function deleteUndefinedValuesFromObject<T>(
	obj: ObjectType<T>
): ObjectType<T> {
	const keysToDelete = Object.keys(obj).filter(
		(key) => typeof obj[key] === 'undefined'
	);

	// keysToDelete.for Each((key) => {
	for (const key of keysToDelete) {
		delete obj[key];
	}
	// });

	return obj;
}

// export function followPropertyNamePath(obj: any = {}, propertyNames: string[] = [], defaultValue: any): any {

// 	for (var i = 0; i < propertyNames.length; i++) {

// 		if (!isObject(obj)) {
// 			return defaultValue;
// 		}

// 		obj = obj[propertyNames[i]];
// 	}

// 	if (!isDefined(obj)) {
// 		return defaultValue;
// 	}

// 	return obj;
// }

// export function overwriteSomeProperties (obj1, obj2) {
// 	let result = clone(obj1);
// 	const obj2OwnProperties = getOwnProperties(obj2);

// 	obj2OwnProperties.for Each(prop => {
// 		// TODO: Do nothing here if obj2[prop] is undefined.

// 		if (!isAggregateEntity(obj2[prop])) {
// 			// If result and obj2 are both arrays, do not allow result to be shortened.

// 			if (prop !== 'length' || !isNumber(result.length) || !isNumber(obj2.length) || result.length < obj2.length) {
// 				result[prop] = obj2[prop];
// 			}
// 		} else if (!areTypesEqual(result[prop], obj2[prop])) {
// 			result[prop] = clone(obj2[prop]);
// 		} else {
// 			result[prop] = overwriteSomeProperties(result[prop], obj2[prop]);
// 		}
// 	});

// 	return result;
// }

// export function overwriteSomePropertiesAlt1 (obj1, obj2) {
// 	return getOwnProperties(obj2).reduce(
// 		(accumulator, element) => { // element is the name of a property in obj2
// 			// TODO: Do nothing here if obj2[prop] is undefined.

// 			if (!isAggregateEntity(obj2[element])) {
// 				// If accumulator and obj2 are both arrays, do not allow accumulator to be shortened.

// 				if (element !== 'length' || !isNumber(accumulator.length) || !isNumber(obj2.length) || result.length < obj2.length) {
// 					accumulator[element] = obj2[element];
// 				}
// 			} else if (!areTypesEqual(accumulator[element], obj2[element])) {
// 				accumulator[element] = clone(obj2[element]);
// 			} else {
// 				accumulator[element] = overwriteSomeProperties(accumulator[element], obj2[element]);
// 			}

// 			return accumulator;
// 		},
// 		clone(obj1)
// 	);
// }

// export function containsCircularReference (obj, objsSeen = []) {

// 	if (objsSeen.find(o => o === obj)) {
// 		return true;
// 	}

// 	objsSeen.push(obj);

// 	const result = Object.values(obj).some(subobj => containsCircularReference(subobj, objsSeen));

// 	objsSeen.pop();

// 	return result;
// }
