import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouterModule } from '@angular/router';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    SharedModule
  ]
})
export class BackofficeModule { }
