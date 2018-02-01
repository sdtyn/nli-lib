import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';

export class TimeControl implements OnInit {

    hours:number = 0;
    seconds:number = 0;
    minutes:number = 0;  
    timer:Observable<number>;
    date:Date = new Date();
    constructor(date:Date=null) {
        if(date){
            this.date = new Date(date.getMilliseconds());
        }
        this.createTimeFromDate();
        this.timer = Observable.timer(1000,1000);
    }

    ngOnInit()
    {
        //this.tickTack();
    }

    createTimeFromDate()
    {
        if(this.date){
            this.hours = this.date.getHours();
            this.minutes = this.date.getMinutes();
            this.seconds = this.date.getSeconds();
        }
    }
    
    start(){
        this.timer.subscribe(t=>this.tickTack(t));
    }

    stop(){
        //TODO STOP
    }

    clear(){
        this.hours = 0;
        this.seconds = 0;
        this.minutes = 0;
    }
    
    tickTack(t:number){
        this.seconds = t;
        this.createTimeFromDate();
    }

    setHours(hours){
        if(hours){
            if(hours == 1 && this.hours == 23){
                this.hours = 0;
            }else if(hours == -1 && this.hours == 0){
                this.hours = 23;
            }else{
                this.hours += hours;
            }
        }
        this.date.setHours(this.hours);
    }

    setMinutes(minutes){
        if(minutes){
            if(minutes == 1 && this.minutes == 59){
                this.minutes = 0;
            }else if(minutes == -1 && this.minutes == 0){
                this.minutes = 59;
            }else{
                this.minutes += minutes;
            }
        }
        this.date.setMinutes(this.minutes);
    }

    setSeconds(seconds){
        if(seconds){
            if(seconds == 1 && this.seconds == 59){
                this.seconds = 0;
            }else if(seconds == -1 && this.seconds == 0){
                this.seconds = 59;
            }else{
                this.seconds += seconds;
            }
        }
        this.date.setSeconds(this.seconds);
    }
    
    getTimeString(showTimeWithSecond):String{
        var timeString:string = this.createSecondNumberIfNotExist(this.hours) + ":" + this.createSecondNumberIfNotExist(this.minutes);
        if(showTimeWithSecond){
            timeString += ":" + this.createSecondNumberIfNotExist(this.seconds);
        }
        return timeString;
    }

    getHourString():String{
        return this.createSecondNumberIfNotExist(this.hours);
    }

    getMinuteString():String{
        return this.createSecondNumberIfNotExist(this.minutes);
    }

    getSecondString():String{
        return this.createSecondNumberIfNotExist(this.seconds);
    }
    
    createSecondNumberIfNotExist(number:number):String
    {
        if(String(number).length == 1){
            return "0"+number;
        }
        return String(number);
    }
}