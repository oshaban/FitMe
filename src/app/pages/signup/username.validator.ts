/**
 * Validator to check if a username is already taken
 *  Sends request to back-end to get all usernames
 */

import { FormControl } from '@angular/forms';

export class UsernameValidator {
    static validUsername(fc: FormControl) {
        if (fc.value.toLowerCase() === 'testing') {
            return({validUsername: true});
        } else {
            return (null);
        }
    }
}
