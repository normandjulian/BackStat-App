import { Component,
         OnInit }         from '@angular/core';
import { NavController,
         NavParams }      from 'ionic-angular';
import { FormBuilder,
         FormGroup,
         Validators }     from '@angular/forms';
import { Game }           from '../../classes/game-class'
import { GameService }    from './game-service';

@Component({
  selector: 'game-page',
  templateUrl: 'game.html',
  providers: [ GameService ]
})

export class GamePage implements OnInit {
  public gameForm = null;
  public game : Game = {
    '_id'     : null,
    'opponent': null,
    'date'    : null,
    'home'    : null,
    'team_id' : null
  }
  public fields : any = {
    'bSaveGame' : ''
  };

  constructor (
    public navController: NavController,
    public navParams: NavParams,
    public gameService: GameService,
    public formBuilder: FormBuilder ) { }

    save_game ( _value ) {
      if ( this.game['_id'] ) {
        this.gameService.update_game( _value, this.game._id ).subscribe(
          res => this.get_game( res['_id'] ),
          err => console.error( err )
        )
      } else {
        this.gameService.create_game( _value ).subscribe(
          res => this.get_game( res['_id'] ),
          err => console.error( err )
        )
      }
    }

    update_game ( _opponent, _date ) {
      // this.backstatSrv.update_game( _opponent, _date )
      //   .then( res => {
      //     if ( res['error'] ) {
      //       console.log(res.message);
      //     } else {
      //       this.navController.pop();
      //     }
      //   })
    }

    get_game ( _id ) {}

    initFields ( _data ) {}

    ngOnInit () {
      this.gameForm = this.formBuilder.group({
          opponent  : ['', [<any>Validators.required]],
          date : ['', [<any>Validators.required]],
          home : ['']
      });

      if ( !!this.navParams.get('_id') ) {
        this.get_game( this.navParams.get('_id') );
      } else {
        this.initFields( null );
      }
    }
}
