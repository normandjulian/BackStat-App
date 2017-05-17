import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Game } from '../../classes/game.class';
import { GameService } from './game-service';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'game-page',
  templateUrl: 'game.html',
  providers: [GameService]
})
export class GamePage implements OnInit {
  public team_id: string = null;
  public gameForm = null;
  public game: Game = {
    '_id': null,
    'opponent': null,
    'date': null,
    'home': null,
    'team_id': null
  };
  public fields: any = {
    'bSaveGame': ''
  };

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public gameService: GameService,
    public fb: FormBuilder) { }

  /**
   * Save the current game (create or update)
   * @param  {Game} _game [Data send by form]
   */
  save_game(_game: Game) {
    if (this.game['_id']) { // ++++++++++++> Update
      _game._id = this.game['_id'];
      _game.team_id = this.game['team_id'];

      this.gameService.update_game(_game).subscribe(
        res => this.set_up(res),
        err => console.error(err)
      );
    } else {  // ++++++++++++++++++++++++++++> Create
      let game = _game;
      game.team_id = this.team_id;
      game.home = !!game.home;
      this.gameService.create_game(_game).subscribe(
        res => this.set_up(res),
        err => console.error(err)
      );
    }
  }

  /**
   * Setup the form
   * @param  {Game}   _game [description]
   */
  set_up(game: Game) {
    // Get the team_id
    this.team_id = game.team_id;

    // In update way
    if (!!game._id) {
      this.gameService.get_game(game._id).subscribe(
        res => {
          this.fields['bSaveGame'] = 'Modifier le match';
          this.game = res;
          this.gameForm.setValue({
            opponent: this.game.opponent,
            date: this.game.date,
            home: this.game.home
          });
        },
        err => console.error(err)
      );
    } else {
      this.fields['bSaveGame'] = 'Créer un match';
    }
  }

  ngOnInit() {
    this.gameForm = this.fb.group({
      opponent: ['', [<any>Validators.required]],
      date: ['', [<any>Validators.required]],
      home: [''],
      period: this.fb.group({
        type: [4, [<any>Validators.required]],
        time: [10, [<any>Validators.required]]
      })
    });

    this.set_up({
      _id: this.navParams.get('game_id'),
      team_id: this.navParams.get('team_id')
    });
  }
}
