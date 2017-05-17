import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { Injectable, Inject } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions,
  Response
} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Game } from '../../classes/game.class';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GameService {
  public headers: Object = { 'Content-Type': 'application/json' };
  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig) { }

  create_game(game: Game): Observable<Game> {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.config.apiEndpoint}games`, game, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  update_game(_game: Game): Observable<Game> {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${this.config.apiEndpoint}games/${_game._id}`, _game, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get_game(_game_id: String): Observable<Game> {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.config.apiEndpoint}games/${_game_id}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
