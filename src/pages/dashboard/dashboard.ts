import { AlertController, NavController, Platform, ModalController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard-service';
import { Game } from '../../classes/game.class';
import { GamePage } from '../game/game';
import { StatPage } from '../stat/stat';
import { Team } from '../../classes/team.class';
import { TeamPage } from '../team/team';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [DashboardService]
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
    public modalCtrl: ModalController,
    public platform: Platform) { }

  /**
   * Nav to the team-page
   * id is the id of the team.
   * If it's null, it's a creation mode else it's update mode
   */
  goto_teamPage(id: string) {
    this.modalCtrl.create(TeamPage, {
      _id: id || null
    }).present();
  };

  delete_team(_id) {
    this.notification('Supprimer cette équipe ?', 'Supprimer une équipe, supprime aussi ses joueurs, ses matchs et ses statistiques', 'Peu m\'importe', () => {
      this.dashboardService.delete_team(_id).subscribe(
        res => {
          for (let key in this.teams) {
            if (this.teams[key]._id === _id) {
              this.teams.splice(Number(key), 1)
            }
          }
        },
        err => console.log(err)
      )
    })
  }

  /**
   * Select the team which the user tap on it
   */
  select_team(team: Team) {
    if ((this.selected_team === team) || (team === null)) {
      this.selected_team = null;
    } else {
      this.selected_team = team;
      // this.dashboardService.get_games(this.selected_team._id).subscribe(
      //   res => {
      //     this.games = res
      //     this.select_game(this.games[0])
      //   },
      //   err => console.error(err)
      // )
      this.games = [{
        "_id": "5856b947c5242563c5a4cfbc",
        "opponent": "Cholet",
        "date": new Date("2016-01-01T00:00:00.000Z"),
        "home": true,
        "team_id": "5856b7bd80affe631645e390",
      }];
      this.select_game(this.games[0]);
    }
  }

  /**
   * Store the game selected by the user
   * @param  {Game}   _game [description]
   */
  select_game(game: Game) {
    if ((this.selected_game === game) || (game === null)) {
      this.selected_game = null;
    } else {
      this.selected_game = game;
    }
  }

  /**
   * Nav to the game-page
   * id is the id of the team.
   * If it's null, it's a creation mode else it's update mode
   */
  goto_gamePage(id: string) {
    if (!this.selected_team) {
      this.notification('Création impossible', 'Il faut séléctionner une équipe', 'Got it', () => { });
    } else {
      // Launch the modal of the team-page
      this.modalCtrl.create(GamePage, {
        'team_id': this.selected_team._id,
        'game_id': id || null
      }).present();
    }
  }

  notification(_title, _message, _btnLabel, _callback) {
    this.alertCtrl.create({
      title: _title,
      message: _message,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => { }
        }, {
          text: _btnLabel,
          handler: () => _callback()
        }
      ]
    }).present();
  }

  goto_stat(_id) {
    this.navController.push(StatPage, {
      team_id: this.selected_team._id,
      game_id: _id
    });
  }

  ngOnInit() {
    // this.dashboardService.get_teams().subscribe(
    //   res => {
    //     this.teams = res;
    //     if (this.teams.length > 0) {
    //       this.select_team( this.teams[0] );

    //     }
    //   },
    //   err => console.error( err )
    // )

    this.teams = [
      {
        "_id": "5856b7bd80affe631645e390",
        "name": "Seniors 2",
        "coach": "BoBi",
      },
      {
        "_id": "5856b8f2bd6c1763b20faef5",
        "name": "Seniors 1",
        "coach": "Juju",
      }
    ];
    this.select_team(this.teams[0]);
  };
}
