import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {StoreService} from '../../state/store.service';
import {VisibilityFilterService} from '../../services/visibility-filter.service';
import {createTodo} from '../../state/actions';

@Component({
  selector: 'todos-shell',
  templateUrl: './todos-shell.component.html',
  styleUrls: ['./todos-shell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosShellComponent implements OnInit {

  constructor(private store: StoreService, private visibilityFilterService: VisibilityFilterService) { }

  ngOnInit() {
    this.visibilityFilterService.setVisibility();
  }

  createTodo(title: string) {
    this.store.dispatch(createTodo(title));
  }

}
