import { Component, OnInit } from '@angular/core';
import {TodosStateService} from '../../state/todos-state.service';
import {Todo} from '../../models/todo';

@Component({
  selector: 'todos-shell',
  templateUrl: './todos-shell.component.html',
  styleUrls: ['./todos-shell.component.css']
})
export class TodosShellComponent implements OnInit {

  constructor(private state: TodosStateService) { }

  ngOnInit() {
  }

  createTodo(title: string) {
    // Generate next id
    let nextId = 1;
    if (this.state.todos.length > 1) {
      nextId = this.state.todos[this.state.todos.length - 1].id + 1;
    }
    
    const todo: Todo = { id: nextId, title, completed: false };
    this.state.todos.push(todo);
  }
}
