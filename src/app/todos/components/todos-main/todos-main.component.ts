import { Component, OnInit } from '@angular/core';
import {Todo} from '../../models/todo';

@Component({
  selector: 'todos-main',
  templateUrl: './todos-main.component.html',
  styleUrls: ['./todos-main.component.css']
})
export class TodosMainComponent implements OnInit {

  todos: Todo[];

  constructor() { }

  ngOnInit() {
    this.todos = [
      { id: 1, title: 'Template Syntax', completed: true },
      { id: 2, title: 'Directives', completed: false }
    ];
  }

}
