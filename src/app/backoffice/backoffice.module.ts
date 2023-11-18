import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TablaGatosComponent } from './components/tabla-gatos/tabla-gatos.component';
import { GatosByVoluntarioComponent } from './pages/gatos-by-voluntario/gatos-by-voluntario.component';
import { FormGatoComponent } from './components/form-gato/form-gato.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FilterPipe } from '../pipes/filter.pipe';
import { TituloPageComponent } from './components/titulo-page/titulo-page.component';
import { TablaEstadosComponent } from './components/tabla-estados/tabla-estados.component';
import { GatosByTransitoComponent } from './components/gatos-by-transito/gatos-by-transito.component';
import { TransitoPageComponent } from './pages/transito-page/transito-page.component';
import { CuotaSuccessComponent } from './pages/cuota-success/cuota-success.component';
import { CuotasPageComponent } from './pages/cuotas-page/cuotas-page.component';
import { TablaCuotasComponent } from './components/tabla-cuotas/tabla-cuotas.component';
import { CuotaFailureComponent } from './pages/cuota-failure/cuota-failure.component';
import { MissolicitudesVoluntariadosComponent } from './components/missolicitudes-voluntariados/missolicitudes-voluntariados.component';
import { SolicitudesVoluntariadosComponent } from './pages/solicitudes-voluntariados/solicitudes-voluntariados.component';
import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';
import { TablaSolicitudesVoluntariadosComponent } from './components/tabla-solicitudes-voluntariados/tabla-solicitudes-voluntariados.component';

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
    MiPerfilPageComponent,
    FilterPipe,
    TituloPageComponent,
    TablaEstadosComponent,
    GatosByTransitoComponent,
    TransitoPageComponent,
    CuotaSuccessComponent,
    CuotasPageComponent,
    TablaCuotasComponent,
    CuotaFailureComponent,
    MissolicitudesVoluntariadosComponent,
    SolicitudesVoluntariadosComponent,
    GestionUsuariosComponent,
    TablaSolicitudesVoluntariadosComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers:[
    NotificacionService
  ]
})
export class BackofficeModule { }
