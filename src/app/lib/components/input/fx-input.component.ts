import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

import {InputEvent, Event} from '../../core/event/index';

@Component({
  selector: 'fx-input',
  templateUrl: './fx-input.component.html',
  styleUrls: [ './fx-input.component.css' ]
})
export class FxInput {

  @Input()
  mdDatepicker;

  @Input()
  matDatepicker;

  @Input()
  mdDatepickerFilter;

  @Input()
  matDatepickerFilter;

  //The value of the input.
  @Input()
  value;

  //The required of the input.
  @Input()
  required;
  
  //The minimum valid date.
  @Input()
  min;
  
  //The maximum valid date.
  @Input()
  max;
  
  //Whether the datepicker-input is disabled.
  @Input()
  disabled;

  @Output('focusOut')
  focusOut:InputEvent = new InputEvent(Event.FOCUS_OUT);

  @Input()
  label;
  
  focusHandler(){
    this.focusOut.emit('test value');
  }  
}
