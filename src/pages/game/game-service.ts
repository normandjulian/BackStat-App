import { Injectable }       from '@angular/core';
import { Http,
         Headers,
         RequestOptions,
         Response }         from '@angular/http';
import { Observable }       from 'rxjs/Rx';
import { Game }          from '../../classes/game-class';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GameService {
  public URI     : string = "http://127.0.0.1:3000/api";
  public headers : Object = { 'Content-Type': 'application/json' }
  constructor( public http: Http ) { }

  create_game ( game: Game ): Observable<Game> {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.URI}/games`, game, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  update_game ( _game: Game): Observable<Game> {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${this.URI}/games/${_game._id}`, _game, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get_game ( _game_id: String ): Observable<Game> {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.URI}/games/${_game_id}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
