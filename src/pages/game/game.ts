import { Component }                from '@angular/core';
import { NavController, Platform }  from 'ionic-angular';
// import { BackstatSrv }              from '../../providers/backstat/backstat';
import { Game }                     from '../../classes/game.int'

@Component({
  templateUrl: 'game.html',
})
export class GamePage {
  private game_opponent:  String;
  private game_date:      Date;
  private game_home:      Boolean;
  private selected_game:  Game = null;

  constructor (
    private navController: NavController,
    // private backstatSrv: BackstatSrv,
    private platform: Platform ) {
      platform.ready().then(() => {
          // this.selected_game = this.backstatSrv.get_selected_game();

          if ( !!this.selected_game ) {
            this.game_opponent  = this.selected_game.opponent;
            this.game_date = this.selected_game.date;
            this.game_home = this.selected_game.home;
          }
      });
    }


    save_game () {
      if (( !!this.game_opponent ) || ( !!this.game_date )) {
        if (!!this.selected_game) { // +++++++++++++++++++++++++++++++++> Mode [Update]
          // this.backstatSrv.update_game( _opponent, _date )
          //   .then( res => {
          //     if ( res['error'] ) {
          //       console.log(res.message);
          //     } else {
          //       this.navController.pop();
          //     }
          //   })
        } else { // ++++++++++++++++++++++++++++++++++++++++++++++++++> Mode [Create]
          // this.backstatSrv.create_game( this.game_opponent, this.game_date, this.game_home )
          //   .then( res => {
          //     if ( res['error'] ) {
          //       console.log(res.message);
          //     } else {
          //       this.navController.pop();
          //     }
          //   });
        }
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
}
