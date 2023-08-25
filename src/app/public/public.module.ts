import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { CardsComponent } from './components/cards/cards.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { CatDetailComponent } from './components/cat-detail/cat-detail.component';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CardsComponent,
    FooterComponent,
    MainComponent,
    HomeComponent,
    CatDetailComponent,
    AboutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class PublicModule { }
