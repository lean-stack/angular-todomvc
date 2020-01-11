import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../models/todo';
import {StoreService} from '../../state/store.service';
import {removeTodo, updateTodo} from '../../state/actions';

@Component({
  selector: 'todos-item',
  templateUrl: './todos-item.component.html',
  styleUrls: ['./todos-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    this.store.dispatch(updateTodo(this.todo.id, { completed: !this.todo.completed }));
  }

  destroyItem() {
    this.store.dispatch(removeTodo(this.todo.id));
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
      this.store.dispatch(removeTodo(this.todo.id));
    } else {
      this.store.dispatch(updateTodo(this.todo.id, { title: this.editText.trim() }));
    }
    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }
}
