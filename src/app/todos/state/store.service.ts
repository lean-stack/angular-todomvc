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
    this.state.todos = [ ... this.state.todos, todo ];
  }

  toggleTodoCompletedState(todo: Todo) {
    const updatedTodo = this.persistence.update(todo.id, { completed: !todo.completed});
    this.state.todos = this.state.todos.map(t => t.id === updatedTodo.id ? updatedTodo : t);
  }

  updateTodoTitle(todo: Todo, title: string) {
    const updatedTodo = this.persistence.update(todo.id, { title });
    this.state.todos = this.state.todos.map(t => t.id === updatedTodo.id ? updatedTodo : t);
  }

  destroyTodo(todo: Todo) {
    this.persistence.remove(todo.id);
    this.state.todos = this.state.todos.filter(t => t.id !== todo.id);
  }

  setAllCompletedStates(completed: boolean) {
    this.state.todos = this.state.todos.map(t => t.completed === completed ? t : this.persistence.update(t.id, { completed }));
  }

  destroyAllCompletedTodos() {
    this.state.todos.forEach(t => t.completed && this.persistence.remove(t.id));
    this.state.todos = this.state.todos.filter(t => !t.completed);
  }
}
