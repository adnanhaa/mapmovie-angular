import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import {BackButtonComponent} from '../components/back-button/back-button.component';
import {SharedModule} from '../shared/shared.module';
import {PipesModule} from '../pipes/pipes.module';
import {DetailsResolver} from './details.resolver';
import {DetailsVideosResolver} from './details-videos.resolver';

@NgModule({
  declarations: [
    DetailsComponent,
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    SharedModule,
    PipesModule,
  ],
  providers: [
    DetailsResolver,
    DetailsVideosResolver
  ]
})
export class DetailsModule { }
