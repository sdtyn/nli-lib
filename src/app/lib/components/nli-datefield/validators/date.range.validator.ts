import { AbstractControl, ValidatorFn } from '@angular/forms';
import { DateRange } from '../controls/vo/DateRange';
import { DateUtils } from '../controls';
import { NLIDatefield } from '../component/nli-datefield';

export function DateRangeValidator(dateField:NLIDatefield): ValidatorFn {       
    return (control: AbstractControl): {[key: string]: any} | null => {
        if (dateField.options.selectableRange && (dateField.options.selectableRange.start || dateField.options.selectableRange.end)){
            return {error:true, errorString:dateField.lang.get(DateUtils.ERROR_RANGE_CAN_NOT_USED_IN_FILTER_MODE)};
        }

        return null;
    };
}