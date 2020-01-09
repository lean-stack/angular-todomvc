import {EventEmitter, Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {StoreService} from '../state/store.service';
import {VisibilityFilter} from '../models/visibility-filter.enum';
import {ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisibilityFilterService {

  filterChanged = new ReplaySubject();

  constructor(private store: StoreService, private location: Location) {
    location.subscribe((ev) => {
      if (ev.type === 'popstate') {
        this.initialize();
      }
    });
  }

  initialize() {
    const currentPath = this.location.path();
    this.store.state.visibility = this.mapPathToFilter(currentPath);
    this.filterChanged.next();
  }

  private mapPathToFilter(path: string): VisibilityFilter {
    switch (path) {
      case '/active':
        return VisibilityFilter.Active;
      case '/completed':
        return VisibilityFilter.Completed;
      default:
        return VisibilityFilter.All;
    }
  }
}
