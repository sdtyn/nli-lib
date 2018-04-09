import { Component, forwardRef, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { DateFormatter, Calendar, TimeControl, DateUtils } from '../../core';
import { LibModule as NliInputModule} from '@next-level-integration/nli-input-lib';
import { CalendarDay } from '../../core/controls/calendar/CalendarDay';
import { CalendarWeek } from '../../core/controls/calendar/CalendarWeek';

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NLIDatefield),
  multi: true
};

@Component({
  selector: 'nli-datefield',
  templateUrl: './nli-datefield.component.html',
  styleUrls: [ './nli-datefield.component.css' ],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class NLIDatefield extends Calendar implements AfterViewInit, ControlValueAccessor{
  
  @ViewChild('input') 
  private input;

  @ViewChild('datePicker') 
  private datePicker:ElementRef;

	public visibility:boolean = false;
	  
  @Input()
  public get configs():Date
  {
    return this.options;
  }

  public set configs(value:Date)
  {
    this.options = value;
  }


  locale:string = "de_DE";
    
  MONTHS:string = 'month';
  YEARS:string = 'year';
  DAYS:string = "days";
  TIME:string = "time";

  state:string = this.DAYS;

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onSelectedDateChange: (_: any) => void = noop;

  private _today:Date;
  @Input()
  public get today():Date
  {
    return this._today;
  }

  public set today(value:Date)
  {
    this._today = value;
  }

  private _label:String;
  @Input()
  public get label():String
  {
    return this._label;
  }

  public set label(value:String)
  {
    this._label = value;
  }

  public _inputValue:any;
	@Input()
  public get inputValue():String
  {
    if(this.selectedDate){
      //return DateFormatter.getFormattedDateWithDayName(this.selectedDate);
      var format:String;
      /* if(this.displayTime && !this.options.displayTimeWithSeconds){
        format = "DD.MM.YYYY HH:MM";
      }else if(this.displayTime && this.options.displayTimeWithSeconds){
        format = "DD.MM.YYYY HH:MM:SS";
      } */
      this.inputValue = DateFormatter.getFormattedDate(this.selectedDate, format);
    }else{
      this.inputValue = '';
    }
    return this._inputValue;
  }

  public set inputValue(value:String)
  {
    this._inputValue = value;
  }

  public getLocale()
  {
    return this.locale;
  }
  
  constructor(){
    super();
  }

  
  ngAfterViewInit(){
    this.init();
    this.displayTime = this.options.displayTime;
    this.today = (!this.today)?new Date():this.today;
  }

  private _range:boolean = false;
  @Input()
  public get range():boolean
  {
    return this._range;
  }

  public set range(value:boolean)
  {
    this._range = value;
    if(this.range == true){

    }
  }

  private _selectedDate:Date;
	public set selectedDate(date:Date)
	{
    if (date !== this.selectedDate) {
      this._selectedDate = date;
      this.onSelectedDateChange(date);
    }

		this._selectedDate = date;
  }
  
  @Input()
	public get selectedDate():Date
	{
		return this._selectedDate;
	}
  
  private _displayTime:boolean = false;
	public get displayTime():boolean
	{
	  return this._displayTime;
	}
	
	public set displayTime(value:boolean)
	{
	  this._displayTime = value;
	}

  //VIEW EVENT HANDERS
  /**
   * Got to the previous month
   */
  prevMonthView()
  {    
     return this.create(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1)); 
  }

  /**
   * Got to the next month
   */
  nextMonthView()
  {    
     return this.create(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1)); 
  }

  displayYearView()
  {
    this.changeYearLists(this.currentDate.getFullYear());
    this.changeState(this.YEARS);
  }

  displayMonthView()
  {
    this.changeState(this.MONTHS);
  }

  displayTimeView()
  {
    this.changeState(this.TIME);
  }

  prevYear()
  {    
     this.currentDate  = new Date(this.currentDate.getFullYear()-1, 
                                  this.currentDate.getMonth(), 
                                  this.currentDate.getDate(), 
                                  this.currentDate.getHours(), 
                                  this.currentDate.getMinutes(), 
                                  this.currentDate.getSeconds()
                                ); 
  }

  nextYear()
  {    
     this.currentDate  = new Date(this.currentDate.getFullYear()+1, 
                                  this.currentDate.getMonth(), 
                                  this.currentDate.getDate(), 
                                  this.currentDate.getHours(), 
                                  this.currentDate.getMinutes(), 
                                  this.currentDate.getSeconds()
                                ); 
  }

  changeSelectedDate(calendarDay:CalendarDay)
  {
    this.selectedDate = new Date(this.currentDate.getFullYear(), 
                                this.currentDate.getMonth(), 
                                calendarDay.day, 
                                this.currentDate.getHours(),
                                this.currentDate.getMinutes(),
                                this.currentDate.getSeconds()
                              );
    this.currentDate = this.selectedDate;
    this.close();
  }

  changeCurrentMonth(selectedMonth:number)
  {
    this.currentDate  = new Date(this.currentDate.getFullYear(), 
                                selectedMonth, 
                                this.currentDate.getDate(), 
                                this.currentDate.getHours(), 
                                this.currentDate.getMinutes(), 
                                this.currentDate.getSeconds()
                              ); 
    this.changeState(this.DAYS);
    this.create(this.currentDate);
  }

  changeCurrentYear(selectedYear:number)
  {
    this.currentDate  = new Date(selectedYear, 
                                 this.currentDate.getMonth(), 
                                 this.currentDate.getDate(), 
                                 this.currentDate.getHours(), 
                                 this.currentDate.getMinutes(), 
                                 this.currentDate.getSeconds()
                                ); 
    this.changeState(this.DAYS);
    this.create(this.currentDate);
  }

  changeTimeView()
  {

  }

  currentHoursChanged()
  {
    this.changeTimeView();
  }

  currentMinutesChanged()
  {
    this.changeTimeView();
  }

  currentSecondsChanged()
  {
    this.changeTimeView();
  }
  
	openDropDown(event){    
    this.open();
  }
  
  closeDropDown(event){
    this.close();
  }

  open(){     
    if(!this.visibility){
      this.create(this.selectedDate);
      this.visibility = true;
    }
  }
  
  close(){
    if(this.visibility){
      this.visibility = false;
      this.changeState(this.DAYS);
    }
  }

  onBlur(event){
    this.closeDropDown(event);
    this.onTouchedCallback();
  }

  onFocus(element){
    this.datePicker.nativeElement.focus();
    this.openDropDown(null);
  }

  closeCalendar(s){
    this.close();
  }
  
  public isOpen():boolean
  {
    return this.visibility;
  }

  getSelectedDateTitle():String
  {
    if(this.state != this.TIME){
      if(this.selectedDate){
        return this.selectedDate.getFullYear().toString();
      }else{
        return this.currentDate.getFullYear().toString();
      }
    }    
    return '';
  }

  getSelectedDateContent():String
  {
    var content:String = '';
    if(this.state != this.TIME){
      if(this.selectedDate){
        content = DateUtils.dayNames[this.selectedDate.getDay()]+', '+ this.selectedDate.getDate()+'. '+DateUtils.monthNames[this.selectedDate.getMonth()];
      }else{
        content = DateUtils.dayNames[this.currentDate.getDay()]+', '+ this.currentDate.getDate()+'. '+DateUtils.monthNames[this.currentDate.getMonth()];
      }
    }else{
      content = this.getCurrentTime();
    }    
    return content;
  }

  public getCurrentTime():string
	{
		var timeString:string = "";
		if(this.currentDate && this.timeControl){
			timeString = this.timeControl.createSecondNumberIfNotExist(this.currentDate.getHours()) + ":" + this.timeControl.createSecondNumberIfNotExist(this.currentDate.getMinutes());
			if(this.options.displayTimeWithSeconds){
				timeString += ":" + this.timeControl.createSecondNumberIfNotExist(this.currentDate.getSeconds());
			}
		}		
		return timeString;
  }


  public getCurrentMonthName():String
	{		
		return (this.currentDate)?DateUtils.getMonthName(this.currentDate):'';
	}

	public getMonthNames(index:number)
	{		
		return (DateUtils.monthNames[index]).toUpperCase().substring(0,3);
	}

	public getCurrentFullYear():any
	{	
		return (this.currentDate)?this.currentDate.getFullYear():'';
	}

	public getCurrentDay():any
	{
    return (this.currentDate)?this.currentDate.getDate():'';
	}

	private getDayName(dayIndex:number)
	{		
		return this.getDayNames(this.getLocale())[dayIndex];
	}

	public getDayNames(locale:string):Array<string>
	{		
		if(!locale){
			locale = this.locale;
		}else{
			this.locale = locale;
		}

		if(locale == "de_DE"){
			return DateUtils.dayNames;
		}else{
			return DateUtils.dayNames;
		}		
  }
  
  public isTheDayCurrentDay(calendarWeek:CalendarWeek, calendarDay:CalendarDay):boolean
  {
    if(this.selectedDate){
      var week:Array<any> = this.getWeekNumberOfYearByDate(this.selectedDate);
      return (week && this.selectedDate.getFullYear() == week[0] && calendarWeek.weekOfYear == week[1] && calendarDay.day == this.selectedDate.getDate());
    }
    return false;
  }

  public getClassIfSelectedMonth(currentMonth:number):String
  {
    return (this.currentDate.getMonth() == currentMonth)?'current-month':'';
  }

  public getCalendarDayClasses(calendarWeek:CalendarWeek, calendarDay:CalendarDay):String
  {
    var classes:String = "";
    if(calendarDay.isCurrentMonth){
      if(calendarDay.day == this.today.getDate() && calendarDay.month == this.today.getMonth() && calendarDay.year == this.today.getFullYear()){
        classes = " it-is-today ";
      }
    }else{
        classes = " calendar-empty-cell ";
    }
    
    if(this.selectedDate && calendarDay.day == this.selectedDate.getDate() && calendarDay.month == this.selectedDate.getMonth() && calendarDay.year == this.selectedDate.getFullYear()){
      if(calendarDay.isCurrentMonth){
        classes += " it-is-selected-day ";
      }else{
        classes += " it-is-selected-passive-day ";
      }
    }    
    return classes;
  }

  /**
   * Switch the state to days, month or year selection
   * @param state
   */
  changeState(state:string)
  {    
      if(state == this.YEARS){
        this.createYearLists(this.currentDate.getFullYear());
        this.setSelectableYears(this.currentDate.getFullYear());
      }
      this.state = state;
  }

  /* TIME */
  /**
   * Change current time
   * @param hours 
   * @param minutes 
   * @param seconds 
   */
  public changeTime(hours:number, minutes:number, seconds:number)  
  {
    if(hours){
      this.timeControl.setHours(hours);
    }
    if(minutes){
      this.timeControl.setMinutes(minutes);
    }
    if(seconds){
      this.timeControl.setSeconds(seconds);
    }
  }

  public setTheTime()
	{
    this.currentDate.setHours(this.timeControl.hours);
		this.currentDate.setMinutes(this.timeControl.minutes);
		this.currentDate.setSeconds(this.timeControl.seconds);
    this.changeState(this.DAYS);
	}

  
  //HELPERS /////////////////////////////////////////////
  
  public formatEnteredStringToDate()
  {
    var value:String = event.target["value"];
    var date:Date = (value)?this.selectedDate:null;
    if(value.indexOf(".") == -1 && value.indexOf("/") == -1){
        if(value.length == 8){
          date = new Date(Number(value.substring(4, 8)), Number(value.substring(2, 4))-1, Number(value.substring(0, 2)));
        }else if(value.length == 6){
          date = new Date(Number("20"+value.substring(4, 6)), Number(value.substring(2, 4))-1, Number(value.substring(0, 2)));
        }
    }else{
      if(value.indexOf(".") != -1 && value.split(".").length == 3){
        date = new Date(Number(value.split(".")[2]), Number(value.split(".")[1])-1, Number(value.split(".")[0]));
      }else if(value.indexOf("/") != -1 && value.split("/").length == 3){
        date = new Date(Number(value.split("/")[2]), Number(value.split("/")[1])-1, Number(value.split("/")[0]));
      }
    }
    this.selectedDate = date;
  }

	//From ControlValueAccessor interface
	writeValue(value: any) {
		if (value !== this.selectedDate) {
			this.selectedDate = value;
		}
	}

	//From ControlValueAccessor interface
	registerOnChange(fn: any) {
		this.onSelectedDateChange = fn;
	}

	//From ControlValueAccessor interface
	registerOnTouched(fn: any) {
		this.onTouchedCallback = fn;
	}

}
