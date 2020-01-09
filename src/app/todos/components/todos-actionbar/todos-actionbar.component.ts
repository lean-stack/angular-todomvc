import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Todo} from '../../models/todo';
import {StoreService} from '../../state/store.service';
import {VisibilityFilter} from '../../models/visibility-filter.enum';
import {VisibilityFilterService} from '../../services/visibility-filter.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'todos-actionbar',
  templateUrl: './todos-actionbar.component.html',
  styleUrls: ['./todos-actionbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosActionbarComponent implements OnInit, DoCheck, OnDestroy {

  todos: Todo[];

  allSelected = false;
  activeSelected = false;
  completedSelected = false;

  private subscription: Subscription;

  // Not the best practice. Better calculate once for any change. But when?
  get activeCount() {
    return this.todos.reduce((count, t) => t.completed ? count : count + 1, 0);
  }
  get hasCompletedTodos() {
    return this.todos.findIndex(t => t.completed) !== -1;
  }

  constructor(
    private store: StoreService,
    private visibilityFilterService: VisibilityFilterService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.todos = this.store.state.todos;
    this.subscription = this.visibilityFilterService.filterChanged.subscribe(() => {
      this.mapFilter();
      this.changeDetectorRef.markForCheck();
    });
  }

  ngDoCheck(): void {
    if (this.todos !== this.store.state.todos) {
      this.todos = this.store.state.todos;
      this.mapFilter();
      this.changeDetectorRef.markForCheck();
    }
  }

  clearCompletedTodos() {
    this.store.destroyAllCompletedTodos();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private mapFilter() {
    this.allSelected = this.store.state.visibility === VisibilityFilter.All;
    this.activeSelected = this.store.state.visibility === VisibilityFilter.Active;
    this.completedSelected = this.store.state.visibility === VisibilityFilter.Completed;
  }
}
