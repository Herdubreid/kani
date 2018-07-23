import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Annyang, CommandOption, CommandOptionRegex } from 'annyang';

declare const annyang: Annyang;
const STOP = 'stop';
const NEXT = 'next';
const LAST = 'last';

import { IState, IPlayer, IGame, NavActions } from '../store';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  cmds: CommandOption = {
    'select': () => console.log('Select'),
    'back': () => console.log('Back'),
    'yes': () => console.log('Yes'),
    'no': () => console.log('No'),
    STOP: () => this.store.dispatch(new NavActions.StopGameAction()),
    NEXT: () => this.store.dispatch(new NavActions.NextAction()),
    LAST: () => this.store.dispatch(new NavActions.LastAction())
  };
  dealer: Observable<number>;
  players: Observable<IPlayer[]>;
  games: Observable<IGame[]>;
  play(player: number) {
    console.log(player);
    /*this.store.dispatch(new NavActions.PlayGameAction({
      bid: BIDS._12,

    }));*/
  }
  ngOnInit() {
    annyang.addCommands(this.cmds);
    annyang.start({ continuous: false });
  }
  ngOnDestroy() {
    annyang.removeCommands([STOP, NEXT, LAST]);
    annyang.abort();
  }
  constructor(
    private store: Store<IState>
  ) {
    this.dealer = store.select(s => s.nav.games % 4);
    this.players = store.select(s => s.app.players);
    this.games = store.select(s => s.app.games);
  }
}
