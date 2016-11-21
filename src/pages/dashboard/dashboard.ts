import { Component,
         OnInit }           from '@angular/core';
import { NavController,
         AlertController,
         Platform }         from 'ionic-angular';
import { DashboardService } from './dashboard-service';
import { Team }             from '../../classes/team-class';

import { TeamPage }         from '../team/team';
import { GamePage }         from '../game/game';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers : [ DashboardService ]
})

export class DashboardPage implements OnInit {
  public teams: Team[] = null;
  public games;
  public selected_team: Team = null;

  constructor(
    public navController: NavController,
    public dashboardService: DashboardService,
    public alertCtrl: AlertController,
    public platform : Platform ) { }

  ngOnInit () {
    this.dashboardService.get_teams().subscribe(
      res => this.teams = res,
      err => console.error( err )
    )
  };

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
    }
  }

  manage_game ( _id ) {
    if ( this.selected_team === null ) {
      this.notification('Création impossible', 'Il faut séléctionner une équipe', 'Got it', () => {});
    } else {
      let id = ( typeof _id !== 'undefined' ) ? _id : null;
      this.navController.push( GamePage, { _id: id } );
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
}
