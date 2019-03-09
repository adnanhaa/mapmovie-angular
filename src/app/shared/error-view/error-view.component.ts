import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-error-view',
  templateUrl: './error-view.component.html',
  styleUrls: ['./error-view.component.less']
})
export class ErrorViewComponent implements OnInit {

  constructor() { }
  @Input() message;
  ngOnInit() {
  }

}
