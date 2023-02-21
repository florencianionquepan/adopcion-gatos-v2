import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatDetailComponent } from './components/cat-detail/cat-detail.component';

const routes: Routes = [
  {path:'detail/:id',component:CatDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
