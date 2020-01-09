import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosMainComponent } from './todos-main.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Location} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';

describe('TodosMainComponent', () => {
  let component: TodosMainComponent;
  let fixture: ComponentFixture<TodosMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosMainComponent ],
      providers: [
        { provide: Location, useClass: SpyLocation }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
