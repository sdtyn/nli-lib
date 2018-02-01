import { EventEmitter } from '@angular/core';

export class Event extends EventEmitter<any> {
    
    static FOCUS_OUT:string = 'focusOut';
    static FOCUS_IN:string = 'focusIn';
    static CHANGE:string = 'change';
    static UPDATE:string = 'update';

    public value;

    constructor(public eventType:string){
        super();
    }

    emit(value):void
    {
        this.value = value;
        super.emit(this);
    }
};