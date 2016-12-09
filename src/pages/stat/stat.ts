import { Component, OnInit }    from '@angular/core';
import { NavController,
         NavParams }            from 'ionic-angular';
// import { TimerComponent }       from '../timer/timer';

import { StatService }          from './stat-service';
import { Stat }                 from '../../classes/stat-class';
import { Player }               from '../../classes/player-class';
//
@Component({
  selector: 'page-stat',
  templateUrl: 'stat.html',
  providers: [ StatService ]
})

export class StatPage implements OnInit {
  public stat         : Stat          = null;
  public selectAction : boolean       = true;
  public selectPlayer : boolean       = true;
  public players      : Player[]      = null;
  public time         : string;
  public game_id      : string;
  public team_id      : string;

  constructor (
    public navController: NavController,
    public navParams: NavParams,
    public statService: StatService) {
  }

  /**
   * Get back the time
   * @param  {_time} value [the time of the game]
   */
  getTime ( _time : string ) {
    this.time = _time;
  }

  /**
   * Catch the tap on the court and set the this.stat
   * @param {number} _area [the area clicked]
   */
  tapOnCourt ( _area: number ) : void {
    this.stat.area = _area;
    this.stat['time'] = this.time;
    this.selectAction = false;
  }

  tapOnAction ( action: string ) : void {
    this.stat['action'] = action;
    this.selectAction = true;
    this.selectPlayer = false;
  }

  tapOnPlayer ( _player_id: string ) : void {
    this.stat['player_id'] = _player_id;
    this.selectPlayer = true;
    // this.backstatSrv.create_stat( this.stat )
    //   .then( res => console.log( res ));
  }

  set_up() {
    this.statService.get_players( this.team_id ).subscribe(
      res => this.players = res,
      err => console.log(err)
    )
  }

  ngOnInit() {
    this.game_id = this.navParams.get('game_id');
    this.team_id = this.navParams.get('team_id');
  }
}
