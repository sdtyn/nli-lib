import { Event } from './event';

export class InputEvent extends Event {
    
    static KEY_UP:string = 'keyUp';
    static KEY_DOWN:string = 'keyDown';
    static KEY_PRESS:string = 'keyPress';
    static ROLL_OVER:string = 'rollOver';
    static ROLL_OUT:string = 'rollOut';
    static MOUSE_OVER:string = 'mouseOver';
    static MOUSE_OUT:string = 'mouseOut';

    constructor(public eventType:string){
        super(eventType);
    }
};