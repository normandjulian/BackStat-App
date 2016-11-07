/**
 * Created by juliannormand on 30/06/2016.
 */

import {Component, OnInit, EventEmitter, Input} from "@angular/core";

@Component({
    selector: 'timer',
    templateUrl: 'timer.html',
    outputs : ['timeChange']
})
export class TimerComponent implements OnInit {
    /* Variables */
    public timer    : any;
    public bStart   : boolean   = false;
    public bStop    : boolean   = true;
    public bPause   : boolean   = true;
    public bTimeOut : boolean   = true;
    public bResume  : boolean   = true;
    public bRefresh : boolean   = true;
    public time     : string    = '';

    public timeChange: EventEmitter<{}> = new EventEmitter();

    @Input() seconds : number;

    start () : void {
        clearInterval(this.timer);
        this.timer = setInterval( () => {
            this.seconds--;
            this.format();
        }, 1000);

        this.bStart     = true;
        this.bStop      = false;
    }

    stop () : void {
        clearInterval(this.timer);
        this.bResume    = false;
        this.bStart     = true;
        this.bStop      = true;
    }

    resume () : void {
        this.timer = setInterval( () => {
            this.seconds--;
            this.format();
        }, 1000);

        this.bStart     = true;
        this.bStop      = false;
        this.bResume    = true;
    }

    ngOnInit () : void {
        this.seconds = 180;
        this.format();
    }

    // lol
    format () : void {
        let hours : string      = (Math.floor(this.seconds / 60) < 10) ? ('0' + Math.floor(this.seconds / 60)) : ( '' + Math.floor(this.seconds / 60));
        let minutes : string    = ((this.seconds - (Number(hours) * 60)) < 10) ? ('0' + (this.seconds - (Number(hours) * 60))) : ( '' + (this.seconds - (Number(hours) * 60)));

        this.time = hours + ':' + minutes;
        this.timeChange.emit(this.time);
    }


}
