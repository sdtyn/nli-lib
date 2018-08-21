import { Component } from '@angular/core';
import { DateFieldOptions } from '../../../lib/components/nli-datefield/controls/vo/DateFieldOptions';
import { DateRange } from '../../../lib/components/nli-datefield/controls/vo/DateRange';
import { DateUtils } from '../../../lib/components/nli-datefield/controls/utils/DateUtils';
@Component({
  selector: 'nli-datepicker',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss']
})
export class NLIDatepicker {
  title = 'datepicker';

  public optionsDefault:DateFieldOptions;

  public optionsWithSelectableRange:DateFieldOptions;

  public optionsWithSelectableRangeForBirthday:DateFieldOptions;

  public optionsWithoutSeletableRangeForFiltered:DateFieldOptions;

  public optionsWithSeletableRangeForFiltered:DateFieldOptions;

  public tomorrow:Date = new Date(new Date().getTime() + 24*60*60*1000);

  constructor(){
    this.optionsDefault = new DateFieldOptions().setOptions(false, new Date(), new DateRange(null, null), null, "de-DE", null, true, false);
    this.optionsWithSelectableRange               = new DateFieldOptions().setOptions(false, new Date(2017, 5, 5), new DateRange(new Date(2018, 8, 6), new Date(2018, 8, 16)), null, "de-DE", null, true, true);
    
    var labels:Array<any> = [{key:DateUtils.ERROR_DATE_IS_NOT_SELECTABLE_RANGE, label:"Das Mindestalter für einen Vertragsabschluss ist 18 Jahre."}];

    this.optionsWithSelectableRangeForBirthday    = new DateFieldOptions().setOptions(false, new Date(2000, 1, 1), new DateRange(null, new Date(1999, 11, 31)), null, "de-DE", labels, false, false);
    this.optionsWithoutSeletableRangeForFiltered  = new DateFieldOptions().setOptions(true, new Date(), null, null, "en-US", null, false, false);
    this.optionsWithSeletableRangeForFiltered     = new DateFieldOptions().setOptions(true, new Date(), new DateRange(new Date(2018, 7, 6, 0, 0, 0), new Date(2018, 7, 16, 23, 59, 59)), null, "de-DE", null, false, false);
  }

  onChange(event):void{
    console.log(event);
  }

}