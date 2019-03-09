import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-homenav',
  templateUrl: './homenav.component.html',
  styleUrls: ['./homenav.component.less']
})
export class HomenavComponent implements OnInit {

  constructor() { }
  @Input() page: string;
  @Input() period: string;
  @Output() setPeriodEmitter = new EventEmitter<string>();

  setPeriod(period: string) {
    console.log('NAV: ' + this.page);
    this.setPeriodEmitter.emit(period);
  }
  ngOnInit() {
  }

}
