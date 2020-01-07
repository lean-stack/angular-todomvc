import { Component, OnInit } from '@angular/core';
import {Todo} from '../../models/todo';

@Component({
  selector: 'todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {

  todo: Todo;

  constructor() { }

  ngOnInit() {
    this.todo = { id: 17, title: 'Template Syntax', completed: false };
  }

}
