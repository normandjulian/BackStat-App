import { Injectable }     from '@angular/core';
import { Http,
         Headers,
         RequestOptions } from '@angular/http';
import { BackstatService }    from '../../providers/backstat-service'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
  // private URI     : string = "http://149.202.129.70/api";
  private URI     : string = "http://127.0.0.1:3000/api";
  private headers : Object = { 'Content-Type': 'application/json' }
  constructor(
    private http: Http,
    private backstatService : BackstatService ) { }

  sign_in ( guest ) : any { //+++++++++++++++++++++++++++++++++++++++++++++++++> Sign in
    let headers = new Headers( this.headers );
    let options = new RequestOptions({ headers: headers });
    let body = {
      'email'     : guest.email,
      'password'  : guest.password
    };

    return this.http.post(`${this.URI}/signin`, body, options)
      .toPromise()
      .then( res => res.json() )
      .catch( err => err.json() );
  }

  set_user ( _user ) {
    this.backstatService.set_user( _user );
  }
}
