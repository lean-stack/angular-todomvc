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
    this.hasTodos$ = this.store.state.todos$.pipe( map(todos => todos.length > 0));
    this.allSelected$ = this.store.state.visibility$.pipe( map( visibility => visibility === VisibilityFilter.All ));
    this.activeSelected$ = this.store.state.visibility$.pipe( map( visibility => visibility === VisibilityFilter.Active ));
    this.completedSelected$ = this.store.state.visibility$.pipe( map( visibility => visibility === VisibilityFilter.Completed ));
    this.activeCount$ = this.store.state.todos$.pipe( map(
      todos => todos.reduce((count, t) => t.completed ? count : count + 1, 0)
    ));
    this.hasCompletedTodos$ = this.store.state.todos$.pipe( map(todos => todos.findIndex(t => t.completed) !== -1));
  }

  clearCompletedTodos() {
    this.store.destroyAllCompletedTodos();
  }
}
