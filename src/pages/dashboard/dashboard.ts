import { Component,
         OnInit }           from '@angular/core';
import { NavController,
         AlertController,
         Platform }         from 'ionic-angular';
import { DashboardService } from './dashboard-service';

import { Team }             from '../../classes/team.class';
import { Game }             from '../../classes/game-class';

import { TeamPage }         from '../team/team';
import { GamePage }         from '../game/game';
import { StatPage }         from '../stat/stat';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers : [ DashboardService ]
})

export class DashboardPage implements OnInit {
  public teams: Team[] = null;
  public games: Game[] = null;
  public selected_team: Team = null;
  public selected_game: Game = null;

  constructor(
    public navController: NavController,
    public dashboardService: DashboardService,
    public alertCtrl: AlertController,
    public platform : Platform ) { }

  manage_team ( _id ) {
    let id = ( typeof _id !== 'undefined' ) ? _id : null;
    this.navController.push( TeamPage, { _id: id } );
  };

  delete_team ( _id ) {
    this.notification( 'Supprimer cette équipe ?', 'Supprimer une équipe, supprime aussi ses joueurs, ses matchs et ses statistiques', 'Peu m\'importe',() => {
      this.dashboardService.delete_team( _id ).subscribe(
        res => {
          for (let key in this.teams) {
            if ( this.teams[key]._id === _id ) {
                this.teams.splice(Number(key), 1)
            }
          }
        },
        err => console.log(err)
      )
    })
  }

  select_team ( _team ) {
    if (( this.selected_team === _team ) || ( _team === null )) {
      this.selected_team = null;
    } else {
      this.selected_team = _team;
      this.dashboardService.get_games( this.selected_team._id ).subscribe(
        res => {
          this.games = res
          this.select_game( this.games[0] )
        },
        err => console.error(err)
      )
    }
  }

  /**
   * Store the game selected by the user
   * @param  {Game}   _game [description]
   */
  select_game ( _game: Game ) {
    if (( this.selected_game === _game ) || ( _game === null )) {
      this.selected_game = null;
    } else {
      this.selected_game = _game;
    }
  }

  manage_game ( _id ) {
    console.log(_id)
    if ( this.selected_team === null ) {
      this.notification('Création impossible', 'Il faut séléctionner une équipe', 'Got it', () => {});
    } else {
      this.navController.push( GamePage, {
        'team_id': this.selected_team._id,
        'game_id': this.selected_game ? this.selected_game._id : null
      });
    }
  }

  notification ( _title, _message, _btnLabel, _callback ) {
    this.alertCtrl.create({
      title: _title,
      message: _message,
      buttons: [{
          text: 'Annuler',
          role: 'cancel',
          handler: () => {}
        },{
          text: _btnLabel,
          handler: () => _callback()
        }
      ]
    }).present();
  }

  goto_stat ( _id ) {
    this.navController.push( StatPage, {
      team_id: this.selected_team._id,
      game_id: _id
    });
  }

  ngOnInit () {
    this.dashboardService.get_teams().subscribe(
      res => {
        this.teams = res;
        if (this.teams.length > 0) {
          this.select_team( this.teams[0] );

        }
      },
      err => console.error( err )
    )
  };
}
