import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Todo} from '../../models/todo';

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

  constructor() { }

  ngOnInit() {
  }

  toggleCompletedState() {
    // TODO: Lokale Änderungen hier müssen an ein Backend weitergegeben werden.
    // Besser noch: die Komponente sollte das Item nur "lesen". Änderungen bitte an zentraler Stelle druchführen
    console.log('TODO: delegate mutating of data to central state store');
    this.todo.completed = !this.todo.completed;
  }

  destroyItem() {
    // TODO: natürlich können wir uns nicht selbst löschen. Nicht nur das Todo muss "weg", auch die Komponente ;-)
    console.log('TODO: delegate deleting of todo to central state store');
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
      console.log('TODO: delegate deleting of todo to central state store');
    } else {
      console.log('TODO: trim entered text')
      console.log('TODO: delegate mutating of data to central state store');
      this.todo.title = this.editText;
    }
    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }
}
