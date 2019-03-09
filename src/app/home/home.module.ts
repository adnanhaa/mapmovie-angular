import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from './home.component';
import {HomenavComponent} from '../components/homenav/homenav.component';
import {ItemlistComponent} from '../components/itemlist/itemlist.component';
import {SharedModule} from '../shared/shared.module';
import {PipesModule} from '../pipes/pipes.module';
import {HomeResolver} from './home.resolver';

@NgModule({
  declarations: [
    HomeComponent,
    HomenavComponent,
    ItemlistComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    PipesModule
  ],
  providers: [
    HomeResolver
  ]
})
export class HomeModule { }
