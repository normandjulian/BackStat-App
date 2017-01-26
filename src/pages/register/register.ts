import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { RegisterService } from './register-service'
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'register.html',
  providers: [ RegisterService ]
})

export class RegisterPage implements OnInit {
  public clubs         : Array<Object> = [];
  public selectedClub  : Object = null;
  public submitted     : boolean;
  public registerForm = null;

  constructor (
    public navController: NavController,
    public registerService: RegisterService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController ) { };

  sign_up (value, isValid) {
    if ( this.validatePassword(value.fstpwd, value.scdpwd) ) {
      this.registerService.sign_up( value )
        .then(
          res => {
            if (res['message']) {
              console.warn(res['message']);
            } else {
              console.info('Acounte created');
              this.navController.push( LoginPage );
            }
          },
          error => {
            console.error(error);
          },
      );
    } else {
      this.notification('Vos mots de passes ne correspondent pas')
    }
  }

  validatePassword ( p1, p2 ) {
    return p1 === p2;
  }

  notification ( _message ) {
    let alert = this.alertCtrl.create({
      title: 'Information',
      subTitle: _message,
      buttons: ['OK']
    });
    alert.present();
  }

  ngOnInit() {
    this.registerService.get_clubs().then(
        res => this.clubs = res,
        error => console.log(error)
      );

    this.registerForm = this.formBuilder.group({
        email     : ['', [<any>Validators.required]],
        lastname  : ['', [<any>Validators.required]],
        firstname : ['', [<any>Validators.required]],
        fstpwd    : ['', [<any>Validators.required]],
        scdpwd    : ['', [<any>Validators.required]],
        club      : ['', [<any>Validators.required]]
    });
  }
}
