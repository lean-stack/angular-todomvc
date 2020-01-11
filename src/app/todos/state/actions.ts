import {VisibilityFilter} from '../models/visibility-filter.enum';
import {TodoChanges} from '../models/todo';

export enum ActionType {
  Create = '[TODO] Create',
  Update = '[TODO] Update',
  Remove = '[TODO] Remove',
  RemoveCompleted = '[Todo] Remove All Completed',
  SyncAll = '[Todo] Sync All Completed States',
  SetVisibility = '[Visibility] Change Filter'
}

export class ActionBase {
  type: string;
}

export class CreateAction extends ActionBase {
  type: ActionType.Create;
  title: string;
}

export class UpdateAction extends ActionBase {
  type: ActionType.Update;
  id: number;
  changes: TodoChanges;
}

export class RemoveAction extends ActionBase {
  type: ActionType.Remove;
  id: number;
}

export class RemoveAllCompletedAction  extends ActionBase {
  type: ActionType.RemoveCompleted;
}

export class SyncAllAction extends ActionBase {
  type: ActionType.SyncAll;
  completed: boolean;
}

export class SetVisibilityAction extends ActionBase {
  type: ActionType.SetVisibility;
  filter: VisibilityFilter;
}

export type Action =
  CreateAction | UpdateAction | RemoveAction | RemoveAllCompletedAction | SyncAllAction | SetVisibilityAction;

export const createTodo = (title: string): CreateAction => ({ type: ActionType.Create, title });
export const updateTodo = (id: number, changes: TodoChanges): UpdateAction => ({ type: ActionType.Update, id, changes });
export const removeTodo = (id: number): RemoveAction => ({ type: ActionType.Remove, id });
export const removeCompletedTodos = (): RemoveAllCompletedAction => ({ type: ActionType.RemoveCompleted });
export const syncAllTodos = (completed: boolean): SyncAllAction => ({ type: ActionType.SyncAll, completed });
export const setVisibility = (filter: VisibilityFilter): SetVisibilityAction => ({ type: ActionType.SetVisibility, filter });
