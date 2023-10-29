import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { GatosByVoluntarioComponent } from "./pages/gatos-by-voluntario/gatos-by-voluntario.component";
import { GatosEdicionComponent } from "./pages/gatos-edicion/gatos-edicion.component";
import { FichaPageComponent } from "./pages/ficha-page/ficha-page.component";
import { MissolicitudesPageComponent } from "./pages/missolicitudes-page/missolicitudes-page.component";
import { AsignacionTransitoPageComponent } from "./pages/asignacion-transito-page/asignacion-transito-page.component";
import { SolicitudesByGatoComponent } from "./pages/solicitudes-by-gato/solicitudes-by-gato.component";
import { MiPerfilPageComponent } from "./pages/mi-perfil-page/mi-perfil-page.component";
import { TransitoPageComponent } from "./pages/transito-page/transito-page.component";
import { CuotaSuccessComponent } from "./pages/cuota-success/cuota-success.component";

const routes: Routes=[
{
    path:'misgatos',
    component:GatosByVoluntarioComponent
},
{
    path:'misgatos/:id',
    component:GatosEdicionComponent
},
{
    path:'misgatos/:id/ficha',
    component:FichaPageComponent
},
{
    path:'misgatos/:id/transito',
    component:AsignacionTransitoPageComponent
},
{
    path:'misgatos/:id/solicitudes',
    component:SolicitudesByGatoComponent
},
{
    path:'missolicitudes',
    component:MissolicitudesPageComponent
},
{
    path:'perfil',
    component:MiPerfilPageComponent
},
{
    path:'gatosentransito',
    component:TransitoPageComponent
},
{
    path:'cuotas/success',
    component:CuotaSuccessComponent
}]

@NgModule({
    imports:[
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    exports:[
        RouterModule
    ],
})
export class BackofficeRoutingModule{}