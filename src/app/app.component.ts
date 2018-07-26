import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { IState } from './store/state';
import { NavActions } from './store/nav-actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sideNav: Observable<boolean>;
  toggleSideNav() {
    this.store.dispatch(new NavActions.ToggleSideNavAction());
  }
  ngOnInit() {
  }
  constructor(
    private store: Store<IState>
  ) {
    this.sideNav = store.select(s => s.nav.sideNav);
  }
}
