//Imports
import { Component, QueryList, Input, Output, EventEmitter, OnInit } from '@angular/core';


import { Field } from '../../core/form/field.component';

import { FxLabel } from '../label/fx-label.component';

//Component Decorator
@Component({
	selector: 'fx-field',
	templateUrl: './fx-field.component.html',
	styleUrls: ['./fx-field.component.css']
})
//Component Class
export class FxField extends Field {
    @Input()
	public title:string = 'ui component';

	_labels: QueryList<FxLabel>;
    
	@Input()
	public name = 'UIComponent';
    
	@Input()
	public id = '-1'
}