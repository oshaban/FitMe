import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'; // For setting page title


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageTitle = 'Dashboard';

  // Injects Title service
  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle); // Sets page title
  }

}
