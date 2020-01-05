import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosShellComponent } from './todos-shell/todos-shell.component';

@NgModule({
  declarations: [TodosShellComponent],
  imports: [
    CommonModule
  ],
  exports: [TodosShellComponent]
})
export class TodosModule { }
