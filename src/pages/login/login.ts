import { Component, OnInit}   from '@angular/core';
import { NavController,
  Platform,
  AlertController,
  NavParams }                 from 'ionic-angular';
import { Register }           from '../register/register';
import { DashboardPage }      from '../dashboard/dashboard';
import { LoginService }       from './login-service'
import { Guest }              from '../../classes/guest-class';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ LoginService ]
})

export class Login implements OnInit {
  public user: any;
  public isLogged: Boolean = false;
  public guest: Guest = null;

  constructor (
    public platform: Platform,
    public navController: NavController,
    public loginService: LoginService,
    public alertCtrl: AlertController,
    public navParams: NavParams ) {

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
    if ((!!this.guest.email) || (!!this.guest.password)) {
      this.loginService.sign_in({ email: this.guest.email, password: this.guest.password })
        .subscribe(
          res => {
            if ( res['error'] ) {
              this.notification(res['message']);
            } else {
              localStorage.setItem('user', JSON.stringify(res));
              this.navController.push( DashboardPage );
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
    if ( typeof this.navParams.get('email') !== 'undefined' ) {
      this.guest['email'] = this.navParams.get('email')
    }
  }
}
