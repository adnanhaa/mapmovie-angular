import {Component, Input, OnInit} from '@angular/core';
import {ApiConstants} from '../../services/api-constants';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.less']
})
export class ItemlistComponent implements OnInit {

  constructor() { }
  @Input() items: any;
  @Input() page: string;

  ngOnInit() {
    // console.log(this.page);
  }

  getType(): string{
    switch (this.page) {
      case 'shows': return 'show';
      default: return 'movie';
    }
  }
  getImgUrl(item: any): string {
    const src = item.backdrop_path === null ? item.poster_path : item.backdrop_path;
    let fullPath = ApiConstants.IMAGE_BASE_URL + src;
    if (src == null) {
      fullPath = 'assets/img/noimage.jpg';
    }
    return fullPath;
  }

}
