import { Component, OnInit } from '@angular/core';
import {Todo} from '../../models/todo';

@Component({
  selector: 'todos-item',
  templateUrl: './todos-item.component.html',
  styleUrls: ['./todos-item.component.css']
})
export class TodosItemComponent implements OnInit {

  todo: Todo;

  // Component state
  editMode = false;
  editText = '';

  constructor() { }

  ngOnInit() {
    this.todo = { id: 17, title: 'Template Syntax', completed: false };
  }

  toggleCompletedState() {
    // TODO: Lokale Änderungen hier müssen an ein Backend weitergegeben werden.
    // Besser noch: die Komponente sollte das Todo nur "lesen". Änderungen
    // an zentraler Stelle druchführen
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
    console.log('TODO: delegate mutating of data to central state store');
    this.todo.title = this.editText;
    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }
}
