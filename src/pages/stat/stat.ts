import { Component, OnInit }    from '@angular/core';
import { NavController,
         NavParams }            from 'ionic-angular';
// import { TimerComponent }       from '../timer/timer';
import { MenuController } from 'ionic-angular';

import { StatService }          from './stat-service';
import { Stat }                 from '../../classes/stat.class';
import { Player }               from '../../classes/player.class';
//
@Component({
  selector: 'page-stat',
  templateUrl: 'stat.html',
  providers: [ StatService ]
})

export class StatPage implements OnInit {
  public stat         : Stat          = {
    _id: null,
    area: null,
    time: null,
    action: null,
    player_id: null,
    game_id: null,
    team_id: null
  };
  public selectAction : boolean       = true;
  public selectPlayer : boolean       = true;
  public players      : Player[]      = null;
  public time         : string;
  public timerSeconds : number = 330;
  constructor (
    public navController: NavController,
    public navParams: NavParams,
    public statService: StatService,
    public menuCtrl: MenuController) {
  }


  openMenu() {
   this.menuCtrl.open();
  }
  /**
   * Get back the time
   * @param  {_time} value [the time of the game]
   */
  getTime ( time : string ) {
    this.time = time;
    console.log(time)
  }

  /**
   * Set the area of the
   * @param {number} _area [the area clicked]
   */
  tapOnCourt ( area: number ) : void {
    this.stat.area = area;
    this.stat.time = this.time;
    this.selectAction = false;
  }

  /**
   * Set the action of the stat
   * @param {string} action [the action selected]
   */
  tapOnAction ( action: string ) : void {
    this.stat['action'] = action;
    this.selectAction = true;
    this.selectPlayer = false;
    console.log(this.players);
  }

  tapOnPlayer ( player_id: string ) : void {
    this.stat['player_id'] = player_id;
    this.selectPlayer = true;
    console.log(this.stat);
    // this.statService.create_stat( this.stat ).subscribe(
    //   res => console.log( res ),
    //   err => console.log( err )
    // );
  }

  set_up() {
    this.statService.get_players( this.stat.team_id ).subscribe(
      res => this.players = res,
      err => console.log(err)
    )
  }

  ngOnInit() {
    this.stat.game_id = this.navParams.get('game_id');
    this.stat.team_id = this.navParams.get('team_id');
    console.log(this.stat);
    this.set_up();
  }
}
