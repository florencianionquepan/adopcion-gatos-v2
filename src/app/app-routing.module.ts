import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { CatDetailComponent } from './shared/components/cat-detail/cat-detail.component';
import { RegisterComponent } from './auth/register/register.component';
import { ValidationComponent } from './auth/validation/validation.component';
import { AuthGuardGuard } from './backoffice/guards/auth-guard.guard';
import { BePartOfComponent } from './shared/pages/be-part-of/be-part-of.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'usuarios/:id/validacion/:token', component: ValidationComponent },
  { path: 'gatos/:id', component: CatDetailComponent },
  { path:'join', component:BePartOfComponent},
  {path:'backoffice',
    loadChildren: ()=>import('./backoffice/backoffice.module').then(m=>m.BackofficeModule),
    canActivate:[AuthGuardGuard]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
