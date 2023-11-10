import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CatDetailComponent } from './components/cat-detail/cat-detail.component';
import { CardsComponent } from './components/cards/cards.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ErrorValidationComponent } from './components/error-validation/error-validation.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PersonaFormComponent } from './components/persona-form/persona-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransitosByGatoComponent } from './components/transitos-by-gato/transitos-by-gato.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { DetallePersonaComponent } from './components/detalle-persona/detalle-persona.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardsComponent,
    HomeComponent,
    CatDetailComponent,
    CarouselComponent,
    ErrorValidationComponent,
    SpinnerComponent,
    NotificationComponent,
    PersonaFormComponent,
    TransitosByGatoComponent,
    NoDataComponent,
    DetallePersonaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ErrorValidationComponent,
    SpinnerComponent,
    NotificationComponent,
    PersonaFormComponent,
    DetallePersonaComponent,
    NoDataComponent
  ]
})
export class SharedModule { }
