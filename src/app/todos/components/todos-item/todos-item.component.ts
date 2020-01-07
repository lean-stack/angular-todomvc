import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  // View elements
  @ViewChild('editFld', { static: true })
  editFld: ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit() {
    this.todo = { id: 17, title: 'Template Syntax', completed: false };
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

    // TODO: gaining focus via timeout. Better way: custom directive
    setTimeout(() => { this.editFld.nativeElement.focus(); }, 0);
  }

  endEdit() {
    // Already left editmode via blur
    if (!this.editMode) {
      return;
    }

    console.log('TODO: delegate mutating of data to central state store');
    this.todo.title = this.editText;
    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }
}
