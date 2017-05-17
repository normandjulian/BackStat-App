import { Component } from '@angular/core';
import { NavController, Platform, LoadingController, AlertController } from 'ionic-angular';
// import { StatsPage }                from "../stats/stats";
import { Game } from '../../classes/game.class';
import { Team } from '../../classes/team.class';
// import { BackstatSrv }              from '../../providers/backstat/backstat';
import { GamePage } from '../game/game';

@Component({
  templateUrl: 'home.html'
})

export class HomePage {
  public selected_team: Team;
  public selected_game: Game;
  public games: Game[] = [];
  public teams: Team[] = [];

  constructor(
    public platform: Platform,
    public navController: NavController,
    // public backstatSrv : BackstatSrv,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    platform.ready().then(() => {
      // this.backstatSrv.get_teams()
      //   .then( res => this.initiate( res ) );
    });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...',
      duration: 3000
    });
    loader.present();
  }

  initiate(_teams) {
    this.teams = _teams;
    if (!!this.teams.length) {
      this.select_team(this.teams[0]);
    }
  }

  select_team(_team) {
    if ((this.selected_team === _team) || (_team === null)) {
      // this.selected_team = this.backstatSrv.set_selected_team( null );
      this.games = null;
    } else {
      // this.selected_team = this.backstatSrv.set_selected_team( _team );
      // this.backstatSrv.get_games()
      // .then( res => this.games = res )
    }
  }

  goto_team(_state) {
    if (_state === 'add') {
      this.select_team(null);
      this.navController.push(Team);
    } else if (_state === 'update') {
      if (!this.selected_team) {
      } else {
        this.navController.push(Team);
      }
    } else {

    }
  }

  refresh_team(): void {
    this.teams = [];
    // this.backstatSrv.get_teams()
    //   .then( res => this.initiate( res ));
  }

  delete_team(): void {
    // this.backstatSrv.delete_team()
    //   .then( res => {
    //     this.refresh_team();
    //   })
  }

  select_game(_game) {
    if (!!this.selected_game) {
      // this.selected_game = this.backstatSrv.set_selected_game( null );
    } else {
      // this.selected_game = this.backstatSrv.set_selected_game( _game );
    }
  }

  goto_game(_state) {
    if (_state === 'add') {
      this.navController.push(GamePage);
    } else if (_state === 'update') {
      if (!this.selected_game) {
      } else {
        this.navController.push(GamePage);
      }
    } else {

    }
  }

  refresh_game(): void {
    this.games = [];
    // this.backstatSrv.get_games()
    //   .then( res => {
    //     this.games = res;
    //     this.selected_game = this.games[0];
    //   });
  }

  delete_game() {
    this.alertCtrl.create({
      title: 'Supprimer ce match ?',
      message: 'Attention, toutes les statistiques liées à ce match seront aussi supprimées',
      buttons: [
        { text: 'Que nenni', handler: () => { } },
        {
          text: 'Allé c\'est parti',
          handler: () => {
            // this.backstatSrv.delete_game()
            //   .then( res => {
            //     this.refresh_game();
            //   })
          }
        }
      ]
    }).present();
  }

  goto_stat() {
    if (!!this.selected_game) {
      // this.navController.push( StatsPage );
    }
  }
}
