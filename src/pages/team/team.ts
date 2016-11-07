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

  constructor (
    private navController: NavController,
    private navParams: NavParams,
    private platform: Platform,
    private formBuilder: FormBuilder,
    private teamService: TeamService) {}

  save ( value ) {
    this.teamService.save( value ).subscribe(
      res => this.get_team( res['_id'] ),
      err => console.error( err )
    )
  }

  get_team ( _team_id ) {
    this.teamService.get_team( _team_id ).subscribe(
      res => console.log(res),
      err => console.error(err)
    )
  }

  update_team ( _name, _coach ) { }

  create_team ( _name, _coach ) { }

  save_player ( value ) {
    if ( this.selected_player ) { // ++++++++++++++++++> Update player

    } else { // ++++++++++++++++++> Create player
      let player = value;
      player.team_id = this.team._id;
      this.teamService.create_player( player ).subscribe(
        res => console.log( res ),
        err => console.error( err )
      );
    }
  };

  select_player ( _player ) { }

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
      this.teamService.get_team( this.navParams.get('_id') ).subscribe(
        res => {
          this.team = res;
          this.teamForm.setValue({
            name: this.team.name,
            coach: this.team.coach || null
          });
        },
        err => console.error( err )
      );
    }
  }
}
