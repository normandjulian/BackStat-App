import { Injectable }       from '@angular/core';
import { Http,
         Headers,
         RequestOptions,
         Response }         from '@angular/http';
import { Observable }       from 'rxjs/Rx';
import { TeamFull }         from '../../classes/team-full-class';
import { Player }           from '../../classes/player.class'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TeamService {
  public URI     : string = "http://127.0.0.1:3000/api";
  public headers : Object = { 'Content-Type': 'application/json' }
  constructor( public http: Http ) { }

  create_team ( team ): Observable<Object> {
    let body = { name: team.name, coach: team.coach || null }
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.URI}/teams`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  update_team ( _team, _id ): Observable<TeamFull> {
    let body = { name: _team.name, coach: _team.coach || null }
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${this.URI}/teams/${_id}`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  get_team ( _team_id ): Observable<TeamFull> {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.URI}/teams/${_team_id}/players`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  create_player ( _player ): Observable<Player> {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.URI}/players`, _player, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * Update the player with its new datas
   * @param  {Player}             _player [description]
   * @return {Observable<Player>}         [description]
   */
  update_player ( _player: Player ): Observable<Player> {
    let headers = new Headers({ 'x-access-token': JSON.parse(localStorage.getItem('user')).token });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${this.URI}/players/${_player._id}`, _player, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
