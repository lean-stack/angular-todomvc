import {Injectable} from '@angular/core';
import {Todo} from '../models/todo';
import {VisibilityFilter} from '../models/visibility-filter.enum';

@Injectable({
  providedIn: 'root'
})
export class TodosStateService {

  todos: Todo[];
  visibility: VisibilityFilter;

  constructor() {
    this.todos = [];
    this.visibility = VisibilityFilter.All;
  }
}
