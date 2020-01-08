import {Injectable} from '@angular/core';
import {TodosState} from './todos-state';
import {VisibilityFilter} from '../models/visibility-filter.enum';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  state: TodosState = {
    todos: [],
    visibility: VisibilityFilter.All
  };

  constructor() { }

  createTodo(title: string) {
    // Generate next id
    let nextId = 1;
    if (this.state.todos.length > 1) {
      nextId = this.state.todos[this.state.todos.length - 1].id + 1;
    }

    const todo: Todo = { id: nextId, title, completed: false };
    this.state.todos.push(todo);
  }
}
