import { Component, OnInit} from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { DashboardPage } from '../dashboard/dashboard';
import { LoginService } from './login-service'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ LoginService ]
})

export class LoginPage implements OnInit {
  public user: any;
  public isLogged: Boolean = false;
  public loginForm = null;

  constructor (
    public navController: NavController,
    public loginService: LoginService,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public navParams: NavParams ) { }

  notification ( _message ) {
    let alert = this.alertCtrl.create({
      title: 'Information',
      subTitle: _message,
      buttons: ['OK']
    });
    alert.present();
  }

  sign_in ( value : any ) {
    this.loginService.sign_in({ email: value.email, password: value.password })
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

  goto_signup () {
    this.navController.push( RegisterPage );
  }

  save_credits () {
    // TODO
    console.log('TODO');
  }

  /**
   * Initialisation of the page
   */
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email     : ['', [<any>Validators.required]],
        password  : ['', [<any>Validators.required]]
    });
    this.sign_in({ email : 'maelle.skwara@gmail.com', password: 'maelle'});

    // if ( typeof this.navParams.get('email') !== 'undefined' ) {
    //   this.loginForm.setValue({
    //     email : this.navParams.get('email')
    //   });
    // }
  }
}
