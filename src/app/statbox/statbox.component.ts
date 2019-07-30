import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statbox',
  templateUrl: './statbox.component.html',
  styleUrls: ['./statbox.component.scss']
})
export class StatboxComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
