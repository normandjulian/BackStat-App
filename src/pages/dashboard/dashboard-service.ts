import { Injectable }       from '@angular/core';
import { Http,
         Headers,
         RequestOptions,
         Response }         from '@angular/http';
import { Observable }       from 'rxjs/Rx';
import { BackstatService }  from '../../providers/backstat-service';
import { TeamInt }          from '../../classes/team-class';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DashboardService {
  private URI     : string = "http://127.0.0.1:3000/api";
  private headers : Object = { 'Content-Type': 'application/json' }
  constructor(
    private http: Http,
    private backstatService : BackstatService ) { }

  get_teams() : Observable<TeamInt[]> {
    let headers = new Headers({ 'x-access-token': this.backstatService.get_token() });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.URI}/teams`, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
   }
}
