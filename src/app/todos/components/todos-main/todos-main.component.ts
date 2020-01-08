import { Component, OnInit } from '@angular/core';
import {Todo} from '../../models/todo';
import {StoreService} from '../../state/store.service';

@Component({
  selector: 'todos-main',
  templateUrl: './todos-main.component.html',
  styleUrls: ['./todos-main.component.css']
})
export class TodosMainComponent implements OnInit {

  todos: Todo[];

  // Not the best practice. Better calculate once for any change. But when?
  get allTodosAreCompleted() {
    return this.todos.findIndex(t => !t.completed) === -1;
  }

  constructor(private store: StoreService) { }

  ngOnInit() {
    this.todos = this.store.state.todos;
  }

  syncAllStates() {
    this.allTodosAreCompleted ? this.store.setAllCompletedStates(false) : this.store.setAllCompletedStates(true);
  }
}
