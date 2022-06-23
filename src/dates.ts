// github:tom-weatherhead/common-utilities.ts/src/dates.ts

import { zeroPadNumber } from './numbers';

/**
 * @method getDateString
 * @param  {Date}   	date		A date
 * @return {string}					A string representation of the date (local, not UT)
 */
export function getDateString(date: Date): string {
	// if (!date || !isDate(date)) {
	// 	date = new Date();
	// }

	return `${date.getFullYear()}-${zeroPadNumber(date.getMonth() + 1, 2)}-${zeroPadNumber(
		date.getDate(),
		2
	)}`;
}

export function getDateTimeString(date: Date): string {
	// See https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
	// ('000' + num).slice(-4)

	return `${getDateString(date)} ${zeroPadNumber(date.getHours(), 2)}:${zeroPadNumber(
		date.getMinutes(),
		2
	)}:${zeroPadNumber(date.getSeconds(), 2)}`;

	/*
	// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString .
	// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat .

	// ! The fails under Node.js ; see https://github.com/nodejs/node/issues/8500
	// mscdex: "By default --with-intl=small-icu is used to build node, which contains just the en-US locale
	// (@nodejs/intl -- is this correct or does it contain more?). You will need to either build node
	// with --with-intl=full-icu or --with-intl=system-icu if you want to be able to use more locales.
	// The reason node is built with a smaller ICU by default is file size.

	return date
		.toLocaleTimeString(
			'en-CA',
			{
				timeZone: 'UTC',
				hour12: false,
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			}
		)
		.replace(',', '');
	*/
}

export function getDateUTCString(date: Date): string {
	return `${date.getUTCFullYear()}-${zeroPadNumber(
		date.getUTCMonth() + 1,
		2
	)}-${zeroPadNumber(date.getUTCDate(), 2)}`;
}

export function getDateTimeUTCString(date?: Date): string {
	if (typeof date === 'undefined') {
		date = new Date();
	}

	return `${getDateUTCString(date)} ${zeroPadNumber(date.getUTCHours(), 2)}:${zeroPadNumber(
		date.getUTCMinutes(),
		2
	)}:${zeroPadNumber(date.getUTCSeconds(), 2)}`;
}

// export function getDifferenceBetweenDatesAsObject (dateEarlier, dateLater) {
// 	const dateValueDifference = dateLater.valueOf() - dateEarlier.valueOf();
// 	let seconds = Math.floor(dateValueDifference / 1000);
// 	const hours = Math.floor(seconds / 3600);

// 	seconds -= hours * 3600;

// 	const minutes = Math.floor(seconds / 60);

// 	seconds -= minutes * 60;

// 	return {
// 		hours: hours,
// 		minutes: minutes,
// 		seconds: seconds
// 	};
// }

// export function getDifferenceBetweenDatesAsString (dateEarlier, dateLater) {
// 	const diff = getDifferenceBetweenDatesAsObject(dateEarlier, dateLater);

// 	return `${zeroPadNumber(diff.hours, 2)}h ${zeroPadNumber(diff.minutes, 2)}m ${zeroPadNumber(diff.seconds, 2)}s`;
// }

function pluralize(n: number, unit: string): string {
	return `${n} ${unit}${n === 1 ? '' : 's'}`;
}

// export function getIntervalStringFromMillisecondsV1(milliseconds: number): string {
// 	let seconds = Math.floor(milliseconds / 1000);

// 	milliseconds -= seconds * 1000;

// 	let minutes = Math.floor(seconds / 60);

// 	seconds -= minutes * 60;

// 	let hours = Math.floor(minutes / 60);

// 	minutes -= hours * 60;

// 	const days = Math.floor(hours / 24);

// 	hours -= days * 24;

// 	return `${pluralize(days, 'day')}, ${pluralize(hours, 'hour')}, ${pluralize(minutes, 'minute')}, ${pluralize(seconds, 'second')}, and ${pluralize(milliseconds, 'millisecond')}`;
// }

// export function getIntervalStringFromMillisecondsV2(milliseconds: number): string {
export function getIntervalStringFromMilliseconds(milliseconds: number): string {
	const resultArray: string[] = [];
	let seconds = Math.floor(milliseconds / 1000);

	milliseconds -= seconds * 1000;
	resultArray.unshift(pluralize(milliseconds, 'millisecond'));

	if (seconds > 0) {
		let minutes = Math.floor(seconds / 60);

		seconds -= minutes * 60;
		resultArray.unshift(pluralize(seconds, 'second'));

		if (minutes > 0) {
			let hours = Math.floor(minutes / 60);

			minutes -= hours * 60;
			resultArray.unshift(pluralize(minutes, 'minute'));

			if (hours > 0) {
				const days = Math.floor(hours / 24);

				hours -= days * 24;
				resultArray.unshift(pluralize(hours, 'hour'));

				if (days > 0) {
					resultArray.unshift(pluralize(days, 'day'));
				}
			}
		}
	}

	switch (resultArray.length) {
		case 1:
			return resultArray[0];

		case 2:
			return `${resultArray[0]} and ${resultArray[1]}`;

		default:
			// This will ensure the presence of an Oxford comma.
			resultArray[resultArray.length - 1] = `and ${resultArray[resultArray.length - 1]}`;

			return resultArray.join(', ');
	}
}

/*
    isObjectAValidDate(obj: any): boolean {
        return Object.prototype.toString.call(obj) === '[object Date]' && !this.isNaN(obj.valueOf());
    }

    //compareDates(date1: Date, date2: Date, comparator: BooleanComparator<number>): boolean {

    //    if (date1 === undefined && date2 === undefined) {
    //        return true;
    //    } else if (date1 === undefined || date2 === undefined) {
    //        return false;
    //    }

    //    const valueOfDate1: number = date1.valueOf();
    //    const valueOfDate2: number = date2.valueOf();
    //    const date1IsNaN: boolean = this.isNaN(valueOfDate1);
    //    const date2IsNaN: boolean = this.isNaN(valueOfDate2);

    //    if (date1IsNaN && date2IsNaN) {
    //        return true;
    //    } else if (date1IsNaN || date2IsNaN) {
    //        return false;
    //    }

    //    return comparator(valueOfDate1, valueOfDate2);
    //}

    //datesAreEqual(date1: Date, date2: Date): boolean {
    //    return this.compareDates(date1, date2, (valueOfDate1, valueOfDate2) => valueOfDate1 === valueOfDate2);
    //}

    datesAreEqual(date1: Date, date2: Date): boolean {

        if (date1 === undefined && date2 === undefined) {
            return true;
        } else if (date1 === undefined || date2 === undefined) {
            return false;
        }

        const valueOfDate1: number = date1.valueOf();
        const valueOfDate2: number = date2.valueOf();
        const date1IsNaN: boolean = this.isNaN(valueOfDate1);
        const date2IsNaN: boolean = this.isNaN(valueOfDate2);

        if (date1IsNaN && date2IsNaN) {
            return true;
        } else if (date1IsNaN || date2IsNaN) {
            return false;
        }

        //return this.compareDates(date1, date2, (valueOfDate1, valueOfDate2) => valueOfDate1 === valueOfDate2);
        return valueOfDate1 === valueOfDate2;
    }

    //dateIsGreaterThanDate(date1: Date, date2: Date): boolean {
    //    return this.compareDates(date1, date2, (valueOfDate1, valueOfDate2) => valueOfDate1 > valueOfDate2);
    //}

    dateIsGreaterThanDate(date1: Date, date2: Date): boolean {

        if (date1 === undefined || date2 === undefined) {
            return undefined;
        }

        const valueOfDate1: number = date1.valueOf();
        const valueOfDate2: number = date2.valueOf();
        const date1IsNaN: boolean = this.isNaN(valueOfDate1);
        const date2IsNaN: boolean = this.isNaN(valueOfDate2);

        if (date1IsNaN || date2IsNaN) {
            return undefined;
        }

        //return this.compareDates(date1, date2, (valueOfDate1, valueOfDate2) => valueOfDate1 > valueOfDate2);
        return valueOfDate1 > valueOfDate2;
    }

    formatDateAsStringForDatabase(date: Date): string {
        //const dateFormatLocale = 'en-US';
        const dateFormatLocale = 'en';
        // Should hour be '2-digit' instead of 'numeric' ?
        const dateFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit' };

        return date
            .toLocaleDateString(dateFormatLocale, dateFormatOptions)
            .replace(/,/, '');
    }

    stringToDate(str: string): Date {
        return new Date(str);
    }

    dateToString(date: Date): string {
        return this.formatDateAsStringForDatabase(date);
    }

    ensureDate(date: Date | string): Date {

        if (date === undefined) {
            return undefined;
        }

        let result: Date;

        if (typeof date === 'string') {
            result = new Date(date as string);
        } else {
            //result = date as Date;
            result = new Date(date as Date);
        }

        if (!this.isObjectAValidDate(result)) {
            return undefined;
        }

        return result;
    }

    //roundDateToNearestHour(dateIn: Date): Date {

    //    if (!this.isObjectAValidDate(dateIn)) {
    //        return undefined;
    //    }

    //    const hourAdjustment: number = dateIn.getMinutes() >= 30 ? 1 : 0;
    //    const result: Date = new Date(dateIn.getFullYear(), dateIn.getMonth(), dateIn.getDate(), dateIn.getHours() + hourAdjustment);

    //    //console.log('roundDateToNearestHour() : Rounded', dateIn, 'to', result);

    //    return result;
    //}

    //test_roundDateToNearestHour() {
    //    // Note: The month parameter is zero-based; valid values are [0, 1, ..., 11].
    //    this.roundDateToNearestHour(new Date(2018, 1, 28, 23, 59));
    //    this.roundDateToNearestHour(new Date(2018, 2, 29, 13, 29, 59));
    //    this.roundDateToNearestHour(new Date(2018, 2, 29, 13, 30));
    //    this.roundDateToNearestHour(new Date(2018, 2, 29, 13, 30, 1));
    //    this.roundDateToNearestHour(new Date(2018, 2, 29, 13, 31));
    //    this.roundDateToNearestHour(new Date(2018, 2, 31, 23, 59));
    //}

    calculateDateAdjustmentForTimeChange(startDateParameter: Date, endDateParameter: Date, wholeDaysFlag: boolean): number {
        const startDate: Date = this.ensureDate(startDateParameter);
        const endDate: Date = this.ensureDate(endDateParameter);

        if (wholeDaysFlag || startDate === undefined || endDate === undefined ) {
            return 0;
        }

        return endDate.getTimezoneOffset() - startDate.getTimezoneOffset();
    }

    addNumberOfDaysToDate_TimeChangeAware(oldDate: Date, numberOfDaysToAdd: number, wholeDaysFlag: boolean): Date {

        if (this.isNaN(numberOfDaysToAdd)) {
            console.error('addNumberOfDaysToDate() : numberOfDaysToAdd is not a number.');
            return undefined;
        }

        // From https://stackoverflow.com/questions/563406/add-days-to-javascript-date :
        var newDate = new Date(oldDate.valueOf());

        newDate.setDate(newDate.getDate() + numberOfDaysToAdd);

        newDate.setMinutes(newDate.getMinutes() - this.calculateDateAdjustmentForTimeChange(oldDate, newDate, wholeDaysFlag));

        return newDate;
    }

    // Calculate the number of days between two dates:
    // BEGIN : From Michael Liu's answer at https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
    // This solution accommodates transitions to or from Daylight Saving Time during the interval between the two dates.

    treatAsUTC_MLiu(date: Date): Date {
        let result: Date = this.ensureDate(date);

        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());

        return result;
    }

    daysBetween_MLiu(startDate: Date, endDate: Date): number {
        const millisecondsPerDay = 24 * 60 * 60 * 1000;

        return (this.treatAsUTC_MLiu(endDate).valueOf() - this.treatAsUTC_MLiu(startDate).valueOf()) / millisecondsPerDay;
    }

    daysBetween_MLiu_TimeChangeAware(startDate: Date, endDate: Date, wholeDaysFlag: boolean): number {
        let adjustedEndDate: Date = this.ensureDate(endDate);

        adjustedEndDate.setMinutes(adjustedEndDate.getMinutes() + this.calculateDateAdjustmentForTimeChange(startDate, endDate, wholeDaysFlag));

        return this.daysBetween_MLiu(startDate, adjustedEndDate);
    }

    // END : From Michael Liu's answer at https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
 */
