import { Injectable }       from '@angular/core';
import { Http,
         Headers,
         RequestOptions,
         Response }         from '@angular/http';
import { Observable }       from 'rxjs/Rx';
import { Team }             from '../../classes/team-class';
import { Game }             from '../../classes/game-class';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DashboardService {
  public URI     : string = "http://127.0.0.1:3000/api";
  public headers : Object = { 'Content-Type': 'application/json' }
  constructor( public http: Http ) { }

  get_teams() : Observable<Team[]> {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.URI}/teams`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  delete_team( _id: String ) {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`${this.URI}/teams/${_id}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  get_games( team_id: String) : Observable<Game[]> {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.URI}/teams/${team_id}/games`, options)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
}
