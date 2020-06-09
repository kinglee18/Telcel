import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { CustomMaterialModule } from '../material.module';
import { DirectivesModule } from '../directives/directives.module';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdministrationComponent, UserRegisterComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    CustomMaterialModule,
    DirectivesModule,
    ReactiveFormsModule
  ]
})
export class AdministrationModule { }
