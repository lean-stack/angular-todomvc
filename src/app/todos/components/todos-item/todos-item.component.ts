import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Todo} from '../../models/todo';
import {StoreService} from '../../state/store.service';

@Component({
  selector: 'todos-item',
  templateUrl: './todos-item.component.html',
  styleUrls: ['./todos-item.component.css']
})
export class TodosItemComponent implements OnInit {

  @Input()
  todo: Todo;

  // Component state
  editMode = false;
  editText = '';

  constructor(private store: StoreService) { }

  ngOnInit() {
  }

  toggleCompletedState() {
    this.store.toggleTodoCompletedState(this.todo);
  }

  destroyItem() {
    this.store.destroyTodo(this.todo);
  }

  beginEdit() {
    this.editMode = true;
    this.editText = this.todo.title;
  }

  endEdit() {
    // Already left editmode via blur
    if (!this.editMode) {
      return;
    }

    if (this.editText.trim().length === 0) {
      this.store.destroyTodo(this.todo);
    } else {
      this.store.updateTodoTitle(this.todo, this.editText.trim());
    }
    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }
}
