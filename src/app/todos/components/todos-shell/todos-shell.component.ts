import {ChangeDetectionStrategy, Component, DoCheck, OnInit} from '@angular/core';
import {StoreService} from '../../state/store.service';
import {VisibilityFilterService} from '../../services/visibility-filter.service';
import {Todo} from '../../models/todo';

@Component({
  selector: 'todos-shell',
  templateUrl: './todos-shell.component.html',
  styleUrls: ['./todos-shell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosShellComponent implements OnInit, DoCheck {

  todos: Todo[];

  constructor(private store: StoreService, private visibilityFilterService: VisibilityFilterService) { }

  ngOnInit() {
    this.todos = this.store.state.todos;
    this.visibilityFilterService.initialize();
  }

  ngDoCheck(): void {
    if (this.todos !== this.store.state.todos) {
      this.todos = this.store.state.todos;
    }
  }

  createTodo(title: string) {
    this.store.createTodo(title);
  }

}
