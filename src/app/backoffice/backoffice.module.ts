import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouterModule } from '@angular/router';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MisgatosComponent } from './pages/misgatos/misgatos.component';
import { TablaGatosComponent } from './components/tabla-gatos/tabla-gatos.component';



@NgModule({
  declarations: [
    ProfileComponent,
    MisgatosComponent,
    TablaGatosComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    SharedModule
  ]
})
export class BackofficeModule { }
