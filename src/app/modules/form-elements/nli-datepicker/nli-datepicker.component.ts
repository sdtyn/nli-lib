import { Component } from '@angular/core';

@Component({
  selector: 'nli-datepicker',
  templateUrl: './nli-datepicker.component.html',
  styleUrls: ['./nli-datepicker.component.scss']
})
export class NLIDatepicker {
  title = 'datepicker';

  public options:any = {
    currentDate:{year:new Date().getFullYear(), month:new Date().getMonth(), day:new Date().getDate()},
    displayTime:false,
    displayTimeWithSeconds:false
  };
}