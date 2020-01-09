import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusOnDirective } from './directives/focus-on.directive';
import { PluralizePipe } from './pipes/pluralize.pipe';
import { BindToDirective } from './directives/bind-to.directive';



@NgModule({
  declarations: [FocusOnDirective, PluralizePipe, BindToDirective],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FocusOnDirective,
    PluralizePipe,
    BindToDirective
  ]
})
export class SharedModule { }
