import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from '../auth/login/login.component';
import { CatDetailComponent } from './components/cat-detail/cat-detail.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home',component:HomeComponent},
      { path: 'about', component: AboutComponent },
      { path: 'login', component: LoginComponent },
      { path: 'cats/:id', component: CatDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
