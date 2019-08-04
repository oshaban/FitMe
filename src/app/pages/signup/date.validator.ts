/**
 * Validator to check that a user doesn't select a date after today
 */

import { FormControl } from '@angular/forms';

/**
 * Stores todays date
 */
const curDate = new Date();

export class DateValidator {
    static validDate(fc: FormControl) {
        if (fc.value > curDate) {
            return({validDate: true});
        } else {
            return (null);
        }
    }
}
