import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ReactiveFormsModule } from "@angular/forms";
import { GatosByVoluntarioComponent } from "./pages/gatos-by-voluntario/gatos-by-voluntario.component";
import { GatosEdicionComponent } from "./pages/gatos-edicion/gatos-edicion.component";
import { FichaPageComponent } from "./pages/ficha-page/ficha-page.component";
import { MissolicitudesPageComponent } from "./pages/missolicitudes-page/missolicitudes-page.component";
import { AsignacionTransitoPageComponent } from "./pages/asignacion-transito-page/asignacion-transito-page.component";

const routes: Routes=[{
    path:'perfil',
    component:ProfileComponent
},
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