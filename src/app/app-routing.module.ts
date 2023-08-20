import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CatDetailComponent } from './public/components/cat-detail/cat-detail.component';
import { HomeComponent } from './public/pages/home/home.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'detail/:id',component:CatDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
