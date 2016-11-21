// import { Component, OnInit }        from '@angular/core';
// import { NavController }            from 'ionic-angular';
// // import { TimerComponent }                 from "../timer/timer";
// // import { Stat }                     from '../../classes/stat.int';
// import { Player }                   from '../../classes/player.class'
//
// @Component({
//   templateUrl: 'stats.html'
// })
//
// export class StatsPage implements OnInit {
//   /* Variables */
//   public stat         : any           = {};
//   public selectAction : boolean       = true;
//   public selectPlayer : boolean       = true;
//   public players      : Player[]      = null;
//   public time         : string;
//
//   constructor (
//     public navController: NavController ) {
//
//   }
//
//   getTime ( value : string ) {
//     this.time = value;
//   }
//
//   tapOnCourt ( area: number, event: any ) : void {
//     this.stat.area = area;
//     this.stat['time'] = this.time;
//     this.selectAction = false;
//   }
//
//   tapOnAction ( action: string ) : void {
//     this.stat['action'] = action;
//     this.selectAction = true;
//     this.selectPlayer = false;
//   }
//
//   tapOnPlayer ( _player_id: string ) : void {
//     this.stat['player_id'] = _player_id;
//     this.selectPlayer = true;
//     // this.backstatSrv.create_stat( this.stat )
//     //   .then( res => console.log( res ));
//   }
//
//   ngOnInit() {
//
//   }
// }
