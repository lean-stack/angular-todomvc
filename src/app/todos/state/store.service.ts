import {Injectable} from '@angular/core';
import {TodosState} from './todos-state';
import {VisibilityFilter} from '../models/visibility-filter.enum';
import {Todo} from '../models/todo';
import {LocalPersistenceService} from '../services/local-persistence.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  state: TodosState;

  todosSource: BehaviorSubject<Todo[]>;
  visibilitySource: BehaviorSubject<VisibilityFilter>;

  constructor(private persistence: LocalPersistenceService) {
    this.todosSource = new BehaviorSubject(persistence.getAll());
    this.visibilitySource = new BehaviorSubject(VisibilityFilter.All);
    this.state = {
      todos$: this.todosSource.asObservable(),
      visibility$: this.visibilitySource
    };
  }

  createTodo(title: string) {
    const todo = this.persistence.create(title);
    this.todosSource.next([ ... this.todosSource.value, todo ]);
  }

  toggleTodoCompletedState(todo: Todo) {
    const updatedTodo = this.persistence.update(todo.id, { completed: !todo.completed});
    this.todosSource.next( this.todosSource.value.map(t => t.id === updatedTodo.id ? updatedTodo : t));
  }

  updateTodoTitle(todo: Todo, title: string) {
    const updatedTodo = this.persistence.update(todo.id, { title });
    this.todosSource.next( this.todosSource.value.map(t => t.id === updatedTodo.id ? updatedTodo : t));
  }

  destroyTodo(todo: Todo) {
    this.persistence.remove(todo.id);
    this.todosSource.next( this.todosSource.value.filter(t => t.id !== todo.id));
  }

  setAllCompletedStates(completed: boolean) {
    this.todosSource.next( this.todosSource.value.map(
      t => t.completed === completed ? t : this.persistence.update(t.id, { completed })
    ));
  }

  destroyAllCompletedTodos() {
    this.todosSource.value.forEach(t => t.completed && this.persistence.remove(t.id));
    this.todosSource.next(this.todosSource.value.filter(t => !t.completed));
  }

  setVisibilty(visibility: VisibilityFilter) {
    this.visibilitySource.next(visibility);
  }
}
