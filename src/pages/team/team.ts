import { Component }      from '@angular/core';
import { NavController,
         Platform,
         NavParams }      from 'ionic-angular';
import { FormBuilder,
         FormGroup,
         FormControl,
         Validators }     from '@angular/forms';
import { TeamService }    from './team-service';
import { TeamFull }       from '../../classes/team-full-class'
import { Player }         from '../../classes/player.class'

@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
  providers: [ TeamService ]
})

export class Team {
  private teamForm        : FormGroup;
  private playerForm      : FormGroup;
  private isNew           : Boolean = true;
  private team            : TeamFull = {
    '_id'     : null,
    'name'    : null,
    'coach'   : null,
    'players' : null
  };
  private selected_player : Player = null;
  private fields          : Object = {
    'bSaveTeam' : '',
    'bSavePlayer' : ''
  };

  constructor (
    private navController: NavController,
    private navParams: NavParams,
    private platform: Platform,
    private formBuilder: FormBuilder,
    private teamService: TeamService) {}

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

  get_team ( _team_id ) {
    this.teamService.get_team( _team_id ).subscribe(
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
    } else {
      this.fields['bSaveTeam'] = 'Créer une équipe';
    }
  }

  update_team ( _name, _coach ) { }

  create_team ( _name, _coach ) { }

  save_player ( value ) {
    if ( this.selected_player ) { // ++++++++++++++++++> Update player

    } else { // ++++++++++++++++++> Create player
      let player = value;
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
  }
}
