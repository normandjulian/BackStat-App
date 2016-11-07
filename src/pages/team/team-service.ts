import { Injectable }       from '@angular/core';
import { Http,
         Headers,
         RequestOptions,
         Response }         from '@angular/http';
import { Observable }       from 'rxjs/Rx';
import { BackstatService }  from '../../providers/backstat-service'
import { TeamFull }         from '../../classes/team-full-class';
import { Player }           from '../../classes/player.class'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TeamService {
  private URI     : string = "http://127.0.0.1:3000/api";
  private headers : Object = { 'Content-Type': 'application/json' }
  constructor(
    private http: Http,
    private backstatService : BackstatService ) { }

  save ( team ): Observable<Object> {
    let body = { name: team.name, coach: team.coach || null }
    let headers = new Headers({ 'x-access-token': this.backstatService.get_token() });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.URI}/teams`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get_team ( _team_id ): Observable<TeamFull> {
    let headers = new Headers({ 'x-access-token': this.backstatService.get_token() });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.URI}/teams/${_team_id}/players`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  create_player ( _player ): Observable<Player> {
    let headers = new Headers({ 'x-access-token': this.backstatService.get_token() });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.URI}/players`, _player, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
