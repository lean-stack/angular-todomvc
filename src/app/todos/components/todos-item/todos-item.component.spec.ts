import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosItemComponent } from './todos-item.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Todo} from '../../models/todo';

describe('TodosItemComponent', () => {
  let component: TodosItemComponent;
  let fixture: ComponentFixture<TodosItemComponent>;

  const todoMock: Todo = { id: 42, title: 'Find the question!', completed: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosItemComponent ],
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
});
