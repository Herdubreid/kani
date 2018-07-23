import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Annyang, CommandOption } from 'annyang';

import { IState, NavActions } from '../store';

declare const annyang: Annyang;
const START = 'start';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  cmd: CommandOption = {
    START: () => this.store.dispatch(new NavActions.StartGameAction())
  };
  get isListening(): boolean { return annyang.isListening(); }
  toggle() {
    console.log(annyang.isListening());
    annyang.isListening() ? annyang.abort() : annyang.start({ continuous: false });
  }
  ngOnInit() {
    annyang.addCommands(this.cmd);
  }
  ngOnDestroy() {
    annyang.removeCommands(START);
  }
  constructor(
    private store: Store<IState>
  ) { }
}
