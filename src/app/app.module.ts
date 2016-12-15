import { NgModule }             from '@angular/core';
import { IonicApp,
         IonicModule }          from 'ionic-angular';
import { MyApp }                from './app.component';
import { BackstatService }      from '../providers/backstat-service';
import { FormsModule,
         ReactiveFormsModule }  from '@angular/forms';
import { HttpModule }           from '@angular/http';

// pages
import { HomePage }             from '../pages/home/home';
import { DashboardPage }        from '../pages/dashboard/dashboard';
import { TimerComponent }       from '../pages/timer/timer';
import { LoginPage }                from '../pages/login/login';
import { RegisterPage }         from '../pages/register/register';
import { TeamPage }             from '../pages/team/team';
import { GamePage }             from '../pages/game/game';
import { StatPage }             from '../pages/stat/stat';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    DashboardPage,
    TeamPage,
    GamePage,
    StatPage,
    TimerComponent
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
    LoginPage,
    RegisterPage,
    HomePage,
    DashboardPage,
    TeamPage,
    GamePage,
    StatPage,
    TimerComponent
  ],
  providers: [
    BackstatService
  ]
})
export class AppModule {}
