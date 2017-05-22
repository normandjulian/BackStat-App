import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';
import { DashboardPage } from '../dashboard/dashboard';
import { LoginService } from './login-service';

import { Guest } from '../../classes/user.class';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})

export class LoginPage implements OnInit {
  public user: Guest;
  public isLogged: Boolean = false;
  public login_form: any = null;
  public toStore: boolean = false;

  constructor(public navCtrl: NavController, public storage: Storage, public loginService: LoginService, public alertCtrl: AlertController, public fb: FormBuilder, public modalCtrl: ModalController, public navParams: NavParams) { }

  /**
  * Display a notification to the layout
  * @param  {string} message [The message to display]
  */
  notification(message: string): void {
    this.alertCtrl.create({
      title: 'Information',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  /**
  * Login to the application
  * @param  {Guest}  guest [The pair login/password]
  */
  sign_in(guest: Guest): void {
    this.loginService.sign_in(guest).subscribe(
      res => {
        if (res['error']) {
          this.notification(res['message']);
        } else {
          this.storage.set('credits', JSON.stringify(res));
          this.navCtrl.setRoot(DashboardPage);
        }
      },
      err => console.error(err)
    );
  }

  /**
  * Redirect to the page Register
  */
  goto_registerPage(): void {
    this.modalCtrl.create(RegisterPage).present();
  }

  save_credits() {
    // TODO
  }

  lf_credits_storage() {
    this.storage.get('credits').then(res => {
      if (res) {
        let user = JSON.parse(res);
        // this.sign_in({
        //   'email': user.email,
        //   'password': user.password
        // });
      }
    });
  }

  /**
  * Initialisation of the page
  */
  ngOnInit() {
    this.login_form = this.fb.group({
      email: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]]
    });

    // Check the storage for auto signin
    this.lf_credits_storage();

this.modalCtrl.create(RegisterPage).present();

    // Get the email from the RegisterPage
    if (typeof this.navParams.get('email') !== 'undefined') {
      this.login_form.setValue({
        email: this.navParams.get('email')
      });
    }
  }
}
