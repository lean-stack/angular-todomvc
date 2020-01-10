import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'todos-input',
  templateUrl: './todos-input.component.html',
  styleUrls: ['./todos-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosInputComponent implements OnInit {

  // Component state
  title = '';

  // Events
  @Output()
  createTodo = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  titleEntered() {
    if (this.title.trim().length > 0) {
      const title = this.title.trim();
      this.createTodo.emit(title);
      this.title = '';
    }
  }
}
