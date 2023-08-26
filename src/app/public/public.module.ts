import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './components/cards/cards.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { CatDetailComponent } from './components/cat-detail/cat-detail.component';
import { AboutComponent } from './pages/about/about.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [
    CardsComponent,
    MainComponent,
    HomeComponent,
    CatDetailComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule { }
