import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusOnDirective } from './directives/focus-on.directive';
import { PluralizePipe } from './pipes/pluralize.pipe';



@NgModule({
  declarations: [FocusOnDirective, PluralizePipe],
  imports: [
    CommonModule
  ],
    exports: [
        CommonModule,
        FocusOnDirective,
        PluralizePipe
    ]
})
export class SharedModule { }
