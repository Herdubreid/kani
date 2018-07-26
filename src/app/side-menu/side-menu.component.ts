import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import {IState} from '../store/state';
import {NavActions} from '../store/nav-actions';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  ngOnInit() {
  }
  navigate(page: string) {
    this.store.dispatch(new NavActions.NavigateAction(page));
  }
  constructor(
    private store: Store<IState>
  ) { }
}
