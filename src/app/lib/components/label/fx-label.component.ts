//Imports
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

//Component Decorator
@Component({
	selector: 'fx-label',
	templateUrl: './fx-label.component.html',
	styleUrls: ['./fx-label.component.css']
})
//Component Class
export class FxLabel{
    @Input()
	public text:string;
    @Input()
	public styleName:string;
}