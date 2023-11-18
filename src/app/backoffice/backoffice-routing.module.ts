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
import { CuotasPageComponent } from "./pages/cuotas-page/cuotas-page.component";
import { CuotaFailureComponent } from "./pages/cuota-failure/cuota-failure.component";
import { RoleGuard } from "./guards/role.guard";

const routes: Routes=[
{
    path:'misgatos',
    component:GatosByVoluntarioComponent,
    canActivate:[RoleGuard],
    data:{
        allowedRoles:['ROLE_VOLUNTARIO']
    }
},
{
    path:'misgatos/:id',
    component:GatosEdicionComponent,
    canActivate:[RoleGuard],
    data:{
        allowedRoles:['ROLE_VOLUNTARIO']
    }
},
{
    path:'misgatos/:id/ficha',
    component:FichaPageComponent,
    canActivate:[RoleGuard],
    data:{
        allowedRoles:['ROLE_VOLUNTARIO']
    }
},
{
    path:'misgatos/:id/transito',
    component:AsignacionTransitoPageComponent,
    canActivate:[RoleGuard],
    data:{
        allowedRoles:['ROLE_VOLUNTARIO']
    }
},
{
    path:'misgatos/:id/solicitudes',
    component:SolicitudesByGatoComponent,
    canActivate:[RoleGuard],
    data:{
        allowedRoles:['ROLE_VOLUNTARIO']
    }
},
{
    path:'missolicitudes',
    component:MissolicitudesPageComponent,
    canActivate:[RoleGuard],
    data:{
        allowedRoles:['ROLE_USER']
    }
},
{
    path:'perfil',
    component:MiPerfilPageComponent,
    canActivate:[RoleGuard],
    data:{
        allowedRoles:['ROLE_USER']
    }
},
{
    path:'gatosentransito',
    component:TransitoPageComponent,
    canActivate:[RoleGuard],
    data:{
        requiredAttributes:['esTransito']
    }
},
{
    path:'cuotas/success',
    component:CuotaSuccessComponent,
    canActivate:[RoleGuard],
    data:{
        requiredAttributes:['esPadrino']
    }
},
{
    path:'cuotas/failure',
    component:CuotaFailureComponent,
    canActivate:[RoleGuard],
    data:{
        requiredAttributes:['esPadrino']
    }
},
{
    path:'miscuotas',
    component:CuotasPageComponent,
    canActivate:[RoleGuard],
    data:{
        requiredAttributes:['esPadrino']
    }
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