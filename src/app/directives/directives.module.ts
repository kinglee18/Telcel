import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDirective } from './loading.directive';
import { EmptyDirective } from './empty.directive';
import { PermissionsDirective } from './permissions.directive';



@NgModule({
  declarations: [
    LoadingDirective,
    EmptyDirective,
    PermissionsDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoadingDirective,
    EmptyDirective,
    PermissionsDirective
  ]
})
export class DirectivesModule { }
