import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../state/store.service';

@Component({
  selector: 'todos-shell',
  templateUrl: './todos-shell.component.html',
  styleUrls: ['./todos-shell.component.css']
})
export class TodosShellComponent implements OnInit {

  constructor(private store: StoreService) { }

  ngOnInit() {
  }

  createTodo(title: string) {
    this.store.createTodo(title);
  }
}
