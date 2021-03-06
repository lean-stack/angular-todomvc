import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosItemComponent } from './todos-item.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Todo} from '../../models/todo';
import {StoreService} from '../../state/store.service';

describe('TodosItemComponent', () => {
  let component: TodosItemComponent;
  let fixture: ComponentFixture<TodosItemComponent>;

  const todoMock: Todo = { id: 42, title: 'Find the question!', completed: false };

  const storeServiceMock = jasmine.createSpyObj<StoreService>(['updateTodoTitle']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosItemComponent ],
      providers: [ { provide: StoreService, useValue: storeServiceMock } ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosItemComponent);
    component = fixture.componentInstance;
    component.todo = todoMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trim edited title text', () => {

    component.beginEdit();
    component.editText = '  Whitespace around  ';
    component.endEdit();

    expect(storeServiceMock.updateTodoTitle).toHaveBeenCalledWith(todoMock, 'Whitespace around');
  });
});
