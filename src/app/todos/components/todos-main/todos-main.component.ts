import {Component, OnInit} from '@angular/core';
import {Todo} from '../../models/todo';
import {StoreService} from '../../state/store.service';
import {VisibilityFilterService} from '../../services/visibility-filter.service';
import {VisibilityFilter} from '../../models/visibility-filter.enum';

@Component({
  selector: 'todos-main',
  templateUrl: './todos-main.component.html',
  styleUrls: ['./todos-main.component.css']
})
export class TodosMainComponent implements OnInit {

  todos: Todo[];
  filteredTodos: Todo[];

  // Not the best practice. Better calculate once for any change. But when?
  get allTodosAreCompleted() {
    return this.todos.findIndex(t => !t.completed) === -1;
  }

  constructor(private store: StoreService, private visibilityFilterService: VisibilityFilterService) { }

  ngOnInit() {
    this.todos = this.store.state.todos;
    this.visibilityFilterService.filterChanged.subscribe(() => {
      this.mapFilter();
    });
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
