import { Inject, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { Observable } from 'rxjs/Rx';

import { Club } from '../../classes/club.class';
import { RegisterUser } from '../../classes/user.class';

@Injectable()
export class RegisterService {
  public headers: Object = { 'Content-Type': 'application/json' };
  constructor(
    public http: Http,
    @Inject(APP_CONFIG) private config: IAppConfig) { }

  get_clubs(): Observable<Club[]> { // ++++++++++++++++++++++++++++++++++++++++++++++++++++++> Get Clubs
    let headers = new Headers(this.headers);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.config.apiEndpoint}clubs`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };

  sign_up(guest: RegisterUser): Observable<Object> { // +++++++++++++++++++++++++++++++++++++++++++++++++> Sign up
    let headers = new Headers(this.headers);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.config.apiEndpoint}signup`, guest, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
