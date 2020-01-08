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
    this.state.todos.forEach(t => {
      if (t.completed !== completed) {
        this.persistence.update(t.id, { completed });
        t.completed = completed;
      }
    });
  }

  destroyAllCompletedTodos() {
    // TODO: change data flow to an immutable strategy
    this.state.todos.forEach(t => {
      if (t.completed) {
        this.destroyTodo(t);
      }
    });
  }
}
