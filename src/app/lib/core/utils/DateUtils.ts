export class DateUtils {    
    
    public static dayNames:Array<string> = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
	
	public static monthNames:Array<string> = ["Januar", "Februar", "März", "April", "May", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
   
    public static daysInThisMonth(date:Date) {
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    }

    public static getMonthName(date:Date):string {
        if(date){
            return this.monthNames[date.getMonth()];
        }
        return "";
    }
    
}
