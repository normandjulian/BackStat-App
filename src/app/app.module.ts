import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { BackstatService } from '../providers/backstat-service';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

// pages
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { TimerComponent } from '../pages/timer/timer';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { TeamPage } from '../pages/team/team';
import { GamePage } from '../pages/game/game';
import { StatPage } from '../pages/stat/stat';
import { ListStatsComponent } from '../pages/stat/list-stats/list-stats.component';

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
    TimerComponent,
    ListStatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    TimerComponent,
    ListStatsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BackstatService
  ]
})
export class AppModule { }
