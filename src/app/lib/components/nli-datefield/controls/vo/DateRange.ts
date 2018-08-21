import { Input } from "@angular/core";
import { DateUtils } from "../utils";

export class DateRange
{
	start:Date;
	end:Date;

    public static WHOLE_TIME_SPAN:String = 'WHOLE_TIME_SPAN';//Gesampter Zeitraum;
    public static TODAY:String = 'TODAY';//'Heute';
    public static YESTERDAY:String = 'YESTERDAY';//'Gestern';
    public static LAST_SEVEN_DAYS:String = 'LAST_SEVEN_DAYS';//'Letzte 7 Tage';
    public static LAST_THIRTY_DAYS:String = 'LAST_THIRTY_DAYS';//'Letzte 30 Tage';
    public static INDIVIDUALLY:String = 'INDIVIDUALLY';//'Individuell';

	constructor(start:Date, end:Date){
		this.start = start;
		this.end = end;
		this.timeSpan = DateRange.WHOLE_TIME_SPAN;	
	}

	@Input()
	public get timeSpan():String
	{
		return this._timeSpan;
	}

  	private _timeSpan:String = DateRange.WHOLE_TIME_SPAN;
	public set timeSpan(date:String)
	{
		this._timeSpan = date;
	}
}
