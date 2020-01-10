import {Injectable} from '@angular/core';
import {TodosState} from './todos-state';
import {VisibilityFilter} from '../models/visibility-filter.enum';
import {Todo} from '../models/todo';
import {LocalPersistenceService} from '../services/local-persistence.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private stateSource: BehaviorSubject<TodosState>;
  state$: Observable<TodosState>;

  private get todos() { return this.stateSource.value.todos; }

  constructor(private persistence: LocalPersistenceService) {
    const initialState: TodosState = {
      todos: persistence.getAll(),
      visibility: VisibilityFilter.All
    };
    this.stateSource = new BehaviorSubject<TodosState>(initialState);
    this.state$ = this.stateSource.asObservable();
  }

  select<T>(selectorFn: (state: TodosState) => T): Observable<T> {
    return this.state$.pipe( map(selectorFn), distinctUntilChanged() );
  }

  createTodo(title: string) {
    const todo = this.persistence.create(title);
    this.setStateProps({ todos: [ ... this.todos, todo ] });
  }

  toggleTodoCompletedState(todo: Todo) {
    const updatedTodo = this.persistence.update(todo.id, { completed: !todo.completed});
    this.setStateProps({ todos: this.todos.map(t => t.id === updatedTodo.id ? updatedTodo : t) });
  }

  updateTodoTitle(todo: Todo, title: string) {
    const updatedTodo = this.persistence.update(todo.id, { title });
    this.setStateProps({ todos: this.todos.map(t => t.id === updatedTodo.id ? updatedTodo : t) });
  }

  destroyTodo(todo: Todo) {
    this.persistence.remove(todo.id);
    this.setStateProps({ todos: this.todos.filter(t => t.id !== todo.id) });
  }

  setAllCompletedStates(completed: boolean) {
    this.setStateProps({ todos: this.todos.map(
        t => t.completed === completed ? t : this.persistence.update(t.id, { completed })
      )});
  }

  destroyAllCompletedTodos() {
    this.todos.forEach(t => t.completed && this.persistence.remove(t.id));
    this.setStateProps({ todos: this.todos.filter(t => !t.completed) });
  }

  setVisibilty(visibility: VisibilityFilter) {
    this.setStateProps({ visibility });
  }

  private setStateProps(props: Partial<TodosState>): void {
    const state = { ...this.stateSource.value, ...props };
    this.stateSource.next(state);
  }
}
