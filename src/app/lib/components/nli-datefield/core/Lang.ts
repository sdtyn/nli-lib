export class Lang {    
    
    list:Array<any>;

    constructor(){
        this.setDefaultList();
    }

    public get(key:String):String
    {
        var label:String = key;
        for (let index = 0; index < this.list.length; index++) {
            const element = this.list[index];
            if(key == element.key){
                label = element.label;
                break;
            }            
        }
        return label;
    }

    public set(key:String, label:String):void
    {
        var found:Boolean = false;
        for (let index = 0; index < this.list.length; index++) {
            const element = this.list[index];
            if(key == element.key){
                element.label = label;
                found = true;
                break;
            }            
        }

        if(found == false){
            this.list[this.list.length] = {key:key, label:label};
        }
    }

    public addLabelGroup(group:Array<any>)
    {
        var found:Boolean = false;
        for (let index = 0; index < group.length; index++) {
            const element = group[index];
            this.set(element.key, element.label);       
        }
    }

    private setDefaultList():void
    {
        this.list = [];        
    }
    

}
