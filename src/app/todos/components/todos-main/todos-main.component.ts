import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Todo} from '../../models/todo';
import {StoreService} from '../../state/store.service';
import {VisibilityFilter} from '../../models/visibility-filter.enum';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {syncAllTodos} from '../../state/actions';

@Component({
  selector: 'todos-main',
  templateUrl: './todos-main.component.html',
  styleUrls: ['./todos-main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosMainComponent implements OnInit {

  hasTodos$: Observable<boolean>;
  filteredTodos$: Observable<Todo[]>;
  allTodosAreCompleted$: Observable<boolean>;
  private allCompleted = false;

  constructor(
    private store: StoreService,
  ) { }

  ngOnInit() {
    const todos$ = this.store.select(s => s.todos);
    this.hasTodos$ = this.store.selectFrom(todos$, todos => todos.length > 0);
    this.allTodosAreCompleted$ = this.store.selectFrom(todos$, todos => todos.findIndex(t => !t.completed) === -1);
    this.allTodosAreCompleted$.subscribe(v => this.allCompleted = v);

    this.filteredTodos$ = this.store.select(
      ({todos, visibility}) => {
        if (visibility === VisibilityFilter.All) {
          return todos;
        } else {
          return todos.filter(t => t.completed === (visibility === VisibilityFilter.Completed));
        }
      }
    );

  }

  syncAllStates() {
    this.store.dispatch(syncAllTodos(!this.allCompleted));
  }
}
