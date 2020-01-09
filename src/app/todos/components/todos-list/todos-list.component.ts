import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../models/todo';

@Component({
  selector: 'todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent implements OnInit {

  @Input()
  todos: Todo[];

  constructor() { }

  ngOnInit() {
  }

  todoIdentFn(todo: Todo) {
    return todo.id;
  }
}
