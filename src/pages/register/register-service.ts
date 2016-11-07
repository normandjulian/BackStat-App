import { Injectable }                     from '@angular/core';
import { Http, Headers, RequestOptions }  from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegisterService {
  // private URI     : string = "http://149.202.129.70/api";
  private URI     : string = "http://127.0.0.1:3000/api";
  private headers : Object = { 'Content-Type': 'application/json' }
  constructor(private http: Http) { }

  get_clubs () : any { //++++++++++++++++++++++++++++++++++++++++++++++++++++++> Get Clubs
    let headers = new Headers( this.headers );
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.URI}/clubs`, options)
      .toPromise()
      .then( res => res.json() )
      .catch( err => err.json() );
  };

  sign_up ( guest ) : any { //+++++++++++++++++++++++++++++++++++++++++++++++++> Sign up
    let headers = new Headers( this.headers );
    let options = new RequestOptions({ headers: headers });
    let body = {
      'lastname'  : guest.lastname  || null,
      'firstname' : guest.firstname || null,
      'email'     : guest.email,
      'password'  : guest.fstpwd,
      'club_id'   : guest.club
    };

    return this.http.post(`${this.URI}/signup`, body, options)
      .toPromise()
      .then( res => res.json() )
      .catch( err => err.json() );
  }
}
