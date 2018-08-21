import { AbstractControl, ValidatorFn } from '@angular/forms';
import { DateUtils } from '../controls';
import { NLIDatefield } from '../component/nli-datefield';

export function DateValidator(dateField:NLIDatefield): ValidatorFn {       
    return (control: AbstractControl): {[key: string]: any} | null => {
        var dateFromString:Date = DateUtils.getDateFromString(dateField.inputValue);
        if (DateUtils.isDate(dateFromString) && !dateField.proofIfTheDateIsInSelectableRange(dateFromString)){
            return {error:true, errorString:dateField.lang.get(DateUtils.ERROR_DATE_IS_NOT_SELECTABLE_RANGE)};

        }else if(dateField.options.required && !DateUtils.isDate(dateFromString) && dateField.inputValue != ""){
            return {error:true, errorString:dateField.lang.get(DateUtils.ERROR_DATE_IS_NOT_VALID)};
        }else if (dateField.options.required && dateField.inputValue == ""){            
            return {error:true, errorString:dateField.lang.get(DateUtils.ERROR_VALUE_NOT_DEFINED)};
        }
    };
}