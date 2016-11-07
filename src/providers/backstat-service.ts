import { Injectable } from '@angular/core';

@Injectable()
export class BackstatService {
  private current_user    : any;

  constructor () {}

  set_user ( _user ) {
      this.current_user = _user;
  }

  get_user () {
    return this.current_user;
  }

  get_token () {
    return this.current_user['token'];
  }
}
