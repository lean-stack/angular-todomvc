import { Component, OnInit } from '@angular/core';
import {Todo} from '../../models/todo';
import {TodosStateService} from '../../state/todos-state.service';

@Component({
  selector: 'todos-main',
  templateUrl: './todos-main.component.html',
  styleUrls: ['./todos-main.component.css']
})
export class TodosMainComponent implements OnInit {

  todos: Todo[];

  constructor(private state: TodosStateService) { }

  ngOnInit() {
    this.todos = this.state.todos;
  }

}
