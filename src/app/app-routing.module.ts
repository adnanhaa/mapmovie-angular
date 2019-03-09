import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailsRoutingModule} from './details/details-routing.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'show',
    loadChildren: './details/details.module#DetailsModule',
    data: {page: 'shows'}
  },
  {
    path: 'movie',
    loadChildren: './details/details.module#DetailsModule',
    data: {page: 'movies'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
