import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TablaGatosComponent } from './components/tabla-gatos/tabla-gatos.component';
import { GatosByVoluntarioComponent } from './pages/gatos-by-voluntario/gatos-by-voluntario.component';
import { FormGatoComponent } from './components/form-gato/form-gato.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GatosEdicionComponent } from './pages/gatos-edicion/gatos-edicion.component';
import { FichaGatoComponent } from './components/ficha-gato/ficha-gato.component';
import { FichaPageComponent } from './pages/ficha-page/ficha-page.component';
import { MissolicitudesPageComponent } from './pages/missolicitudes-page/missolicitudes-page.component';
import { MissolicitudesComponent } from './components/missolicitudes/missolicitudes.component';
import { NotificacionService } from '../services/notificacion.service';
import { RouterModule } from '@angular/router';
import { AsignacionTransitoPageComponent } from './pages/asignacion-transito-page/asignacion-transito-page.component';
import { TablaTransitosComponent } from './components/tabla-transitos/tabla-transitos.component';
import { AgePipe } from '../pipes/age.pipe';
import { SolicitudesByGatoComponent } from './pages/solicitudes-by-gato/solicitudes-by-gato.component';
import { TablaSolicitudesAdopcionComponent } from './components/tabla-solicitudes-adopcion/tabla-solicitudes-adopcion.component';
import { MiPerfilPageComponent } from './pages/mi-perfil-page/mi-perfil-page.component';

@NgModule({
  declarations: [
    TablaGatosComponent,
    GatosByVoluntarioComponent,
    FormGatoComponent,
    GatosEdicionComponent,
    FichaGatoComponent,
    FichaPageComponent,
    MissolicitudesPageComponent,
    MissolicitudesComponent,
    AsignacionTransitoPageComponent,
    TablaTransitosComponent,
    AgePipe,
    SolicitudesByGatoComponent,
    TablaSolicitudesAdopcionComponent,
    MiPerfilPageComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers:[
    NotificacionService
  ]
})
export class BackofficeModule { }
