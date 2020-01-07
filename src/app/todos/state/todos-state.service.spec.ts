import { TestBed } from '@angular/core/testing';

import { TodosStateService } from './todos-state.service';

describe('TodosStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodosStateService = TestBed.get(TodosStateService);
    expect(service).toBeTruthy();
  });
});
