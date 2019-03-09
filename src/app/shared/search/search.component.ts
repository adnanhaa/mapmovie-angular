import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  DEFAULT_TIMEOUT = 500;
  MIN_CHARS = 1;
  constructor() { }
  @Input() minChars: number;
  @Input() time: number;
  @Input() value = '';
  @Input() placeholder = 'Search';
  @Input() suggestions: Array<any> = [];
  @Output() handleSearch = new EventEmitter<string>();
  @Output() handleSuggestions = new EventEmitter<string>();
  timeout: number;
  ngOnInit() {
    // console.log(this.value);
    if (this.value !== undefined && this.value.length >= 3) {
       this.handleSuggestions.emit(this.value);
    }
  }
  handleChange(event) {
    this.value = event.target.value;
    if (this.value !== undefined && this.checkChars(this.value.length)) {
      if (this.isTimeout()) {
        this.handleTimeout(this.value);
      } else {
        this.handleSearch.emit(this.value);
      }
    }
  }
  handleSuggestionClick(value) {
    console.log('Suggestion CLICK: ' + value);
    this.value = value;
    this.suggestions = [];
    this.handleSearch.emit(this.value);
    this.handleSuggestions.emit(this.value);
  }

  handleTimeout(value) {
     if (this.timeout) {
       clearTimeout(this.timeout);
     }
     this.timeout = setTimeout(() => {
       this.handleSearch.emit(this.value);
       this.handleSuggestions.emit(this.value);
     }, this.getTimeout());
  }
  isTimeout() {
    return this.time !== undefined;
  }
  getTimeout() {
    if (this.time !== undefined) {
      return this.time;
    }
    return this.DEFAULT_TIMEOUT;
  }
  checkChars(length) {
    if (this.minChars !== undefined) {
      return length >= this.minChars;
    }
    return length >= this.MIN_CHARS;
  }
  isClear() {
    return !(this.value === undefined || this.value.length === 0);
  }
  clearHandler() {
    this.value = '';
    this.handleSearch.emit('');
  }
  getActivityStyle() {
    if (this.value === undefined) {
      return 'searchHolder neutral';
    }
    if (this.value.length === 0) {
      return 'searchHolder neutral';
    } else if (this.value.length < 3) {
      return 'searchHolder inactive';
    } else if (this.value.length >= 3) {
      return 'searchHolder active';
    }
  }

}
