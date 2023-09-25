import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ReactiveFormsModule } from "@angular/forms";
import { GatosByVoluntarioComponent } from "./pages/gatos-by-voluntario/gatos-by-voluntario.component";
import { GatosEdicionComponent } from "./pages/gatos-edicion/gatos-edicion.component";
import { FichaPageComponent } from "./pages/ficha-page/ficha-page.component";
import { AuthGuardGuard } from "./guards/auth-guard.guard";

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