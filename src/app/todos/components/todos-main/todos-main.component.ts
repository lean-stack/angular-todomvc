import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnInit} from '@angular/core';
import {Todo} from '../../models/todo';
import {StoreService} from '../../state/store.service';
import {VisibilityFilterService} from '../../services/visibility-filter.service';
import {VisibilityFilter} from '../../models/visibility-filter.enum';

@Component({
  selector: 'todos-main',
  templateUrl: './todos-main.component.html',
  styleUrls: ['./todos-main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosMainComponent implements OnInit, DoCheck {

  todos: Todo[];
  filteredTodos: Todo[];
  allTodosAreCompleted: boolean;

  constructor(
    private store: StoreService,
    private visibilityFilterService: VisibilityFilterService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.todos = this.store.state.todos;
    this.allTodosAreCompleted = this.todos.findIndex(t => !t.completed) === -1;
    this.visibilityFilterService.filterChanged.subscribe(() => {
      this.mapFilter();
      this.changeDetectorRef.markForCheck();
    });
  }

  ngDoCheck(): void {
    if (this.todos !== this.store.state.todos) {
      this.todos = this.store.state.todos;
      this.allTodosAreCompleted = this.todos.findIndex(t => !t.completed) === -1;
      this.mapFilter();
      this.changeDetectorRef.markForCheck();
    }
  }

  syncAllStates() {
    this.allTodosAreCompleted ? this.store.setAllCompletedStates(false) : this.store.setAllCompletedStates(true);
  }

  private mapFilter() {
    if (this.store.state.visibility === VisibilityFilter.All) {
      this.filteredTodos = this.todos;
    } else {
      this.filteredTodos = this.todos.filter(t => t.completed === (this.store.state.visibility === VisibilityFilter.Completed));
    }
  }
}
