import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { GatosByVoluntarioComponent } from "./pages/gatos-by-voluntario/gatos-by-voluntario.component";
import { GatosEdicionComponent } from "./pages/gatos-edicion/gatos-edicion.component";
import { FichaPageComponent } from "./pages/ficha-page/ficha-page.component";
import { MissolicitudesPageComponent } from "./pages/missolicitudes-page/missolicitudes-page.component";
import { AsignacionTransitoPageComponent } from "./pages/asignacion-transito-page/asignacion-transito-page.component";
import { SolicitudesByGatoComponent } from "./pages/solicitudes-by-gato/solicitudes-by-gato.component";

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