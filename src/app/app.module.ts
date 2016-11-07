import { NgModule }             from '@angular/core';
import { IonicApp,
         IonicModule }          from 'ionic-angular';
import { MyApp }                from './app.component';
import { BackstatService }      from '../providers/backstat-service';
import { FormsModule,
         ReactiveFormsModule }  from '@angular/forms';
import { RouterModule }         from '@angular/router';
import { HttpModule }           from '@angular/http';

// pages
import { HomePage }             from '../pages/home/home';
import { Dashboard }            from '../pages/dashboard/dashboard';
import { TimerComponent }       from '../pages/timer/timer';
import { Login }                from '../pages/login/login';
import { Register }             from '../pages/register/register';
import { Team }                 from '../pages/team/team';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Register,
    HomePage,
    Dashboard,
    Team
  ],
  imports: [
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Register,
    HomePage,
    Dashboard,
    Team
  ],
  providers: [
    BackstatService
  ]
})
export class AppModule {}
