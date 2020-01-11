export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoChanges {
  title?: string;
  completed?: boolean;
}
