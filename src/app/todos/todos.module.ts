import {NgModule} from '@angular/core';
import {TodosShellComponent} from './components/todos-shell/todos-shell.component';
import {TodosInputComponent} from './components/todos-input/todos-input.component';
import {TodosMainComponent} from './components/todos-main/todos-main.component';
import {TodosActionbarComponent} from './components/todos-actionbar/todos-actionbar.component';
import {TodosListComponent} from './components/todos-list/todos-list.component';
import {TodosItemComponent} from './components/todos-item/todos-item.component';
import {SharedModule} from '../shared/shared.module';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    TodosShellComponent,
    TodosInputComponent,
    TodosMainComponent,
    TodosActionbarComponent,
    TodosListComponent,
    TodosItemComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  exports: [TodosShellComponent]
})
export class TodosModule {
}
