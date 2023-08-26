import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CatDetailComponent } from './public/components/cat-detail/cat-detail.component';
import { HomeComponent } from './public/pages/home/home.component';
import { AboutComponent } from './public/pages/about/about.component';
import { ProfileComponent } from './backoffice/pages/profile/profile.component';

const routes: Routes = [
  {path:'', 
    component:HomeComponent},
  {path:'about',
    component:AboutComponent},
  {path:'cats/:id',
    component:CatDetailComponent},
  {path:'backoffice',
    loadChildren: ()=>import('./backoffice/backoffice.module').then(m=>m.BackofficeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
