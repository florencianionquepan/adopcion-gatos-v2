import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { CatDetailComponent } from './shared/components/cat-detail/cat-detail.component';

const routes: Routes = [
  {path:'', component:HomeComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'cats/:id', component: CatDetailComponent },
  {path:'backoffice',
    loadChildren: ()=>import('./backoffice/backoffice.module').then(m=>m.BackofficeModule)
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
