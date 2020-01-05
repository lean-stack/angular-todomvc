import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosShellComponent } from './todos-shell/todos-shell.component';
import { TodosInputComponent } from './todos-input/todos-input.component';
import { TodosMainComponent } from './todos-main/todos-main.component';
import { TodosActionbarComponent } from './todos-actionbar/todos-actionbar.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodosItemComponent } from './todos-item/todos-item.component';

@NgModule({
  declarations: [TodosShellComponent, TodosInputComponent, TodosMainComponent, TodosActionbarComponent, TodosListComponent, TodosItemComponent],
  imports: [
    CommonModule
  ],
  exports: [TodosShellComponent]
})
export class TodosModule { }
