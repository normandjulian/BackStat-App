import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { Injectable, Inject } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Stat } from '../../classes/stat.class';
import { Player } from '../../classes/player.class';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StatService {
  public headers: Object = { 'Content-Type': 'application/json' };
  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig) { }

  // TODO
  create_stat(stat: Stat): Observable<Stat> {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.config.apiEndpoint}stats`, stat, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // TO REMOVE ?
  update_stat(_stat: Stat): Observable<Stat> {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${this.config.apiEndpoint}stats/${_stat._id}`, _stat, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get_players(_team_id: String): Observable<Player[]> {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.config.apiEndpoint}teams/${_team_id}/players`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
