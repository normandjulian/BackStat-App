import { Component, OnInit }  from '@angular/core';
import { NavController,
         AlertController }    from 'ionic-angular';
import { RegisterService }    from './register-service'
import { FormBuilder,
         FormGroup,
         FormControl,
         Validators }         from '@angular/forms';
import { Login }              from '../login/login';

@Component({
  templateUrl: 'register.html',
  providers: [ RegisterService ]
})

export class Register implements OnInit {
  private clubs         : Array<Object> = [];
  private selectedClub  : Object = null;
  private submitted     : boolean;
  private registerForm  : FormGroup;

  constructor (
    private navController: NavController,
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController ) {
      this.registerService.get_clubs().then(
          res => this.clubs = res,
          error => console.log(error)
        )
    };

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        email     : ['', [<any>Validators.required]],
        lastname  : ['', [<any>Validators.required]],
        firstname : ['', [<any>Validators.required]],
        fstpwd    : ['', [<any>Validators.required]],
        scdpwd    : ['', [<any>Validators.required]],
        club      : ['', [<any>Validators.required]]
    });
  }

  sign_up (value, isValid) {
    if ( this.validatePassword(value.fstpwd, value.scdpwd) ) {
      this.registerService.sign_up( value )
        .then(
          res => {
            if (res['message']) {
              console.warn(res['message']);
            } else {
              console.info('Acounte created');
              this.navController.push( Login, {
                email : value.email
              });
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
}
