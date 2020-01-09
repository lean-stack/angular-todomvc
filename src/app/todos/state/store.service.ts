import {Injectable} from '@angular/core';
import {TodosState} from './todos-state';
import {VisibilityFilter} from '../models/visibility-filter.enum';
import {Todo} from '../models/todo';
import {LocalPersistenceService} from '../services/local-persistence.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  state: TodosState = {
    todos: [],
    visibility: VisibilityFilter.All
  };

  constructor(private persistence: LocalPersistenceService) {
    this.state.todos = persistence.getAll();
  }

  createTodo(title: string) {
    const todo = this.persistence.create(title);
    this.state.todos.push(todo);
  }

  toggleTodoCompletedState(todo: Todo) {
    this.persistence.update(todo.id, { completed: !todo.completed});
    todo.completed = !todo.completed;
  }

  updateTodoTitle(todo: Todo, title: string) {
    this.persistence.update(todo.id, { title });
    todo.title = title;
  }

  destroyTodo(todo: Todo) {
    this.persistence.remove(todo.id);
    const ix = this.state.todos.indexOf(todo);
    this.state.todos.splice(ix, 1);
  }

  setAllCompletedStates(completed: boolean) {
    for (let ix = 0; ix < this.state.todos.length; ++ix) {
      const t = this.state.todos[ix];
      if (t.completed !== completed) {
        this.state.todos[ix] = this.persistence.update(t.id, { completed });
      }
    }
  }

  destroyAllCompletedTodos() {
    // TODO: change data flow to an immutable strategy
    for (let ix = this.state.todos.length - 1; ix >= 0; --ix) {
      const t = this.state.todos[ix];
      if (t.completed) {
        this.persistence.remove(t.id);
        this.state.todos.splice(ix, 1);
      }
    }
  }
}
