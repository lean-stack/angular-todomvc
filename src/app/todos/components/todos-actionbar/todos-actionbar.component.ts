import { Component, OnInit } from '@angular/core';
import {Todo} from '../../models/todo';
import {StoreService} from '../../state/store.service';

@Component({
  selector: 'todos-actionbar',
  templateUrl: './todos-actionbar.component.html',
  styleUrls: ['./todos-actionbar.component.css']
})
export class TodosActionbarComponent implements OnInit {

  todos: Todo[];

  // Not the best practice. Better calculate once for any change. But when?
  get activeCount() {
    return this.todos.reduce((count, t) => t.completed ? count : count + 1, 0);
  }
  get hasCompletedTodos() {
    return this.todos.findIndex(t => t.completed) !== -1;
  }

  constructor(private store: StoreService) { }

  ngOnInit() {
    this.todos = this.store.state.todos;
  }

  clearCompletedTodos() {
    this.store.destroyAllCompletedTodos();
  }
}
