import { NativeDateAdapter } from '@angular/material';

import { DateFormatter } from '../formatter/index';

export class ExtendedDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        if (displayFormat == "input") {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            if(DateFormatter.getFormat() == "DD.MM.YYYY"){
                return this._to2digit(day) + '.' + this._to2digit(month) + '.' + year;
            }else if(DateFormatter.getFormat() == "DD-MM-YYYY"){
                return this._to2digit(day) + '-' + this._to2digit(month) + '-' + year;
            }else if(DateFormatter.getFormat() == "DD/MM/YYYY"){
                return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
            }else{
                return this._to2digit(day) + '.' + this._to2digit(month) + '.' + year;
            }
            
        } else {
            return date.toDateString();
        }
    }

    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    } 
};