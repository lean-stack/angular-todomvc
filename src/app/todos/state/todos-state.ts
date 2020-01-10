import {Todo} from '../models/todo';
import {VisibilityFilter} from '../models/visibility-filter.enum';

export interface TodosState {
  todos: Todo[];
  visibility: VisibilityFilter;
}
