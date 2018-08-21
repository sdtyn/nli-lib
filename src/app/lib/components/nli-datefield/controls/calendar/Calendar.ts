import {  Output, EventEmitter, Input  } from '@angular/core';
import {
  CalendarWeek, 
  CalendarDay } from './';
import { DateFieldOptions } from '../vo/DateFieldOptions';
import { UIComponent } from '../../core/ui.component';

export class Calendar extends UIComponent{
    
	id:String;

	calendarWeeks:Array<CalendarWeek> = [];

	yearList:Array<number> = [];

	centeredYearInYearSelection:number; 

	public selectableYears:Array<any>;

	@Output()
	calendarEventEmitter: EventEmitter<String> = new EventEmitter<String>();

	private _options:DateFieldOptions = new DateFieldOptions().getDefultOptions();
	@Input()
	public get options():DateFieldOptions
	{
		return this._options;
	}
	public set options(dateFieldOptions:DateFieldOptions)
	{
		this._options = dateFieldOptions;
	}			

	private _currentDate:Date;
	public set currentDate(date:Date)
	{
		this._currentDate = date;
	}

	public get currentDate():Date
	{
		return this._currentDate;
	}

	constructor() {
		super();
	}

	init() {
		this.currentDate = this.options.currentDate;
		this.create(this.currentDate);
		this.calendarEventEmitter.emit("changeStateToDays");
	}

	//FUNCTIONALITY /////////////////////////////////////////////  
	/**
	 * change the current year
	 */
	changeCurrentYear(year:number)
	{    
		this.create(new Date(year, this.currentDate.getMonth(), 1)); 
		//this.changeState(this.DAYS);
			this.calendarEventEmitter.emit("changeStateToDays");
	}

	/**
	 * Changethe current month
	 * @param month 
	 */
	changeCurrentMonth(month:number)
	{    
		this.create(new Date(this.currentDate.getFullYear(), month, 1)); 
		//this.changeState(this.DAYS);
			this.calendarEventEmitter.emit("changeStateToDays");
	}

	/**
	 * Select a date
	 * @param calendarDay 
	 */
	changeSelectedDate(calendarDay:CalendarDay)
	{    
		if(calendarDay.isCurrentMonth){
			this.calendarEventEmitter.emit("dateSelected");
			this.calendarEventEmitter.emit("changeStateToDays");  
			this.calendarEventEmitter.emit("close");
		}       
	}

	/**
	 * Change Year list that shown on the year selection
	 * @param year 
	 */
	changeYearLists(year:number, displayedYearCount:number)
	{
		this.createYearLists(year, displayedYearCount);
		this.setSelectableYears(this.currentDate.getFullYear());
	} 

	setSelectableYears(currentYear:number):Array<any>
	{
		this.selectableYears = [];
		for (var index = 0; index < this.yearList.length; index++) {
			this.selectableYears[this.selectableYears.length] = this.yearList[index];
		}
		return this.selectableYears;
	}

	public create(date:Date):void
	{
		if(date){
			this.currentDate = date;
		}else{
			this.currentDate = this.options.currentDate;
		}

		if(this.currentDate){
			var year = this.currentDate.getFullYear();
			var month = this.currentDate.getMonth();
		
			var firstDay = new Date(year, month, 1);
			var lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
	
			this.createCalendarWeeks(firstDay);
	
			for (var index = firstDay.getDate(); index < lastDay.getDate()+1; index++) {
				var currentDate = new Date(year, month, index);
				this.addADayToCalendarWeek(currentDate);			
			}
	
			if(!this.calendarWeeks[0].days[0].day){
				this.addPreviousMonthDays();
			}
	
			if(!this.calendarWeeks[5].days[6].day){
				this.addNextMonthDays();
			}
		}		
	}

	private createCalendarWeeks(firstDay:Date){

		this.calendarWeeks = [];

		var firstWeekInfo:object = this.getWeekNumberOfYearByDate(firstDay)

		var weekCountOfYear:number = firstWeekInfo[1];

		var weekCountOfMonth:number = 0;
		if(firstDay.getDay() == 1){
			weekCountOfMonth = 0;
			if(weekCountOfYear == 1){
				weekCountOfYear = 52;
			}else{
				weekCountOfYear--;
			}
		}else{
			weekCountOfMonth = 1;
		}

		for (var weeksCount = firstWeekInfo[1]; weeksCount < firstWeekInfo[1] + 6; weeksCount++) {			

			var calendarWeek:CalendarWeek = new CalendarWeek();
				calendarWeek.weekOfMonth = weekCountOfMonth;	
				calendarWeek.weekOfYear = weekCountOfYear;
				calendarWeek.days = [];
			
			weekCountOfMonth++;
			if(weekCountOfYear == 52){
				weekCountOfYear = 1;
			}else{
				weekCountOfYear++;
			}

			for (var dayIndex = 0; dayIndex < 7; dayIndex++) {
				var calendarDay:CalendarDay = new CalendarDay();
					calendarDay.dayIndex = dayIndex;
				calendarWeek.days[calendarWeek.days.length] = calendarDay; 		
			}				
				
			this.calendarWeeks[this.calendarWeeks.length] = calendarWeek;
		}
	}

	public getWeekNumberOfYearByDate(currentDate:Date) {
		// Copy date so don't modify original
		var date:Date = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
		// Set to nearest Thursday: current date + 4 - current day number
		// Make Sunday's day number 7
		date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay()||7));
		// Get first day of year
		var yearStart:Date = new Date(Date.UTC(date.getUTCFullYear(),0,1));
		// Calculate full weeks to nearest Thursday
		var weekNo = Math.ceil(( ( (date.getTime() - yearStart.getTime()) / 86400000) + 1)/7);

		if(weekNo > 52){
			weekNo = 1;
		}

		// Return array of year and week number		
		return [date.getUTCFullYear(), weekNo];
	}

	private addADayToCalendarWeek(currentDate:Date){
		
		var weekNumberOfDate:number = this.getWeekNumberOfYearByDate(currentDate)[1];
		for (var index = 0; index < this.calendarWeeks.length; index++) {
			
			var calendarWeek:CalendarWeek = this.calendarWeeks[index];				
			if(calendarWeek.weekOfYear == weekNumberOfDate){

				var dayOfWeek:number = currentDate.getDay();
				if(dayOfWeek == 0){
					dayOfWeek = 6;
				}else{
					dayOfWeek--;
				}
				calendarWeek.days[dayOfWeek].day = currentDate.getDate();
				calendarWeek.days[dayOfWeek].month = currentDate.getMonth();
				calendarWeek.days[dayOfWeek].year = currentDate.getFullYear();
				calendarWeek.days[dayOfWeek].isCurrentMonth = true;
				break;
			}
		}
	}

	addPreviousMonthDays(){
		var month:number = (this.currentDate.getMonth() == 0)?11:this.currentDate.getMonth()-1;
		var lastDay:Date = new Date(this.currentDate.getFullYear(), month+1, 0);
		var dayCount:number = lastDay.getDate();
		for (var index = 1; index > -1; index--) {
			var calendarWeek:CalendarWeek = this.calendarWeeks[index];
			var days:Array<CalendarDay> = calendarWeek.days;

			for (var index2 = days.length-1; index2 > -1; index2--) {
				var calendarDay:CalendarDay = days[index2];
				if(!calendarDay.day){
					calendarDay.day = dayCount;
					calendarDay.month = lastDay.getMonth();
					calendarDay.year = lastDay.getFullYear();
					dayCount--;
				}	
			}
		}
	}

	addNextMonthDays(){
		var dayCount:number = 1;

		var month:number = (this.currentDate.getMonth() == 11)?0:this.currentDate.getMonth()+1;
		var lastDay:Date = new Date(((month == 0)?(this.currentDate.getFullYear()+1):this.currentDate.getFullYear()), month+1, 0);


		for (var index = 4; index < this.calendarWeeks.length; index++) {
			var calendarWeek:CalendarWeek = this.calendarWeeks[index];
			var days:Array<CalendarDay> = calendarWeek.days;
			for (var key in days) {
				if (days.hasOwnProperty(key)) {
					var calendarDay:CalendarDay = days[key];
					if(!calendarDay.day){
						calendarDay.day = dayCount;
						calendarDay.month = lastDay.getMonth();
						calendarDay.year = lastDay.getFullYear();
						dayCount++;
					}					
				}
			}
		}
	}

	createYearLists(year:number, displayedYearCount:number)
	{		
		this.centeredYearInYearSelection = year;

	 	this.yearList = [];
 
	   for (var index = (displayedYearCount-1)/2; index > 0; index--) {
		 this.yearList[this.yearList.length] = year - index;        
	   }
 
	   this.yearList[this.yearList.length] = year;
 
	   for (var index = 1; index < ((displayedYearCount-1)/2) + 1; index++) {        
		 this.yearList[this.yearList.length] = year + index;
	   }
	}

}
