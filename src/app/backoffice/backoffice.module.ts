import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TablaGatosComponent } from './components/tabla-gatos/tabla-gatos.component';
import { GatosByVoluntarioComponent } from './pages/gatos-by-voluntario/gatos-by-voluntario.component';



@NgModule({
  declarations: [
    ProfileComponent,
    TablaGatosComponent,
    GatosByVoluntarioComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    SharedModule
  ]
})
export class BackofficeModule { }
