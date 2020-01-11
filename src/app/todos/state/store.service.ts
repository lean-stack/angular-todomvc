import {Injectable} from '@angular/core';
import {TodosState} from './todos-state';
import {VisibilityFilter} from '../models/visibility-filter.enum';
import {LocalPersistenceService} from '../services/local-persistence.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {distinctUntilChanged, map, scan, shareReplay} from 'rxjs/operators';
import {Action, ActionType} from './actions';

const win = window as any;
if (win.__REDUX_DEVTOOLS_EXTENSION__) {
  win.devTools = win.__REDUX_DEVTOOLS_EXTENSION__.connect();
} else {
  win.devTools = { send: (type: string, state: TodosState) => {} };
}


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  // Kern meines Store-Services
  // Zur Implementierung siehe zum Beispiel:
  // - https://codeburst.io/rxjs-by-example-part-4-939603ed3fac
  // - https://angularfirebase.com/lessons/redux-from-scratch-angular-rxjs/

  private readonly state$: BehaviorSubject<TodosState>;
  private readonly actions$: Subject<Action>;

  // Memoized state selector
  select<T>(selectFn: (state: TodosState) => T): Observable<T> {
    return this.state$.pipe( map(selectFn), distinctUntilChanged(), shareReplay(1) );
  }
  // Helper for memoized sub selections
  selectFrom<TIn, TOut>(inStream$: Observable<TIn>, selectFn: (data: TIn) => TOut): Observable<TOut> {
    return inStream$.pipe( map(selectFn), distinctUntilChanged(), shareReplay(1) );
  }

  // Dispatcher
  dispatch(action: Action) {
    this.actions$.next(action);
  }

  private reducer = (state: TodosState, action: Action): TodosState => {
    switch (action.type) {
      case ActionType.Create:
        const todo = this.persistence.create(action.title);
        state = { ...state, todos: [ ... state.todos, todo ] };
        break;
      case ActionType.Update:
        const updatedTodo = this.persistence.update(action.id, action.changes);
        state =  { ...state, todos: state.todos.map(t => t.id === updatedTodo.id ? updatedTodo : t) };
        break;
      case ActionType.Remove:
        this.persistence.remove(action.id);
        state = { ...state, todos: state.todos.filter(t => t.id !== action.id) };
        break;
      case ActionType.SyncAll:
        state = { ...state, todos: state.todos.map(
            t => t.completed === action.completed ? t : this.persistence.update(t.id, { completed: action.completed })
          )};
        break;
      case ActionType.RemoveCompleted:
        state.todos.forEach(t => t.completed && this.persistence.remove(t.id));
        state = { ...state, todos: state.todos.filter(t => !t.completed) };
        break;
      case ActionType.SetVisibility:
        state = { ...state, visibility: action.filter };
        break;
    }
    win.devTools.send(action.type, state);
    return state;
  };

  constructor(private persistence: LocalPersistenceService) {
    const initialState: TodosState = {
      todos: persistence.getAll(),
      visibility: VisibilityFilter.All
    };
    this.state$ = new BehaviorSubject<TodosState>(initialState);
    this.actions$ = new Subject<Action>();
    this.actions$.pipe(scan(this.reducer, initialState)).subscribe(this.state$);
  }
}
