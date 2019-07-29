import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser'; // Import Title Service


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  // Inject services into app component
  public constructor(private titleService: Title) {
    // Title service is used to get and set the title of HTML document
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle); // Sets title of HTML document
  }

}
