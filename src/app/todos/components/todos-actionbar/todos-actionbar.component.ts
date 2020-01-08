import { Component, OnInit } from '@angular/core';
import {Todo} from '../../models/todo';
import {StoreService} from '../../state/store.service';

@Component({
  selector: 'todos-actionbar',
  templateUrl: './todos-actionbar.component.html',
  styleUrls: ['./todos-actionbar.component.css']
})
export class TodosActionbarComponent implements OnInit {

  todos: Todo[];

  constructor(private store: StoreService) { }

  ngOnInit() {
    this.todos = this.store.state.todos;
  }
}
