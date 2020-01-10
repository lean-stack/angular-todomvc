import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Todo} from '../../models/todo';
import {StoreService} from '../../state/store.service';
import {VisibilityFilter} from '../../models/visibility-filter.enum';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'todos-main',
  templateUrl: './todos-main.component.html',
  styleUrls: ['./todos-main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosMainComponent implements OnInit {

  hasTodos$: Observable<boolean>;
  filteredTodos$: Observable<Todo[]>;
  allTodosAreCompleted$ = new BehaviorSubject<boolean>(false)

  constructor(
    private store: StoreService,
  ) { }

  ngOnInit() {
    this.hasTodos$ = this.store.state$.pipe( map(state => state.todos.length > 0));

    this.store.state$.pipe( map(
      state => state.todos.findIndex(t => !t.completed) === -1)
    ).subscribe(allCompleted => this.allTodosAreCompleted$.next(allCompleted));

    this.filteredTodos$ = this.store.state$.pipe(
      map( ({todos, visibility}) => {
        if (visibility === VisibilityFilter.All) {
          return todos;
        } else {
          return todos.filter(t => t.completed === (visibility === VisibilityFilter.Completed));
        }
      })
    );
  }

  syncAllStates() {
    this.store.setAllCompletedStates(!this.allTodosAreCompleted$.value);
  }
}
