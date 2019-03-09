import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerComponent} from './spinner/spinner.component';
import {ErrorViewComponent} from './error-view/error-view.component';
import {SearchComponent} from './search/search.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ErrorViewComponent,
    SearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent,
    ErrorViewComponent,
    SearchComponent
  ]
})
export class SharedModule { }
