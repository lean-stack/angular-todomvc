import {Todo} from '../models/todo';
import {VisibilityFilter} from '../models/visibility-filter.enum';
import {Observable} from 'rxjs';

export interface TodosState {
  todos$: Observable<Todo[]>;
  visibility$: Observable<VisibilityFilter>;
}
