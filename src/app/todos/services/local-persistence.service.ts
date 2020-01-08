import { Injectable } from '@angular/core';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class LocalPersistenceService {

  constructor() { }

  getAll() {
    return this.loadTodos();
  }

  create(title: string) {
    const newTodo: Todo = { id: this.generateId(), title, completed: false };

    const todos  = this.loadTodos();
    todos.push(newTodo);
    this.saveTodos(todos);

    return newTodo;
  }

  update(id: number, changes: { title?: string; completed?: boolean; }) {
    const todos = this.loadTodos();

    const todo = todos.find(t => t.id === id);
    Object.assign(todo, changes);
    this.saveTodos(todos);

    return todo;
  }

  remove(id: number) {
    const todos = this.loadTodos();

    const ix = todos.findIndex(t => t.id === id);
    todos.splice(ix, 1);
    this.saveTodos(todos);
  }

  private loadTodos(): Todo[] {
    return JSON.parse(localStorage.todos || '[]');
  }

  private saveTodos(todos: Todo[]) {
    localStorage.todos = JSON.stringify(todos);
  }

  private generateId(): number {
    const id = JSON.parse(localStorage.nextId || '1');
    localStorage.nextId = id + 1;
    return id;
  }
}
