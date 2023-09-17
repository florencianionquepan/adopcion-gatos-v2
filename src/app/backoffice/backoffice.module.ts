import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TablaGatosComponent } from './components/tabla-gatos/tabla-gatos.component';
import { GatosByVoluntarioComponent } from './pages/gatos-by-voluntario/gatos-by-voluntario.component';
import { NuevoGatoComponent } from './components/nuevo-gato/nuevo-gato.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfileComponent,
    TablaGatosComponent,
    GatosByVoluntarioComponent,
    NuevoGatoComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class BackofficeModule { }
