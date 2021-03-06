import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosInputComponent } from './todos-input.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('TodosInputComponent', () => {
  let component: TodosInputComponent;
  let fixture: ComponentFixture<TodosInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosInputComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
