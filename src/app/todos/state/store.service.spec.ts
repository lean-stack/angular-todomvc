import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';

describe('StoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  let service: StoreService;

  beforeEach(() => {
    service = TestBed.get(StoreService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete all completed todos', () => {
    localStorage.clear();
    service.createTodo('One');
    service.createTodo('Two');
    service.createTodo('Three');
    service.createTodo('Four');
    service.toggleTodoCompletedState(service.state.todos[0]);
    service.toggleTodoCompletedState(service.state.todos[1]);
    service.toggleTodoCompletedState(service.state.todos[3]);

    service.destroyAllCompletedTodos();

    expect(service.state.todos.length).toBe(1);
  });
});
