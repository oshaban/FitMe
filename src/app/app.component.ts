import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser'; // Import Title Service
import { AuthenticationService } from './core/authentication.service';

import { faHome, faWeightHanging, faChartBar, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  // Setting up icons
  faHome = faHome;
  faWeightHanging = faWeightHanging;
  faChartBar = faChartBar;
  faTimes = faTimes;

  /**
   * @param titleService Used to set title
   * @param auth Used to log user out, and check if user is logged in
   */
  public constructor(
    private titleService: Title,
    private auth: AuthenticationService,
    ) {
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle); // Sets title of HTML document
  }

  public logOut(): void {
    this.auth.logout();
  }

  public isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

}
