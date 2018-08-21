import { Input } from "@angular/core";
import { DateRange } from "./DateRange";

export class DateFieldOptions
{
	public currentDate:Date;
    public selectableRange:DateRange;
    public filterMode:Boolean; 
    public selectedRange:DateRange;
    public locale:String;
	public labels:Array<any>;
	public required:Boolean;
	public readOnly:Boolean;

	constructor(){
		this.setDefultOptions();
	}	

	private setDefultOptions():DateFieldOptions
	{
		this.currentDate = new Date();
		this.selectableRange = new DateRange(null, null);
		this.filterMode = false; 
		this.selectedRange = new DateRange(null, null);
		this.locale = "en-US";
		this.labels = [];
		this.required = false;
		this.readOnly = false;
		return this;
	}
	
	public getDefultOptions():DateFieldOptions
	{			
		return this.setDefultOptions();
	}

	public setOptions(filterMode:Boolean, currentDate:Date, selectableRange:DateRange, selectedRange:DateRange, 
					  locale:String, labels:Array<any>, required:Boolean, readOnly:Boolean):DateFieldOptions{
		this.filterMode = filterMode;
		this.currentDate = currentDate;
		this.selectableRange = (selectableRange)?selectableRange:new DateRange(null, null);
		this.selectedRange = (selectedRange)?selectedRange:new DateRange(null, null);
		this.locale = (locale)?locale:"en-US";
		this.labels = (labels)?labels:[];
		this.required = (required)?required:false;
		this.readOnly = (readOnly)?readOnly:false;
		return this;
	}

	public addLabels(labels:Array<any>):DateFieldOptions{
		this.labels = labels;
		return this;
	}
}
