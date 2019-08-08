import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserGetData } from '../interfaces/userRes';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<UserGetData> {

  constructor(private auth: AuthenticationService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.getUser();
  }
}
