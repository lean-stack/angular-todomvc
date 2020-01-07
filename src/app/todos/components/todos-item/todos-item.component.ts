import { Component, OnInit } from '@angular/core';
import {Todo} from '../../models/todo';

@Component({
  selector: 'todos-item',
  templateUrl: './todos-item.component.html',
  styleUrls: ['./todos-item.component.css']
})
export class TodosItemComponent implements OnInit {

  todo: Todo;

  constructor() { }

  ngOnInit() {
    this.todo = { id: 17, title: 'Template Syntax', completed: false };
  }

}
