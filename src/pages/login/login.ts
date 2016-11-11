import { Component, OnInit}   from '@angular/core';
import { NavController,
  Platform,
  AlertController,
  NavParams }                 from 'ionic-angular';
import { BackstatSrv }        from '../../providers/backstat/backstat';
import { HomePage }           from '../home/home';
import { Register }           from '../register/register';
import { Dashboard }          from '../dashboard/dashboard';
import { LoginService }       from './login-service'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ LoginService ]
})
export class Login implements OnInit {
  private user: any;
  private isLogged: Boolean = false;
  private guest: Object = {};

  constructor (
    private platform: Platform,
    private navController: NavController,
    private loginService: LoginService,
    private alertCtrl: AlertController,
    private navParams: NavParams ) {

      platform.ready().then(() => {
        this.guest = { email : 'normandjulian@gmail.com', password: 'julian'};
        this.sign_in();
      });
  }

  notification ( _message ) {
    let alert = this.alertCtrl.create({
      title: 'Information',
      subTitle: _message,
      buttons: ['OK']
    });
    alert.present();
  }

  sign_in ( ) {
    if ((!!this.guest['email']) || (!!this.guest['password'])) {
      this.loginService.sign_in({ email: this.guest['email'], password: this.guest['password'] })
        .then(
          res => {
            if ( res['error'] ) {
              this.notification(res.message);
            } else {
              this.loginService.set_user( res );
              this.navController.push( Dashboard );
            }
          },
          err => console.error( err )
        );
    }
  }

  goto_signup () {
    this.navController.push( Register );
  }

  save_credits () {
    // TODO
    console.log('TODO');
  }

  ngOnInit() {
    // this.guest.email = this.navParams.get('email');
    if ( typeof this.navParams.get('email') !== 'undefined' ) {
      this.guest['email'] = this.navParams.get('email')
    }
  }
}
