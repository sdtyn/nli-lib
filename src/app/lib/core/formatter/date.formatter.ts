export class DateFormatter {
    
    private static format:string = "DD.MM.YYYY";
    public static datePipeFormat:string = "dd.MM.y";

    static DEFAULT_DATE_FORMATS = {
        parse: {
            dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
        },
        display: {
            // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
            dateInput: 'input',
            monthYearLabel: {year: 'numeric', month: 'short'},
            dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
            monthYearA11yLabel: {year: 'numeric', month: 'long'},
        }
    };  

    static getDefaultDateFormats(){
        return this.DEFAULT_DATE_FORMATS;
    }


    static getFormat():string
    {
        return this.format;
    }

    static getFormattedDate(date:Date, dateFormat:String):string
    {
        if(!dateFormat){
            dateFormat = this.format;
        }
        if(date){
                if(dateFormat == "DD.MM.YYYY"){
                    return this.addSecondNumberIfNotExist(date.getDate())+"."+this.addSecondNumberIfNotExist(date.getMonth()+1)+"."+date.getFullYear();
                }else  if(dateFormat == "DD.MM.YYYY HH:MM"){
                    return this.addSecondNumberIfNotExist(date.getDate())+"."+this.addSecondNumberIfNotExist(date.getMonth()+1)+"."+date.getFullYear()+" "+this.addSecondNumberIfNotExist(date.getHours())+":"+this.addSecondNumberIfNotExist(date.getMinutes());
                }else  if(dateFormat == "DD.MM.YYYY HH:MM:SS"){
                    return this.addSecondNumberIfNotExist(date.getDate())+"."+this.addSecondNumberIfNotExist(date.getMonth()+1)+"."+date.getFullYear()+" "+this.addSecondNumberIfNotExist(date.getHours())+":"+this.addSecondNumberIfNotExist(date.getMinutes())+":"+this.addSecondNumberIfNotExist(date.getSeconds());
                }
        }
        return "";
    }

    static addSecondNumberIfNotExist(number:number):String
    {
        if(String(number).length == 1){
            return "0"+number;
        }
        return String(number);
    }

    static getFormattedDateWithDayName(date:Date):string
    {
       if(date){
            //if(this.format == "DD.MM.YYYY"){
                return date.toDateString();
            //}
       }
        return "";
    }


};