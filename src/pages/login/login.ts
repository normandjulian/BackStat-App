import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { DashboardPage } from '../dashboard/dashboard';
import { LoginService } from './login-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})

export class LoginPage implements OnInit {
  public user: any;
  public isLogged: Boolean = false;
  public login_form: any = null;

  constructor(
    public navController: NavController,
    public loginService: LoginService,
    public alertCtrl: AlertController,
    public fb: FormBuilder,
    public modalCtrl: ModalController,
    public navParams: NavParams) { }

  notification(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Information',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  sign_in(value: any) {
    this.loginService.sign_in({ email: value.email, password: value.password }).subscribe(
      res => {
        if (res['error']) {
          this.notification(res['message']);
        } else {
          localStorage.setItem('user', JSON.stringify(res));
          this.navController.push(DashboardPage);
        }
      },
      err => console.error(err)
    );
  }

  goto_registerPage() {
    this.modalCtrl.create(RegisterPage).present();
  }

  save_credits() {
    // TODO
  }

  /**
   * Initialisation of the page
   */
  ngOnInit() {
    this.login_form = this.fb.group({
      email: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]]
    });
    // this.sign_in({ email : 'maelle.skwara@gmail.com', password: 'maelle'});

    if (typeof this.navParams.get('email') !== 'undefined') {
      this.login_form.setValue({
        email: this.navParams.get('email')
      });
    }
  }
}
