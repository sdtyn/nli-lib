import { Lang } from "../../core/Lang";
import { DateRange } from "../vo/DateRange";

export class DateUtils {    
       
    //MONTHS
    public static JANUAR:String = "Januar";
    public static FEBRUAR:String = "Februar";
    public static MARCH:String = "March";
    public static APRIL:String = "April";
    public static MAY:String = "May";
    public static JUNE:String = "June";
    public static JULY:String = "July";
    public static AUGUST:String = "August";
    public static SEPTEMBER:String = "September";
    public static OCTOBER:String = "October";
    public static NOVEMBER:String = "November";
    public static DECEMBER:String = "December";

    //DAYS
    public static MONDAY:String = "Monday";
    public static TUESDAY:String = "Tuesday";
    public static WEDNESDAY:String = "Wednesday";
    public static THURSDAY:String = "Thursday";
    public static FRIDAY:String = "Friday";
    public static SATURDAY:String = "Saturday";
    public static SUNDAY:String = "Sunday";

    //STATES
    public static ACTIVE:String = "active-day";
    public static PASSIVE:String = "passive-day";
    public static START_OF_RANGE:String = "start-of-range";
    public static END_OF_RANGE:String = "end-of-range";
    public static START_AND_END_OF_RANGE:String = "start-and-end-of-range";
    public static DAY_IN_RANGE:String = "day-in-range";
    public static DAY_IS_TODAY:String = "day-is-today";
    public static DAY_IS_SELECTED_DAY:String = "selected-day";
    
    //ERRORS
    public static ERROR_RANGE_CAN_NOT_USED_IN_FILTER_MODE:String = "ERROR_RANGE_CAN_NOT_USED_IN_FILTER_MODE";
    public static ERROR_DATE_IS_NOT_VALID:String = "ERROR_DATE_IS_NOT_VALID";
    public static ERROR_DATE_IS_PASST:String = "ERROR_DATE_IS_PASST";
    public static ERROR_DATE_IS_FUTURE:String = "ERROR_DATE_IS_FUTURE";
    public static ERROR_DATE_IS_NOT_SELECTABLE_RANGE:String = "ERROR_DATE_IS_NOT_SELECTABLE_RANGE";
    public static ERROR_DATE_IS_NOT_SELECTED_RANGE:String = "ERROR_DATE_IS_NOT_SELECTED_RANGE";
    public static ERROR_DATE_COULD_NOT_FOUND:String = "ERROR_DATE_COULD_NOT_FOUND";
    public static ERROR_VALUE_NOT_DEFINED:String = "ERROR_VALUE_NOT_DEFINED";

    //CONSTANS
    public static MONTHS:string = 'months';
    public static YEARS:string = 'years';
    public static DAYS:string = "days";

    //LABELS
    public static TIME_SPAN:string = 'time-span';
    public static FROM:string = 'from';
    public static TO:string = "to";

    public static WHOLE_TIME_SPAN:String = DateRange.WHOLE_TIME_SPAN;
    public static TODAY:String = DateRange.TODAY;
    public static YESTERDAY:String = DateRange.YESTERDAY;
    public static LAST_SEVEN_DAYS:String = DateRange.LAST_SEVEN_DAYS;
    public static LAST_THIRTY_DAYS:String = DateRange.LAST_THIRTY_DAYS;
    public static INDIVIDUALLY:String = DateRange.INDIVIDUALLY;

    public static lang:Lang;

    public static get dayNames():Array<any> {
        var array:Array<any> = [ this.lang.get(this.MONDAY).substring(0, 2),
                                 this.lang.get(this.TUESDAY).substring(0, 2),
                                 this.lang.get(this.WEDNESDAY).substring(0, 2),
                                 this.lang.get(this.THURSDAY).substring(0, 2),
                                 this.lang.get(this.FRIDAY).substring(0, 2),
                                 this.lang.get(this.SATURDAY).substring(0, 2),
                                 this.lang.get(this.SUNDAY).substring(0, 2)
                               ];
        return array;
    }

    public static get monthNames():Array<any> {
        var array:Array<any> = [ this.lang.get(this.JANUAR),
                                 this.lang.get(this.FEBRUAR),
                                 this.lang.get(this.MARCH),
                                 this.lang.get(this.APRIL),
                                 this.lang.get(this.MAY),
                                 this.lang.get(this.JUNE),
                                 this.lang.get(this.JULY),
                                 this.lang.get(this.AUGUST),
                                 this.lang.get(this.SEPTEMBER),
                                 this.lang.get(this.OCTOBER),
                                 this.lang.get(this.NOVEMBER),
                                 this.lang.get(this.DECEMBER)
                               ];
        return array;
    }

    public static get monthList():Array<any> {        
        var array:Array<any> = Array<any>();
        array[0] = [{index:0, label:DateUtils.monthNames[0], key:DateUtils.monthNames[0].substring(0,3)},
                    {index:1, label:DateUtils.monthNames[1], key:DateUtils.monthNames[1].substring(0,3)},
                    {index:2, label:DateUtils.monthNames[2], key:DateUtils.monthNames[2].substring(0,3)}];
        array[1] = [{index:3, label:DateUtils.monthNames[3], key:DateUtils.monthNames[3].substring(0,3)},
                    {index:4, label:DateUtils.monthNames[4], key:DateUtils.monthNames[4].substring(0,3)},
                    {index:5, label:DateUtils.monthNames[5], key:DateUtils.monthNames[5].substring(0,3)}];
        array[2] = [{index:6, label:DateUtils.monthNames[6], key:DateUtils.monthNames[6].substring(0,3)},
                    {index:7, label:DateUtils.monthNames[7], key:DateUtils.monthNames[7].substring(0,3)},
                    {index:8, label:DateUtils.monthNames[8], key:DateUtils.monthNames[8].substring(0,3)}];
        array[3] = [{index:9, label:DateUtils.monthNames[9], key:DateUtils.monthNames[9].substring(0,3)},
                    {index:10, label:DateUtils.monthNames[10], key:DateUtils.monthNames[10].substring(0,3)},
                    {index:11, label:DateUtils.monthNames[11], key:DateUtils.monthNames[11].substring(0,3)}];      
        return array;
    }
    
    public static daysInThisMonth(date:Date) {
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    }

    public static getMonthName(date:Date):string {
        if(date){
            return this.monthNames[date.getMonth()];
        }
        return "";
    }

    public static getDateFromString(dateString:String):Date {
        if(dateString && dateString.split(".").length == 3){            
            return new Date(Number(dateString.split(".")[2]),Number(dateString.split(".")[1])-1,Number(dateString.split(".")[0]));
        }
    }

    public static getDateTimeFromString(dateTimeString:String):Date {
        if(dateTimeString && dateTimeString.split(".").length == 3 && dateTimeString.split(":").length == 2){
            var dateTimeStringArray = dateTimeString.split(" ");
            var dateStringArray = (dateTimeStringArray[0]).split(".");
            var timeStringArray = (dateTimeStringArray[1]).split(":");
            return new Date(Number(dateStringArray[2]),Number(dateStringArray[1])-1,Number(dateStringArray[0]), Number(timeStringArray[0]), Number(timeStringArray[1]));
        }
    }

    public static convertStringToDate(value:String):Date
    {
        var date:Date;
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
        return date;        
    }

    public static formatStringToDateString(value:String):String
    {
        var formattedString:String = "";
        if(value.indexOf(".") == -1 && value.indexOf("/") == -1){
            if(value.length == 8){
                formattedString = value.substring(0, 2) +"."+ value.substring(2, 4) +"."+ value.substring(4, 8);
            }else if(value.length == 6){
                formattedString = value.substring(0, 2) +"."+ value.substring(2, 4) +"."+ "20"+value.substring(4, 6);
            }
        }else{
            if(value.indexOf("/") != -1 && value.split("/").length == 3){
                formattedString = value.split("/")[0] +"."+ value.split("/")[1] +"."+ value.split("/")[2];
            }
        }
        return formattedString;        
    }

    public static formatStringToTimeString(value:String):String
    {
        var formattedString:String = "";
        if(value.indexOf(":") == -1){
            if(value.length == 4){
                formattedString = value.substring(0, 2) +":"+ value.substring(2, 4);
            }
        }else{
            if(value.indexOf(".") != -1){
                formattedString = value.split(".")[0] +":"+ value.split(".")[1];
            }
        }
        return formattedString;        
    }

    public static isThatFormattedDateString(value:String):Boolean
    {
        if(value.length == 10 && value.split(".").length == 3){
            return true;
        }else{
            return false;
        }
    }

    public static isThatFormattedTimeString(value:String):Boolean
    {
        if(value.length == 5 && value.split(":").length == 2){
            return true;
        }else{
            return false;
        }
    }

    public static isDate(date:Date):Boolean {
        return Boolean(date);
    }

    public static today():Date{
        return new Date();
    }

    public static getDefaultLabels(locale:String){
        var labels:Array<any> = [];   
        
        if(locale == "en-US"){
            labels[labels.length] = {key:DateUtils.ERROR_RANGE_CAN_NOT_USED_IN_FILTER_MODE, label:"Selectable range can not used in filter mode"};
            labels[labels.length] = {key:DateUtils.ERROR_DATE_IS_NOT_VALID, label:"Date is not valid"};
            labels[labels.length] = {key:DateUtils.ERROR_DATE_IS_PASST, label:"Date is in the past"};
            labels[labels.length] = {key:DateUtils.ERROR_DATE_IS_FUTURE, label:"Date is in the future"};
            labels[labels.length] = {key:DateUtils.ERROR_DATE_IS_NOT_SELECTABLE_RANGE, label:"Date is not in the selectable range"};
            labels[labels.length] = {key:DateUtils.ERROR_DATE_IS_NOT_SELECTED_RANGE, label:"Date is not in the selected range"};
            labels[labels.length] = {key:DateUtils.ERROR_DATE_COULD_NOT_FOUND, label:"Date could not found"};
            labels[labels.length] = {key:DateUtils.ERROR_VALUE_NOT_DEFINED, label:"Date is required"};
    
            labels[labels.length] = {key:DateUtils.JANUAR, label:"Januar"};
            labels[labels.length] = {key:DateUtils.FEBRUAR, label:"Februar"};
            labels[labels.length] = {key:DateUtils.MARCH, label:"March"};
            labels[labels.length] = {key:DateUtils.APRIL, label:"April"};
            labels[labels.length] = {key:DateUtils.MAY, label:"May"};
            labels[labels.length] = {key:DateUtils.JUNE, label:"June"};
            labels[labels.length] = {key:DateUtils.JULY, label:"July"};
            labels[labels.length] = {key:DateUtils.AUGUST, label:"August"};
            labels[labels.length] = {key:DateUtils.SEPTEMBER, label:"September"};
            labels[labels.length] = {key:DateUtils.OCTOBER, label:"October"};
            labels[labels.length] = {key:DateUtils.NOVEMBER, label:"November"};
            labels[labels.length] = {key:DateUtils.DECEMBER, label:"December"};
    
            labels[labels.length] = {key:DateUtils.MONDAY, label:"Monday"};
            labels[labels.length] = {key:DateUtils.TUESDAY, label:"Tuesday"};
            labels[labels.length] = {key:DateUtils.WEDNESDAY, label:"Wednesday"};
            labels[labels.length] = {key:DateUtils.THURSDAY, label:"Thursday"};
            labels[labels.length] = {key:DateUtils.FRIDAY, label:"Friday"};
            labels[labels.length] = {key:DateUtils.SATURDAY, label:"Saturday"};
            labels[labels.length] = {key:DateUtils.SUNDAY, label:"Sunday"};
    
            labels[labels.length] = {key:DateUtils.TIME_SPAN, label:"Select a time span:"};
            labels[labels.length] = {key:DateUtils.FROM, label:"From:"};
            labels[labels.length] = {key:DateUtils.TO, label:"To:"};

            labels[labels.length] = {key:DateUtils.WHOLE_TIME_SPAN, label:"Whole time span"};
            labels[labels.length] = {key:DateUtils.TODAY, label:"Today"};
            labels[labels.length] = {key:DateUtils.YESTERDAY, label:"Yesterday"};
            labels[labels.length] = {key:DateUtils.LAST_SEVEN_DAYS, label:"Last 7 days"};
            labels[labels.length] = {key:DateUtils.LAST_THIRTY_DAYS, label:"Last 30 days"};
            labels[labels.length] = {key:DateUtils.INDIVIDUALLY, label:"Individually"};
        }else if(locale == "de-DE"){
            labels[labels.length] = {key:DateUtils.ERROR_RANGE_CAN_NOT_USED_IN_FILTER_MODE, label:"Erlaubte Zeitraum kann nicht in Filter-Mode verwendet werden"};
            labels[labels.length] = {key:DateUtils.ERROR_DATE_IS_NOT_VALID, label:"Datum ist nicht gültig"};
            labels[labels.length] = {key:DateUtils.ERROR_DATE_IS_PASST, label:"Datum liegt in Vergangenheit"};
            labels[labels.length] = {key:DateUtils.ERROR_DATE_IS_FUTURE, label:"Datum liegt in Zukunft"};
            labels[labels.length] = {key:DateUtils.ERROR_DATE_IS_NOT_SELECTABLE_RANGE, label:"Datum ist nicht in erlaubte Zeitraum"};
            labels[labels.length] = {key:DateUtils.ERROR_DATE_IS_NOT_SELECTED_RANGE, label:"Datum liegt nicht in ausgewählte Zeitraum"};
            labels[labels.length] = {key:DateUtils.ERROR_DATE_COULD_NOT_FOUND, label:"Datum kann nciht gefunden werden"};
            labels[labels.length] = {key:DateUtils.ERROR_VALUE_NOT_DEFINED, label:"Sie müssen ein Datum auswählen"};
    
            labels[labels.length] = {key:DateUtils.JANUAR, label:"Januar"};
            labels[labels.length] = {key:DateUtils.FEBRUAR, label:"Februar"};
            labels[labels.length] = {key:DateUtils.MARCH, label:"März"};
            labels[labels.length] = {key:DateUtils.APRIL, label:"April"};
            labels[labels.length] = {key:DateUtils.MAY, label:"Mai"};
            labels[labels.length] = {key:DateUtils.JUNE, label:"Juni"};
            labels[labels.length] = {key:DateUtils.JULY, label:"Juli"};
            labels[labels.length] = {key:DateUtils.AUGUST, label:"August"};
            labels[labels.length] = {key:DateUtils.SEPTEMBER, label:"September"};
            labels[labels.length] = {key:DateUtils.OCTOBER, label:"Oktober"};
            labels[labels.length] = {key:DateUtils.NOVEMBER, label:"November"};
            labels[labels.length] = {key:DateUtils.DECEMBER, label:"Dezember"};
    
            labels[labels.length] = {key:DateUtils.MONDAY, label:"Montag"};
            labels[labels.length] = {key:DateUtils.TUESDAY, label:"Dienstag"};
            labels[labels.length] = {key:DateUtils.WEDNESDAY, label:"Mittwoch"};
            labels[labels.length] = {key:DateUtils.THURSDAY, label:"Donnerstag"};
            labels[labels.length] = {key:DateUtils.FRIDAY, label:"Freitag"};
            labels[labels.length] = {key:DateUtils.SATURDAY, label:"Samstag"};
            labels[labels.length] = {key:DateUtils.SUNDAY, label:"Sonntag"};
    
            labels[labels.length] = {key:DateUtils.TIME_SPAN, label:"Zeitraum auswählen:"};
            labels[labels.length] = {key:DateUtils.FROM, label:"Von:"};
            labels[labels.length] = {key:DateUtils.TO, label:"Bis:"};

            labels[labels.length] = {key:DateUtils.WHOLE_TIME_SPAN, label:"Gesampter Zeitraum"};
            labels[labels.length] = {key:DateUtils.TODAY, label:"Heute"};
            labels[labels.length] = {key:DateUtils.YESTERDAY, label:"Gestern"};
            labels[labels.length] = {key:DateUtils.LAST_SEVEN_DAYS, label:"Letzte 7 Tage"};
            labels[labels.length] = {key:DateUtils.LAST_THIRTY_DAYS, label:"Letzte 30 Tage"};
            labels[labels.length] = {key:DateUtils.INDIVIDUALLY, label:"Individuell"};
        }

        
        return labels;
    }
    
}
