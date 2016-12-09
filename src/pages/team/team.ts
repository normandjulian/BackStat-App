import { Component }      from '@angular/core';
import { NavController,
         Platform,
         NavParams }      from 'ionic-angular';
import { FormBuilder,
         FormGroup,
         Validators }     from '@angular/forms';
import { TeamService }    from './team-service';
import { TeamFull }       from '../../classes/team-full.class'
import { Player }         from '../../classes/player-class'

@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
  providers: [ TeamService ]
})

export class TeamPage {
  public teamForm = null;
  public playerForm      : FormGroup;
  public isNew           : Boolean = true;
  public team            : TeamFull = {
    '_id'     : null,
    'name'    : null,
    'coach'   : null,
    'players' : null
  };
  public selected_player : Player = null;
  public fields          : any = {
    'bSaveTeam' : '',
    'bSavePlayer' : ''
  };

  constructor (
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public formBuilder: FormBuilder,
    public teamService: TeamService) {}

  /**
   * Save (update or create) the current team
   * @param  {[Object]} value [description]
   */
  save_team ( value ) {
    if ( this.team['_id'] ) {
      this.teamService.update_team( value, this.team._id ).subscribe(
        res => this.get_team( res['_id'] ),
        err => console.error( err )
      )
    } else {
      this.teamService.create_team( value ).subscribe(
        res => this.get_team( res['_id'] ),
        err => console.error( err )
      )
    }
  }

  get_team ( _id ) {
    this.teamService.get_team( _id ).subscribe(
      res => this.initFields( res ),
      err => console.error( err )
    )
  }

  initFields ( _data ) {
    if ( !!_data ) {
      this.team = _data;
      this.teamForm.setValue({
        name: this.team.name,
        coach: this.team.coach || null
      });
      this.fields['bSaveTeam'] = 'Modifier l\'équipe';
      if ( !!this.team.players ) {
        this.select_player( this.team.players[0] );
      } else {
        this.select_player( null );
      }
    } else {
      this.fields['bSaveTeam'] = 'Créer une équipe';
    }
  }

  /**
   * Save the current player (create or update)
   * @param  {Player} _value [Data send by form]
   */
  save_player ( _value : Player ) {
    if ( this.selected_player ) { // ++++++++++++++++++> Update player
      let player = _value;
      player._id = this.selected_player._id;
      this.teamService.update_player( player ).subscribe(
        res => {
          for (let key in this.team.players ) {
            if (res._id === this.team.players[key]['_id']) {
              this.team.players[key] = res;
            }
          }
        },
        err => console.error(err)
      )
    } else { // ++++++++++++++++++> Create player
      let player = _value;
      player.team_id = this.team._id;
      this.teamService.create_player( player ).subscribe(
        res => {
          this.team.players.push({
            _id       : res._id,
            firstname : res.firstname,
            lastname  : res.lastname,
            number    : res.number,
            team_id   : res.team_id
          })
          this.playerForm.setValue({
            firstname : null,
            lastname  : null,
            number    : null
          });
        },
        err => console.error( err )
      );
    }
  };

  select_player ( _player ) {
    if ( !!_player ) {
      this.selected_player = _player;
      this.playerForm.setValue({
        firstname : this.selected_player['firstname'],
        lastname  : this.selected_player['lastname'],
        number    : this.selected_player['number']
      });
      this.fields['bSavePlayer'] = 'Modifier le joueur';
    } else {
      this.selected_player = null;
      this.playerForm.setValue({
        firstname : '',
        lastname  : '',
        number    : ''
      });
      this.fields['bSavePlayer'] = 'Créer un joueur';
    }

  }

  change_mode ( ) { // ++++++++++++++++++++++++++++++++++++++++++> Mode [Create]

  };

  ngOnInit() {
    this.teamForm = this.formBuilder.group({
        name  : ['', [<any>Validators.required]],
        coach : ['', []]
    });
    this.playerForm = this.formBuilder.group({
        firstname  : ['', [<any>Validators.required]],
        lastname : ['', [<any>Validators.required]],
        number : ['', [<any>Validators.required]]
    });

    if ( !!this.navParams.get('_id') ) {
      this.get_team( this.navParams.get('_id') );
    } else {
      this.initFields( null );
    }
  };
}
