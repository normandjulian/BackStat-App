import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Guest } from '../../classes/user.class';
import { USERS } from '../../mocks/users.mock';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
  public headers: Object = { 'Content-Type': 'application/json' };
  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig) { }

  sign_in(guest: Guest): Observable<Object> { // +++++++++++++++++++++++++++++++++++++++++++++++++> Sign in
    let headers = new Headers(this.headers);
    let options = new RequestOptions({ headers: headers });

    if (this.config.network) {
      return this.http.post(`${this.config.apiEndpoint}signin`, guest, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    } else {
      let user = USERS.find( user => {
        return user.email === guest.email;
      });
      return Observable.of(user);
    }
  }
}
