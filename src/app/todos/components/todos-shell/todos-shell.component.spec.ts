import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosShellComponent } from './todos-shell.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Location} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';

describe('TodosShellComponent', () => {
  let component: TodosShellComponent;
  let fixture: ComponentFixture<TodosShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosShellComponent ],
      providers: [
        { provide: Location, useClass: SpyLocation }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
