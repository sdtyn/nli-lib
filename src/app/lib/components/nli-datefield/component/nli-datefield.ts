import { Component, forwardRef, Input, Output, HostListener, ViewChild, ElementRef, AfterViewInit, EventEmitter  } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DateFormatter, CalendarDay, CalendarWeek, Calendar, DateUtils } from '../controls';
import { DateRange } from '../controls/vo/DateRange';
import { DateValidator } from '../validators/date.validator';
import { DateRangeValidator } from '../validators/date.range.validator';
import { DateFieldOptions } from '../controls/vo/DateFieldOptions';

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NLIDatefield),
  multi: true
};

@Component({
  selector: 'nli-datefield',
  templateUrl: './template.html',
  styleUrls: [ './styles.css' ],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class NLIDatefield extends Calendar implements AfterViewInit{
  
  @ViewChild('datePicker') 
  private datePicker:ElementRef;

  @Output() 
  changed: EventEmitter<any> = new EventEmitter();

  public filterStartDateInputValue:String = '';
  public filterStartTimeInputValue:String = '';
  public filterEndDateInputValue:String = '';
  public filterEndTimeInputValue:String = '';

	public visibility:boolean = false;
          
  public state:string = DateUtils.DAYS;

  displayedYearCount:number = 201;
  
  private tempSelectedRange:DateRange = new DateRange(null, null);
  
  private filterError:String = "";

  dateFieldForm: FormGroup;

  constructor(private fb: FormBuilder){
    super();
  }

  ngOnInit() {    
    this.lang.addLabelGroup(DateUtils.getDefaultLabels(this.options.locale));
    this.lang.addLabelGroup(this.options.labels);
    DateUtils.lang = this.lang;
    this.dateFieldForm = this.fb.group({
      'dateInput': ['', [Validators.required, DateValidator(this)]],
      'dateFilterInput': ['', [DateRangeValidator(this)]]
    });
  }
  
  ngAfterViewInit()
  {
    this.init();
    if(this.options.filterMode){
      this.selectedRange = new DateRange(null, null);
    }
  }

  @Input()
  public get configs():DateFieldOptions
  {
    return this.options;
  }

  public set configs(value:DateFieldOptions)
  {
    this.options = value;
  }
  
  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onSelectedDateChange: (_: any) => void = noop;

  private onSelectedRangeChange: (_: any) => void = noop;

// GETTERS AND SETTERS ///////////////////////////////////////////////////////////////////////////////////////////////////  
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

  private _inputValue:String;
	@Input()
  public get inputValue():String
  {
    return this._inputValue;
  }

  public set inputValue(value:String)
  {
    this._inputValue = value;
  }

  private _selectedRange:DateRange;
	public set selectedRange(dateRange:DateRange)
	{
    if (dateRange !== this.selectedRange && this.options.filterMode) {
      this._selectedRange = dateRange;
      this.onSelectedRangeChange(dateRange);
      this.setTimeSpanLabel();
    }
    this._selectedRange = dateRange;    
  }
  
  @Input()
	public get selectedRange():DateRange
	{
		return this._selectedRange;
	}

  private _selectedDate:Date;
	public set selectedDate(date:Date)
	{
    if (date !== this.selectedDate && !this.options.filterMode) {
      this._selectedDate = date;
      this.onSelectedDateChange(date);
      this.inputValue = DateFormatter.getFormattedDate(this._selectedDate, undefined);
      this.changed.emit(this._selectedDate);
    }
		this._selectedDate = date;
  }
  
  @Input()
	public get selectedDate():Date
	{
		return this._selectedDate;
	}
    
  private _locale:String = "de_DE";
	public get locale():String
	{
	  return this._locale;
	}
	
	public set locale(value:String)
	{
	  this._locale = value;
  } 
  
  private _classes:String = "";
  @Input()
	public get classes():String
	{
	  return this._classes;
	}
	
	public set classes(value:String)
	{
	  this._classes = value;
  } 
  
  private _styles:String = "";
  @Input()
	public get styles():String
	{
	  return this._styles;
	}
	
	public set styles(value:String)
	{
	  this._styles = value;
	} 

// CALENDAR EVENT HANDLERS /////////////////////////////////////////////////////////////////////////////////////////////////  
  /**
   * Got to the previous month on month view
   */
  prevMonthView():void
  {
     this.create(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1)); 
  }

  /**
   * Got to the next month on month view
   */
  nextMonthView():void
  {
     this.create(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1)); 
  }

  /**
   * Got to the next year on year view
   */
  prevYear():void
  {
     this.currentDate  = new Date(this.currentDate.getFullYear()-1, this.currentDate.getMonth(), this.currentDate.getDate(), 
                                  this.currentDate.getHours(), this.currentDate.getMinutes(), this.currentDate.getSeconds()); 
  }

  /**
   * Got to the next year on year view
   */
  nextYear():void
  {
     this.currentDate  = new Date(this.currentDate.getFullYear()+1, this.currentDate.getMonth(), this.currentDate.getDate(), 
                                  this.currentDate.getHours(),this.currentDate.getMinutes(), this.currentDate.getSeconds()); 
  }

  /**
   * select a month to set 
   * current month on month view 
   */
  selectCurrentMonth(selectedMonth:number):void
  {
    //setTimeout(()=>{
      this.currentDate  = new Date(this.currentDate.getFullYear(), selectedMonth, this.currentDate.getDate(), 
                                    this.currentDate.getHours(), this.currentDate.getMinutes(), this.currentDate.getSeconds()); 
      this.changeState(DateUtils.DAYS);
      this.create(this.currentDate);
    //},100);    
  }
  
  /**
   * select a year to set 
   * current year on year view 
   */
  selectCurrentYear(selectedYear:number):void
  {
    this.currentDate  = new Date(selectedYear, this.currentDate.getMonth(), this.currentDate.getDate(), 
                                 this.currentDate.getHours(), this.currentDate.getMinutes(), this.currentDate.getSeconds() ); 
    this.changeState(DateUtils.DAYS);
    this.create(this.currentDate);
  }

  /**
   * Scroll years on year selecting view
   * @param event 
   */
  @HostListener('mousewheel', ['$event']) 
  yearSelectionMouseWheelFunc(event):void
  {
    var year:number = this.centeredYearInYearSelection;
    if(event.deltaY > 0){      
      if(year >= this.yearList[this.yearList.length-1]){
        year = this.yearList[this.yearList.length-1];
        this.centeredYearInYearSelection = this.yearList[this.yearList.length-4];
      }else{
        if(this.centeredYearInYearSelection+3 >= this.yearList[this.yearList.length-1] ){
          this.centeredYearInYearSelection = this.yearList[this.yearList.length-4];
        }else{
          this.centeredYearInYearSelection = this.centeredYearInYearSelection+3;
        }
      }
    }else{
      if(this.yearList[0] >= ((year - 3)-3)){
        year = this.yearList[0];
        this.centeredYearInYearSelection = this.yearList[3];
      }else{
        year = (year - 3)-3;
        this.centeredYearInYearSelection = this.centeredYearInYearSelection-3;
      }        
    }
    this.scrollTo(year);
  }

  /**
   * Programmaticlly scrolling
   * @param year 
   */
  private scrollTo(year:number):void
  {
    setTimeout(this.moveAYearItemToTheTopOfView, 100, [year]);
  }

  /**
   * move a year item to the top of aeyr view
   */
  moveAYearItemToTheTopOfView(year):void
  {
    var elmnt = document.getElementById("year-line-"+year);
    elmnt.scrollIntoView();
  } 

  /**
   * scroll years on year view
   * @param event 
   */
  changeYearSelectionList(event):void
  {
    //TODO:
    //this.moveAYearItemToTheTopOfView(2018);
  }
  
// DROPDOWN ////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Open dropdown part of Datefield
   */
  open():void
  {  
    if(!this.visibility){
      this.create(this.selectedDate);
      this.visibility = true;
      if(this.options.filterMode){
        setTimeout(()=>{
          this.reCreateFilterOptions();
          this.clearFilterInputs();      
        },100);
      }       
    }
  }
  
  /**
   * Close dropdown part of Datefield
   */
  close():void
  {  
    if(this.visibility){
      this.visibility = false;
      this.changeState(DateUtils.DAYS);
    }
  }

  clickedOutsideOfDateField(event: Event) {
    this.closeDropdown();
  }

  private closeDropdown():void
  {  
    this.close();
    this.onTouchedCallback();
  }
  
  /**
   * 
   * @param event Blur event handler of date field
   */
  onBlur(event):void
  {  
    if(this.options.filterMode == false){    
      this.closeDropdown();
    }
  }

  /**
   * 
   * @param element Focus event handler of date field
   */
  onFocus(element):void
  {  
    setTimeout(() => this.datePicker.nativeElement.focus(), 100);
    this.open();
  }

// FUNTCIONALITY //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Change selected date if a day selected. 
   * This feature is active only on normal mode. 
   * It does not work on filter mode 
   * 
   * @param calendarDay 
   */
  changeSelectedDate(calendarDay:CalendarDay):void
  {  
    this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), calendarDay.day, 
          this.currentDate.getHours(), this.currentDate.getMinutes(),this.currentDate.getSeconds());
    this.currentDate = this.selectedDate;
    this.close(); 
  }
  
  /**
   * If the calender is day in selected range. 
   * It styles the days in selected range from current month view 
   * @param calendarDay 
   */
  selectADay(calendarDay:CalendarDay):void
  {
    var date:Date = new Date(calendarDay.year, calendarDay.month, calendarDay.day);
    if(!this.options.filterMode && this.proofIfTheDateIsInSelectableRange(date) == true){
      this.changeSelectedDate(calendarDay);
    }if(this.options.filterMode && this.proofIfTheDateIsInSelectableRange(date) == true){
      this.changeSelectedRange(date);
    }
  }

  /**
   * If the user selects a day then change the selected range.
   * This feature is active only on filter mode
   * @param date 
   */
  changeSelectedRange(date:Date):void
  {
    if(this.selectedRange.start &&  date.getTime() < this.selectedRange.start.getTime()){
      this.selectedRange.start = date;
      this.selectedRange.end = null;
    }else if(this.selectedRange.start && !this.selectedRange.end){
      date.setHours(23);
      date.setMinutes(59);
      this.selectedRange.end = date;
    }else{
      this.selectedRange.start = date;
      this.selectedRange.end = null;
    }
    if(this.selectedRange.end && this.selectedRange.start.getTime() >= this.selectedRange.end.getTime()){
      this.selectedRange.end = null;
    }
    this.selectedRange.timeSpan = DateRange.INDIVIDUALLY;
    this.reCreateFilterOptions();
    this.filterStartDateInputValue = DateFormatter.getFormattedDate(this.selectedRange.start, undefined);
    this.filterStartTimeInputValue = DateFormatter.getFormattedTime(this.selectedRange.start, undefined);
    if(this.selectedRange.end){
      this.filterEndDateInputValue = DateFormatter.getFormattedDate(this.selectedRange.end, undefined);
      this.filterEndTimeInputValue = DateFormatter.getFormattedTime(this.selectedRange.end, undefined);
    }else{
      this.filterEndDateInputValue = '';
      this.filterEndTimeInputValue = '';
    }
    this.clearFilter();
  }
  
  /**
   * returns the states of cell (class names)
   * @param calendarWeek 
   * @param calendarDay 
   * @return any
   */
  getStateOfDayCell(calendarWeek:CalendarWeek, calendarDay:CalendarDay):any
  {
    var currentDate = new Date(calendarDay.year, calendarDay.month, calendarDay.day);
    var states:String = "";
    if( this.proofIfTheDateIsInSelectableRange(currentDate) == false || calendarDay.isCurrentMonth == false){
      states = states+" "+DateUtils.PASSIVE;
      if(this.isCalendarDaySelectedDate(calendarDay) == true){
        if(this.options.filterMode == false){
          states = states+" "+DateUtils.DAY_IS_SELECTED_DAY;
        }
      }else if(this.isCalendarDayToday(calendarDay) == true){
        states = states+" "+DateUtils.DAY_IS_TODAY;
      }
    }else{
      if(this.options.filterMode && this.proofIfTheDateIsInSelectedRange(currentDate) == true){
        if(this.proofIfTheDateIsStartDateOfSelectedRange(currentDate) == true){
          states = states+" "+DateUtils.START_OF_RANGE;
        }
        if(this.proofIfTheDateIsEndDateOfSelectedRange(currentDate) == true){
          if(states.indexOf(String(DateUtils.START_OF_RANGE)) != -1){
            states = states+" "+DateUtils.START_AND_END_OF_RANGE;
          }else{
            states = states+" "+DateUtils.END_OF_RANGE;
          }
        }
        if(this.selectedRange.start && this.selectedRange.end){
          states = states+" "+DateUtils.DAY_IN_RANGE;
        }
      }else{
        if(this.isCalendarDayToday(calendarDay) == true){
            states = states+" "+DateUtils.DAY_IS_TODAY;
        }else if(this.selectedDate && 
                 calendarDay.day == this.selectedDate.getDate() && 
                 calendarDay.month == this.selectedDate.getMonth() && 
                 calendarDay.year == this.selectedDate.getFullYear()){
                  
            if(this.options.filterMode == false){
              states = states+" "+DateUtils.DAY_IS_SELECTED_DAY
            }
        }
      }
    }    
    return states;
  }

  /**
   * Switch the state to days, month or year selection
   * @param state
   */
  changeState(state:string):void
  {
    //ClickOutsideElement should first checked, 
    //BEcause of that setted this setTimeout
    setTimeout(()=>{
      if(state == DateUtils.YEARS){
        this.createYearLists(this.currentDate.getFullYear(), this.displayedYearCount);
        this.setSelectableYears(this.currentDate.getFullYear());
        this.centeredYearInYearSelection = this.currentDate.getFullYear();
        setTimeout(this.moveAYearItemToTheTopOfView, 100, [this.centeredYearInYearSelection-3]);
      }
      this.state = state;
    }, 100);      
  }

  /**
   * If the user select a time span item from dropdown,
   * change the time span
   * @param event 
   */
  timeSpanItemChange(event):void
  {
    this.selectedRange.timeSpan = event.target.value;
    if(this.selectedRange.timeSpan == DateRange.INDIVIDUALLY){
      this.filterStartDateInputValue = '';
      this.filterStartTimeInputValue = '';
      this.filterEndDateInputValue = '';
      this.filterEndTimeInputValue = '';
    }
    this.reCreateFilterOptions();
    this.setFilterInputValues(this.selectedRange.timeSpan);    
    
    setTimeout(() => {
      this.currentDate = this.selectedRange.start;
      this.create(this.currentDate);
    }, 100);    
    this.clearFilter();    
  }

  /**
   * change the input value if user selects a time span item or 
   * changes the selected date
   * @param timeSpan 
   */
  setFilterInputValues(timeSpan:String):void
  {
    if(timeSpan == DateRange.TODAY){
      this.filterStartDateInputValue = DateFormatter.getFormattedDate(new Date(), undefined);
      this.filterStartTimeInputValue = '00:00';
      this.filterEndDateInputValue = DateFormatter.getFormattedDate(new Date(), undefined);
      this.filterEndTimeInputValue = '23:59';
    }else if(timeSpan == DateRange.YESTERDAY){
      var date:Date = new Date();
          date.setDate(date.getDate() - 1);
      this.filterStartDateInputValue = DateFormatter.getFormattedDate(date, undefined);
      this.filterStartTimeInputValue = '00:00';
      this.filterEndDateInputValue = DateFormatter.getFormattedDate(date, undefined);
      this.filterEndTimeInputValue = '23:59';
    }else if(timeSpan == DateRange.LAST_SEVEN_DAYS){
      var date:Date = new Date();
        date.setDate(date.getDate() - 7);
      this.filterStartDateInputValue = DateFormatter.getFormattedDate(date, undefined);
      this.filterStartTimeInputValue = '00:00';
      this.filterEndDateInputValue = DateFormatter.getFormattedDate(new Date(), undefined);
      this.filterEndTimeInputValue = '23:59';
    }else if(timeSpan == DateRange.LAST_THIRTY_DAYS){
      var date:Date = new Date();
        date.setDate(date.getDate() - 30);
      this.filterStartDateInputValue = DateFormatter.getFormattedDate(date, undefined);
      this.filterStartTimeInputValue = '00:00';
      this.filterEndDateInputValue = DateFormatter.getFormattedDate(new Date(), undefined);
      this.filterEndTimeInputValue = '23:59';
    }else if(timeSpan == DateRange.WHOLE_TIME_SPAN){
      this.filterStartDateInputValue = '';
      this.filterStartTimeInputValue = '';
      this.filterEndDateInputValue = '';
      this.filterEndTimeInputValue = '';
    }

    setTimeout(()=>{this.selectedRange = this.createRangeObjectByInputValues();},100);    
  }

  /**
   * If user enters a value in filter inputs
   * @param event 
   */
  public filterInputChange(event):void
  {    
    this.selectedRange.timeSpan = DateRange.INDIVIDUALLY;
    this.reCreateFilterOptions();
    this.clearFilter();
  }

  /**
   * Focus out event handlers of start date input
   * @param event 
   */
  public filterStartDateInputFocusOut(event):void
  {
    var value:String = event.target["value"];
    if(!DateUtils.isThatFormattedDateString(value)){
      this.filterStartDateInputValue = DateUtils.formatStringToDateString(value);
      if(this.filterStartDateInputValue && this.filterStartTimeInputValue){
        this.selectedRange.start = DateUtils.getDateTimeFromString(this.filterStartDateInputValue +" "+ this.filterStartTimeInputValue);
      }else if(this.filterStartDateInputValue && !this.filterStartTimeInputValue){
        this.selectedRange.start = DateUtils.getDateTimeFromString(this.filterStartDateInputValue +" 00:00");
      }
    }
    if(this.selectedRange.end && this.selectedRange.start.getTime() >= this.selectedRange.end.getTime()){
      this.selectedRange.end = null;
    }
    this.changeFilterValues();
  }

  /**
   * Focus out event handlers of start time input
   * @param event 
   */
  public filterStartTimeInputFocusOut(event):void
  {
    var value:String = event.target["value"];
    if(!DateUtils.isThatFormattedTimeString(value)){      
      this.filterStartTimeInputValue = DateUtils.formatStringToTimeString(value);
      if(this.filterStartDateInputValue && this.filterStartTimeInputValue){
        this.selectedRange.start = DateUtils.getDateTimeFromString(this.filterStartDateInputValue +" "+ this.filterStartTimeInputValue);
      }
    }
    if(this.selectedRange.end && this.selectedRange.start.getTime() >= this.selectedRange.end.getTime()){
      this.selectedRange.end = null;
    }
    this.changeFilterValues();
  }
  
  /**
   * Focus out event handler of end date input
   * @param event 
   */
  public filterEndDateInputFocusOut(event):void
  {
    var value:String = event.target["value"];
    if(!DateUtils.isThatFormattedDateString(value)){      
      this.filterEndDateInputValue = DateUtils.formatStringToDateString(value);
      if(this.filterEndDateInputValue && this.filterEndTimeInputValue){
        this.selectedRange.end = DateUtils.getDateTimeFromString(this.filterEndDateInputValue +" "+ this.filterEndTimeInputValue);
      }else if(this.filterEndDateInputValue && !this.filterEndTimeInputValue){
        this.selectedRange.end = DateUtils.getDateTimeFromString(this.filterEndDateInputValue +" 23:59");
      }
    }
    if(this.selectedRange.end && this.selectedRange.start.getTime() >= this.selectedRange.end.getTime()){
      this.selectedRange.end = null;
    }
    this.changeFilterValues();
    setTimeout(() => {
      this.currentDate = this.selectedRange.start;
      this.create(this.currentDate);
    }, 100);    
  }

  /**
   * Focus out event handler of end time input
   * @param event 
   */
  public filterEndTimeInputFocusOut(event):void
  {
    var value:String = event.target["value"];
    if(!DateUtils.isThatFormattedTimeString(value)){      
      this.filterEndTimeInputValue = DateUtils.formatStringToTimeString(value);
      if(this.filterEndDateInputValue && this.filterEndTimeInputValue){
        this.selectedRange.end = DateUtils.getDateTimeFromString(this.filterEndDateInputValue +" "+ this.filterEndTimeInputValue);
      }
    }
    if(this.selectedRange.end && this.selectedRange.start.getTime() >= this.selectedRange.end.getTime()){
      this.selectedRange.end = null;
    }
    this.changeFilterValues();
  }

  /**
   * It changes the filter values
   */
  changeFilterValues():void
  {
    if(this.selectedRange.start){
      this.filterStartDateInputValue = DateFormatter.getFormattedDate(this.selectedRange.start, undefined);
      this.filterStartTimeInputValue = DateFormatter.getFormattedTime(this.selectedRange.start, undefined);
    }else{
      this.filterStartDateInputValue = '';
      this.filterStartTimeInputValue = '';
    }    
    
    if(this.selectedRange.end){
      this.filterEndDateInputValue = DateFormatter.getFormattedDate(this.selectedRange.end, undefined);
      this.filterEndTimeInputValue = DateFormatter.getFormattedTime(this.selectedRange.end, undefined);
    }else{
      this.filterEndDateInputValue = '';
      this.filterEndTimeInputValue = '';
    }
  }

  /**
   * Creates a range object by the filter inputs
   * @return DateRange 
   */
  private createRangeObjectByInputValues():DateRange
  {
    var startDate:Date;
    if(this.filterStartDateInputValue && this.filterStartDateInputValue.split(".").length == 3){
      startDate = DateUtils.getDateTimeFromString(this.filterStartDateInputValue+" "+this.filterStartTimeInputValue);   
    }

    var endDate:Date;
    if(this.filterEndDateInputValue && this.filterEndDateInputValue.split(".").length == 3){
      endDate = DateUtils.getDateTimeFromString(this.filterEndDateInputValue+" "+this.filterEndTimeInputValue);      
    }
    var dateRange:DateRange = new DateRange(startDate, endDate);
        dateRange.timeSpan = this.selectedRange.timeSpan;
    return dateRange;
  }

  /**
   * Check if the date is in selected range
   * @param date 
   * @return Boolean
   */
  proofIfTheDateIsInSelectedRange(date:Date):Boolean
  {
    if(date && (this.selectedRange.start || this.selectedRange.end)){
      if( (this.selectedRange.start && this.selectedRange.end && this.selectedRange.start.getTime() <= date.getTime() && this.selectedRange.end.getTime() >= date.getTime()) || 
          (this.selectedRange.start && !this.selectedRange.end && this.selectedRange.start.getTime() <= date.getTime()) ||
          (!this.selectedRange.start && this.selectedRange.end && this.selectedRange.end.getTime() >= date.getTime()) ){
        return true;
      }
    }
    return false;
  }
  
  /**
   * Check if the date is start of selected range
   * @param date 
   * @return Boolean
   */
  public proofIfTheDateIsStartDateOfSelectedRange(date:Date):Boolean
  {
    if(date && this.selectedRange.start){
      if( this.selectedRange.start.getFullYear() == date.getFullYear() && 
          this.selectedRange.start.getMonth() == date.getMonth() &&
          this.selectedRange.start.getDate() == date.getDate() ){
        return true;
      }
    }
    return false;
  }

  /**
   * Check if the date is end of selected range
   * @param date 
   * @return Boolean
   */
  public proofIfTheDateIsEndDateOfSelectedRange(date:Date):Boolean
  {
    if(date && this.selectedRange.end){
      if( this.selectedRange.end.getFullYear() == date.getFullYear() && 
          this.selectedRange.end.getMonth() == date.getMonth() &&
          this.selectedRange.end.getDate() == date.getDate() ){
        return true;
      }
    }
    return false;
  }
 
  /**
   * Check if the date is in selectable range
   * @param date 
   * @return Boolean
   */
  public proofIfTheDateIsInSelectableRange(date:Date):Boolean
  {
    if(this.options.selectableRange.start || this.options.selectableRange.end){
      if( (this.options.selectableRange.start && this.options.selectableRange.end && date && this.options.selectableRange.start.getTime() <= date.getTime() && this.options.selectableRange.end.getTime() >= date.getTime()) || 
          (this.options.selectableRange.start && !this.options.selectableRange.end && date && this.options.selectableRange.start.getTime() <= date.getTime()) ||
          (!this.options.selectableRange.start && this.options.selectableRange.end && date && this.options.selectableRange.end.getTime() >= date.getTime()) ){
        return true;        
      }else{
        return false;
      }
    }
    return true;
  }

  /**
   * Accept selected time span or input values
   * @param event 
   */
  timeSpanOkButtonClick(event):void
  {
    var dateRange:DateRange = this.createRangeObjectByInputValues();
    if(dateRange.start && dateRange.end && this.proofIfTheDateIsInSelectableRange(dateRange.start) && this.proofIfTheDateIsInSelectableRange(dateRange.end)){
      this.selectedRange = dateRange;
      this.selectedRange.timeSpan = this.selectedRange.timeSpan;
      this.tempSelectedRange = dateRange;
      this.setTimeSpanLabel();
      this.closeDropdown();
      this.changed.emit(this.selectedRange);
    }else if(this.selectedRange.timeSpan == DateRange.WHOLE_TIME_SPAN){
      this.selectedRange = new DateRange(null, null);
      this.selectedRange.timeSpan = DateRange.WHOLE_TIME_SPAN;
      this.tempSelectedRange = dateRange;
      this.inputValue =  this.lang.get(this.selectedRange.timeSpan);
      this.closeDropdown();
      this.changed.emit(this.selectedRange);
    }else{
      this.filterError = "Das Datum liegt nicht in dem Zeitraum";
    }
  }

  /**
   * Cancel the changes of filters
   * This feature is active only on filter mode
   * @param event 
   */
  timeSpanCancelButtonClick(event):void
  {
    this.selectedRange = this.tempSelectedRange;
    this.setFilterInputValues(this.tempSelectedRange.timeSpan);     
    this.setTimeSpanLabel();
    this.closeDropdown();
  }

  /**
   * Formats the entered string
   */
  public formatEnteredStringToDate(event):void
  {
    var value:String = event.target["value"];
    var date:Date = (value)?this.selectedDate:null;
    date = DateUtils.convertStringToDate(value);
    
    if(this.proofIfTheDateIsInSelectableRange(date)){
      this.selectedDate = date;
    }else{
      //ERROR: inputValue is not affected
      //TODO Display Error because selected date is not in selectable range
    }
    if(date){
      this.inputValue = DateFormatter.getFormattedDate(date, undefined);
    }
  }

  /**
   * If the calenday day is today. 
   * It styles the today on current motnh view
   * @param calendarDay 
   */
  private isCalendarDayToday(calendarDay:CalendarDay):Boolean
  {
    if(calendarDay.day == DateUtils.today().getDate() && 
      calendarDay.month == DateUtils.today().getMonth() && 
      calendarDay.year == DateUtils.today().getFullYear() ){
        return true;
    }
    return false;
  }

  /**
   * If the calenday day (a day cell) is the selectedDate
   * @param calendarDay 
   */
  private isCalendarDaySelectedDate(calendarDay:CalendarDay):Boolean
  {
    if(this.selectedDate){
      if(calendarDay.day == this.selectedDate.getDate() && 
        calendarDay.month == this.selectedDate.getMonth() && 
        calendarDay.year == this.selectedDate.getFullYear() ){
          return true;
      }
    }    
    return false;
  }

  /**
   * Clear filter validations
   */
  clearFilter():void
  {
    this.filterError = "";
  }

  /**
   * changes filter input by the timeSpan
   */
  clearFilterInputs():void
  {
    this.setFilterInputValues(this.selectedRange.timeSpan);
  }
	
// HELPERS ////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   *  Get label of selected year on header
   * @return String 
   */
  getSelectedYearLabel():String
  {   
    if(this.selectedDate){
      return this.selectedDate.getFullYear().toString();
    }else{
      return this.currentDate.getFullYear().toString();
    }
  }

  /**
   * Get label of selected date on header
   * @return String 
   */
  getSelectedDateLabel():String
  {
    var content:String = '';    
    if(this.selectedDate){
      content = this.getDayNames()[this.selectedDate.getDay()]+', '+ this.selectedDate.getDate()+'. '+DateUtils.monthNames[this.selectedDate.getMonth()];
    }else{
      content = this.getDayNames()[this.currentDate.getDay()]+', '+ this.currentDate.getDate()+'. '+DateUtils.monthNames[this.currentDate.getMonth()];
    }   
    return content;
  }

  /**
   * get month list from DateUtils
   * @return Array<any>
   */
	public monthList():Array<any>
	{	
		return DateUtils.monthList;
	}
  
  /**
   * get the current year
   * @return String
   */
	public getCurrentFullYearLabel():String
	{	
		return String((this.currentDate)?this.currentDate.getFullYear():'');
	}

  /**
   * get the current month name
   * @return String
   */
  public getCurrentMonthLabel():String
	{		
		return (this.currentDate)?DateUtils.getMonthName(this.currentDate):'';
	}

  /**
   * get translated month label from date utils
   * @param index 
   * @return String
   */
	public getMonthLabel(index:number):String
	{	
		return (DateUtils.monthNames[index]).toUpperCase().substring(0,3);
  }
  
  /**
   * get translated day names from date utils
   * @param index 
   */
	public getDayNames():Array<string>
	{
    return DateUtils.dayNames;
  }
    
  /**
   * returns the dataprovider of filter dropdown 
   * @return Array<any>
   */
  public getFilterDropDownItems():Array<any>
  {

    return [{key:DateRange.WHOLE_TIME_SPAN, label:this.lang.get(DateRange.WHOLE_TIME_SPAN)},
            {key:DateRange.TODAY, label:this.lang.get(DateRange.TODAY)},
            {key:DateRange.YESTERDAY, label:this.lang.get(DateRange.YESTERDAY)},
            {key:DateRange.LAST_SEVEN_DAYS, label:this.lang.get(DateRange.LAST_SEVEN_DAYS)},
            {key:DateRange.LAST_THIRTY_DAYS, label:this.lang.get(DateRange.LAST_THIRTY_DAYS)},
            {key:DateRange.INDIVIDUALLY, label:this.lang.get(DateRange.INDIVIDUALLY)}];
  }

  private setTimeSpanLabel():void
  {
    if(this.selectedRange.timeSpan == DateRange.INDIVIDUALLY){
      this.inputValue =  DateFormatter.getFormattedDate(this.selectedRange.start, "DD.MM.YYYY HH:MM")+" - "+DateFormatter.getFormattedDate(this.selectedRange.end, "DD.MM.YYYY HH:MM");
    }else{
      this.inputValue =  this.lang.get(this.selectedRange.timeSpan);
    }    
  }

  /**
   * Creates the dropdown elements of filter 
   */
  timeSpanDataProvider:Array<any> = [];
  public reCreateFilterOptions():void
  {
    this.timeSpanDataProvider = [];
    for (let index = 0; index < this.getFilterDropDownItems().length; index++) {
      var element = this.getFilterDropDownItems()[index];
      if(element.key == this.selectedRange.timeSpan){
        element.selected = "selected";
      }else{
        element.selected = "";
      }
      this.timeSpanDataProvider[this.timeSpanDataProvider.length] = element;
    }
  }
}
