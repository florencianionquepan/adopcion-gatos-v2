import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', 
    loadChildren: ()=>import('./public/public.module').then(m=>m.PublicModule)
  },
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
