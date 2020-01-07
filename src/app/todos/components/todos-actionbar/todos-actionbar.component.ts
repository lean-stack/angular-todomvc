import { Component, OnInit } from '@angular/core';
import {Todo} from '../../models/todo';
import {TodosStateService} from '../../state/todos-state.service';

@Component({
  selector: 'todos-actionbar',
  templateUrl: './todos-actionbar.component.html',
  styleUrls: ['./todos-actionbar.component.css']
})
export class TodosActionbarComponent implements OnInit {

  todos: Todo[];

  constructor(private state: TodosStateService) { }

  ngOnInit() {
    this.todos = this.state.todos;
  }
}
