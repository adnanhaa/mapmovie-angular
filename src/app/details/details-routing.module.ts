import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailsComponent} from './details.component';
import {DetailsResolver} from './details.resolver';
import {DetailsVideosResolver} from './details-videos.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: DetailsComponent,
    resolve: {
      details: DetailsResolver,
      videos: DetailsVideosResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsRoutingModule { }
