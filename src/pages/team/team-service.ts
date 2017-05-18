import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import {
  Http,
  Headers,
  RequestOptions,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { TeamFull } from '../../classes/team.class';
import { Player } from '../../classes/player.class';

import { TEAMSFULL } from '../../mocks/teams.mock';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TeamService {
  public headers: Object = { 'Content-Type': 'application/json' };
  public token: string = null;

  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig, public storage: Storage) {
    // Get the token in the ionic storage
    storage.ready().then(() => {
      storage.get('credits').then(res => {
        if (res) {
          let user = JSON.parse(res);
          this.token = user.token;
        }
      });
    });
  }

  create_team(team): Observable<Object> {
    let body = { name: team.name, coach: team.coach || null };
    let headers = new Headers({ 'x-access-token': this.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.config.apiEndpoint}/teams`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  update_team(_team, _id): Observable<TeamFull> {
    let body = { name: _team.name, coach: _team.coach || null };
    let headers = new Headers({ 'x-access-token': this.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${this.config.apiEndpoint}/teams/${_id}`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * Get the actual team selected by the user
   * @param  {string}               team_id [the id of the team selected]
   * @return {Observable<TeamFull>}         [the team selected]
   */
  get_team(team_id: string): Observable<TeamFull> {
    let headers = new Headers({ 'x-access-token': this.token });
    let options = new RequestOptions({ headers: headers });

    if (this.config.network) {
      return this.http.get(`${this.config.apiEndpoint}/teams/${team_id}/full`, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    } else {
      let team = TEAMSFULL.find(team => {
        return team._id === team_id;
      });
      return Observable.of(team);
    }
  }

  create_player(_player): Observable<Player> {
    let headers = new Headers({ 'x-access-token': this.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.config.apiEndpoint}/players`, _player, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * Update the player with its new datas
   * @param  {Player}             _player [description]
   * @return {Observable<Player>}         [description]
   */
  update_player(_player: Player): Observable<Player> {
    let headers = new Headers({ 'x-access-token': this.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${this.config.apiEndpoint}/players/${_player._id}`, _player, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
