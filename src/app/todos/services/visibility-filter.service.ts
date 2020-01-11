import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {StoreService} from '../state/store.service';
import {VisibilityFilter} from '../models/visibility-filter.enum';
import {setVisibility} from '../state/actions';

@Injectable({
  providedIn: 'root'
})
export class VisibilityFilterService {

  constructor(private store: StoreService, private location: Location) {
    location.subscribe((ev) => {
      if (ev.type === 'popstate') {
        this.setVisibility();
      }
    });
  }

  setVisibility() {
    const currentPath = this.location.path();
    this.store.dispatch(setVisibility(this.mapPathToFilter(currentPath)));
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
