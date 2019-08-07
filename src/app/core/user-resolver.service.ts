import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserGetData } from '../interfaces/userRes';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<UserGetData> {

  constructor(private userDataService: UserDataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userDataService.getUser();
  }

}
