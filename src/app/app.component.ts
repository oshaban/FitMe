import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser'; // Import Title Service
import { AuthenticationService } from './core/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  /**
   * @param titleService Used to set title
   * @param auth Used to log user out
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

}
