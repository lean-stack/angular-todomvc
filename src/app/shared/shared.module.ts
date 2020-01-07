import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusOnDirective } from './directives/focus-on.directive';



@NgModule({
  declarations: [FocusOnDirective],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FocusOnDirective
  ]
})
export class SharedModule { }
