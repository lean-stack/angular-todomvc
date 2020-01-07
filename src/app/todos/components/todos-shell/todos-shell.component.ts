import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todos-shell',
  templateUrl: './todos-shell.component.html',
  styleUrls: ['./todos-shell.component.css']
})
export class TodosShellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  createTodo(title: string) {
    console.log(`Creating todo >${title}<.`);
  }
}
