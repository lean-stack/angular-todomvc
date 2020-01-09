import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosActionbarComponent } from './todos-actionbar.component';
import {Location} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';
import {NO_ERRORS_SCHEMA, Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'pluralize' })
class PluralizePipeMock implements PipeTransform {
  transform(value: string) {
    return value;
  }
}

describe('TodosActionbarComponent', () => {
  let component: TodosActionbarComponent;
  let fixture: ComponentFixture<TodosActionbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosActionbarComponent, PluralizePipeMock ],
      providers: [
        { provide: Location, useClass: SpyLocation }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosActionbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
