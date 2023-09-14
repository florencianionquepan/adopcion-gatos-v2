import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MisgatosComponent } from "./pages/misgatos/misgatos.component";

const routes: Routes=[{
    path:'perfil',
    component:ProfileComponent
},
{
    path:'misgatos',
    component:MisgatosComponent
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