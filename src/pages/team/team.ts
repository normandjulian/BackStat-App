import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Player } from '../../classes/player.class';
import { TeamFull } from '../../classes/team.class';
import { TeamService } from './team-service';

@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
  providers: [TeamService]
})
export class TeamPage {
  public team_form = null;
  public playerForm: FormGroup;
  public isNew: Boolean = true;
  public team: TeamFull = null;
  public selected_player: Player = null;
  public fields: any = {
    'bSaveTeam': '',
    'bSavePlayer': ''
  };

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public fb: FormBuilder,
    public teamService: TeamService) { }

  /**
   * Save (update or create) the current team
   * @param  {[Object]} value [description]
   */
  // save_team(value) {
  //   console.log(value);
  //   // if (this.team['_id']) {
  //   //   this.teamService.update_team(value, this.team._id).subscribe(
  //   //     res => this.get_team(res['_id']),
  //   //     err => console.error(err)
  //   //   )
  //   // } else {
  //   //   this.teamService.create_team(value).subscribe(
  //   //     res => this.get_team(res['_id']),
  //   //     err => console.error(err)
  //   //   )
  //   // }
  // }

  /**
   * Set up the page
   * Get the team if there is a id else change the label
   * @param  {string} id [id of the team. Can be null/undefined]
   */
  set_up(id: string): void {
    if (id) {
      this.teamService.get_team(id).subscribe(
        res => {
          this.team = res;
          this.team_form.patchValue({
            'name': this.team.name,
            'coach': this.team.coach || null,
            'period': {
              'time': this.team.period.time,
              'type': this.team.period.type
            }
          });

          this.fields['bSaveTeam'] = 'Modifier l\'équipe';

          if (!!this.team.players) {
            this.select_player(this.team.players[0]);
          } else {
            this.select_player(null);
          }
        },
        err => console.error(err)
      );
    } else {
      this.fields['bSaveTeam'] = 'Créer une équipe';
    }
  }

  /**
   * Save the current player (create or update)
   * @param  {Player} _value [Data send by form]
   */
  save_player(_value: Player) {
    if (this.selected_player) { // ++++++++++++++++++> Update player
      let player = _value;
      player._id = this.selected_player._id;
      this.teamService.update_player(player).subscribe(
        res => {
          for (let key in this.team.players) {
            if (res._id === this.team.players[key]['_id']) {
              this.team.players[key] = res;
            }
          }
        },
        err => console.error(err)
      );
    } else { // ++++++++++++++++++> Create player
      let player = _value;
      player.team_id = this.team._id;
      this.teamService.create_player(player).subscribe(
        res => {
          this.team.players.push({
            _id: res._id,
            firstname: res.firstname,
            lastname: res.lastname,
            number: res.number,
            team_id: res.team_id
          });
          this.playerForm.setValue({
            firstname: null,
            lastname: null,
            number: null
          });
        },
        err => console.error(err)
      );
    }
  }

  select_player(_player) {
    if (!!_player) {
      this.selected_player = _player;
      this.playerForm.setValue({
        firstname: this.selected_player['firstname'],
        lastname: this.selected_player['lastname'],
        number: this.selected_player['number']
      });
      this.fields['bSavePlayer'] = 'Modifier le joueur';
    } else {
      this.selected_player = null;
      this.playerForm.setValue({
        firstname: '',
        lastname: '',
        number: ''
      });
      this.fields['bSavePlayer'] = 'Créer un joueur';
    }
  }

  ngOnInit() {
    // The form for the team
    this.team_form = this.fb.group({
      name: ['', [<any>Validators.required]],
      coach: ['', []],
      period: this.fb.group({
        type: [4, [<any>Validators.required]],
        time: [10, [<any>Validators.required]]
      }),
    });

    this.playerForm = this.fb.group({
      firstname: ['', [<any>Validators.required]],
      lastname: ['', [<any>Validators.required]],
      number: ['', [<any>Validators.required]]
    });

    this.set_up(this.navParams.get('_id'));
    // if (!!this.navParams.get('_id')) {
    //   this.get_team(this.navParams.get('_id'));
    // } else {
    //   this.fields['bSaveTeam'] = 'Créer une équipe';
    // }
  };
}
