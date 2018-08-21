export class WindowTools{

    public static isClickedElementAChildOfHostElement(hostElement:Object, targetElement:Object):any
    {        
        if(hostElement && targetElement){
            return WindowTools.isElementAChildOf(hostElement, targetElement);
        }
        return false;
    }

    public static isElementAChildOf(hostElement, targetElement):Boolean
    {
        var found:Boolean = false;
        var foundNotYet:Boolean = true;
        while(foundNotYet){
            if(targetElement && (targetElement.id == hostElement.id)){
                found = true;
                foundNotYet = false;
            }else if(targetElement.parentElement){
                targetElement = targetElement.parentElement;
            }else{
                foundNotYet = false;
            }
        }
        return found;        
    }
    
    public static proofIfClickedObjectAChildOfAnotherElement(event:MouseEvent, parentElement:String):any
    {
        
        if(event.target){            
            var found:Boolean = WindowTools.isAChildElement(event.target, parentElement);

            return found;
        }
        return false;
    }


    public static isAChildElement(element, parentElement:String):Boolean
    {
        var found:Boolean = false;
        var foundNotYet:Boolean = true;
        while(foundNotYet){
            if(element && (element.id == parentElement)){
                found = true;
                foundNotYet = false;
            }else if(element.parentElement){
                element = element.parentElement;
            }else{
                foundNotYet = false;
            }
        }
        return found;        
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