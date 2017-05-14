import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
  public headers: Object = { 'Content-Type': 'application/json' }
  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig) { }

  sign_in(guest): Observable<Object> { //+++++++++++++++++++++++++++++++++++++++++++++++++> Sign in
    let headers = new Headers(this.headers);
    let options = new RequestOptions({ headers: headers });
    let body = {
      'email': guest.email,
      'password': guest.password
    };

    return this.http.post(`${this.config.apiEndpoint}signin`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
