import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TablaGatosComponent } from './components/tabla-gatos/tabla-gatos.component';
import { GatosByVoluntarioComponent } from './pages/gatos-by-voluntario/gatos-by-voluntario.component';
import { FormGatoComponent } from './components/form-gato/form-gato.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GatosEdicionComponent } from './pages/gatos-edicion/gatos-edicion.component';
import { FichaGatoComponent } from './components/ficha-gato/ficha-gato.component';



@NgModule({
  declarations: [
    ProfileComponent,
    TablaGatosComponent,
    GatosByVoluntarioComponent,
    FormGatoComponent,
    GatosEdicionComponent,
    FichaGatoComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class BackofficeModule { }
