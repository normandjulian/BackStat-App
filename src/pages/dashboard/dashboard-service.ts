import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { Injectable, Inject } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Team } from '../../classes/team.class';
import { Game } from '../../classes/game.class';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { TEAMS } from '../../mocks/teams.mock';
import { GAMES } from '../../mocks/games.mock';

@Injectable()
export class DashboardService {
  public headers: Object = { 'Content-Type': 'application/json' };
  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig) { }

  get_teams(): Observable<Team[]> {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    if (this.config.network) {
      return this.http.get(`${this.config.apiEndpoint}teams`, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
    } else {
      return Observable.of(TEAMS);
    }
  }

  delete_team(_id: String) {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`${this.config.apiEndpoint}teams/${_id}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  get_games(team_id: String): Observable<Game[]> {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });
    if (this.config.network) {
      return this.http.get(`${this.config.apiEndpoint}teams/${team_id}/games`, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
    } else {
      let games = GAMES.filter(game => {
        return game.team_id === team_id;
      });
      return Observable.of(games);
    }
  }
}
