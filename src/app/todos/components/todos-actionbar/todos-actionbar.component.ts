import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {StoreService} from '../../state/store.service';
import {VisibilityFilter} from '../../models/visibility-filter.enum';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'todos-actionbar',
  templateUrl: './todos-actionbar.component.html',
  styleUrls: ['./todos-actionbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosActionbarComponent implements OnInit {

  hasTodos$: Observable<boolean>;

  allSelected$: Observable<boolean>;
  activeSelected$: Observable<boolean>;
  completedSelected$: Observable<boolean>;

  activeCount$: Observable<number>;
  hasCompletedTodos$: Observable<boolean>;

  constructor(
    private store: StoreService,
  ) { }

  ngOnInit() {
    const todos$ = this.store.select(s => s.todos);
    this.hasTodos$ = this.store.selectFrom(todos$,
      todos => todos.length > 0);
    this.activeCount$ = this.store.selectFrom(todos$,
      todos => todos.reduce((count, t) => t.completed ? count : count + 1, 0));
    this.hasCompletedTodos$ = this.store.selectFrom(todos$,
      todos => todos.findIndex(t => t.completed) !== -1);

    const visibility$ = this.store.select(s => s.visibility);
    this.allSelected$ = this.store.selectFrom(visibility$, visibility => visibility === VisibilityFilter.All );
    this.activeSelected$ = this.store.selectFrom(visibility$, visibility => visibility === VisibilityFilter.Active );
    this.completedSelected$ = this.store.selectFrom(visibility$, visibility => visibility === VisibilityFilter.Completed );
  }

  clearCompletedTodos() {
    this.store.destroyAllCompletedTodos();
  }
}
