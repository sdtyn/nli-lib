//Imports
import { Component, QueryList, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';

import { FxLabel } from '../label/fx-label.component';

//Component Decorator
@Component({
	selector: 'fx-dropdown',
	templateUrl: './fx-dropdown.component.html',
	styleUrls: ['./fx-dropdown.component.css']
})
//Component Class
export class FxDropDown{

	id:String;

	@ViewChild('fxDropDown')
	private fxDropDown;
  
	@ViewChild('input')
	private input;

	public dropDown;

	public visibility:boolean = false;
	
	ngAfterViewInit() {
		this.dropDown = this.fxDropDown;
	}


	@Input()
	public  value:any;

	constructor(){    
		
	  }

  /**
	  * When the user clicks on the button, 
		* toggle between hiding and showing the dropdown content 
		* 
		*/
	openDropDown(event){    
			this.open();
	}
	 
	closeDropDown(event){
		//var parent = this.getParentDropDown(event.target);
		//if(!parent){
			this.close();
		//}
	}

	open(){     
		if(!this.visibility){
			this.visibility = true;
			document.addEventListener('click', this.windowOnClick.bind(this));
		}
	}
	 
	close(){
		if(this.visibility){
			this.visibility = false;
			document.removeEventListener('click', this.windowOnClick.bind(this));
		}
	}
	 
	 
	public isOpen():boolean
	{
		return this.visibility;
	}

  windowOnClick(event):any
  {
		var element = event.target;
		var parent = this.getParentDropDown(element);
		if(element && element.id == "fx-dropdown-opener-button" && parent.id == this){
			return;
		}

		if(this.isParentOfElementDropDown(element) && !this.isParentOfElementADate(element)){
			if(!this.isOpen()){
				this.openDropDown(event);
			//this.fxCalendar.refresh();
			}
		}else{
			this.closeDropDown(event);
		}

   }
 
 getParentDropDown(element):any
   {
	 var searching:boolean = true;
	 while(searching) { 
	   if(element &&
		 (element.localName == "fx-dropdown")
	   ){
		 searching = false;
	   }else if(element.parentElement){
		 element = element.parentElement;
	   }else{
		 searching = false;
	   }
	} 
	return element;
   }
	 
   isParentOfElementDropDown(element):any
   {
	 var searching:boolean = true;
	 var found:boolean = false;
	 while(searching) { 
	   if(element &&
		 (element.localName == "fx-dropdown" 
		 || element.id == "fx-dropdown-content" 
		 || element.id == "fx-calendar-years-main"
		 || element.id == "fx-calendar-months-main" 
		 || element.id == "fx-calendar-dates-main" 
		 || element.id == "fx-calendar-time-main"		 
		)){
		 searching = false;
		 found = true;
	   }else if(element.parentElement){
		 element = element.parentElement;
	   }else{
		 searching = false;
	   }
	} 
	return found;
   }
 
   isParentOfElementADate(element):any
   {
	 if(element &&
	   element.className &&
	   element.className == "calendar-date-cell"){
		 return true;
	 }
 
	 return false;
   }
    
}