import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todos-input',
  templateUrl: './todos-input.component.html',
  styleUrls: ['./todos-input.component.css']
})
export class TodosInputComponent implements OnInit {

  // Component state
  title = '';

  constructor() { }

  ngOnInit() {
  }

  titleEntered() {
    if (this.title.trim().length > 0) {
      const title = this.title.trim();
      console.log('TODO: let someone create this todo item ;-)');
      this.title = '';
    }
  }
}
