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

  constructor(private store: StoreService) { }

  ngOnInit() {
    this.todos = this.store.state.todos;
  }

}
