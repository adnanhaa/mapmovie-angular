import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiConstants} from '../services/api-constants';
import {DomSanitizer} from '@angular/platform-browser';
import Data from '../models/Data';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {}
  item = null;
  videos = [];
  isLoading = true;
  error = null;

  ngOnInit() {
    this.route.data.subscribe(
      (data: { details: Data, videos: Data }) => {
        this.isLoading = false;
        this.item = data.details;
        this.videos = data.videos.results;
      }
    );

  /*  this.page = this.route.snapshot.data.page;
    this.id = this.route.snapshot.params.id;*/
  }

  hasVideo() {
    return this.videos !== undefined && this.videos[0] !== undefined;
  }
  getVideoUrl() {
    const video = this.videos[0];
    // console.log(this.hasVideo());
    switch (video.site) {
      case 'YouTube' : return'https://www.youtube.com/embed/' + video.key + '?autoplay=1';
       // &enablejsapi=1&showinfo=0&controls=1&fs=1&wmode=transparent&amp;origin=http%3A%2F%2Flocalhost
    }
    return '';
  }

  getImgUrl() {
    const src = this.item.backdrop_path === null ? this.item.poster_path : this.item.backdrop_path;
    let fullPath = this.sanitizer.bypassSecurityTrustUrl(ApiConstants.IMAGE_BASE_URL + src);

    if (src == null) {
      fullPath = 'assets/img/noimage.jpg';
    }

    return fullPath;
  }


}
