import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Annyang, CommandOption } from 'annyang';
import * as d3 from 'd3';

declare const annyang: Annyang;
const STOP = 'stop';
const NEXT = 'next';
const LAST = 'last';

import { IState, IPlayer, IGame, NavActions, SUITS } from '../store';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild('game') gameElement: ElementRef;
  @ViewChild('spades') spades: ElementRef;
  width = 0;
  height = 0;
  radius = 0;
  margin = {
    top: 5,
    right: 10,
    bottom: 5,
    left: 10
  };
  cmds: CommandOption = {
    'select': () => console.log('Select'),
    'back': () => console.log('Back'),
    'yes': () => console.log('Yes'),
    'no': () => console.log('No'),
    STOP: () => this.store.dispatch(new NavActions.StopGameAction()),
    NEXT: () => this.store.dispatch(new NavActions.NextAction()),
    LAST: () => this.store.dispatch(new NavActions.LastAction())
  };
  dealer = 0;
  players: Observable<IPlayer[]>;
  games: Observable<IGame[]>;
  subs: Subscription[] = [];
  play(player: number) {
    console.log(player);
    /*this.store.dispatch(new NavActions.PlayGameAction({
      bid: BIDS._12,

    }));*/
  }
  rotate() {
    d3.select('.circle')
      .transition(d3.transition().duration(400))
      .attr('transform', `translate(${this.width / 2},${this.height / 2}) rotate(${(this.dealer + 1) * -90 % 360 - 45})`);
    const suit = d3.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);
    d3.selectAll<d3.BaseType, any>('.suit')
      .transition(d3.transition().duration(300))
      .attr('transform', d => `translate(${suit.centroid(d)}) rotate(${(this.dealer + 1) * 90 % 360 + 45})`)
      .select('img')
      .attr('margin', 'auto')
      .attr('height', this.radius / 2)
      .style('top', `-${this.radius / 4}px`)
      .style('left', `-${this.radius / 4}px`);
  }
  ngOnInit() {
    this.width = this.gameElement.nativeElement.clientWidth - this.margin.left - this.margin.right;
    this.height = this.gameElement.nativeElement.clientHeight - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2 * .7;
    const svg = d3.select('svg')
      .attr('width', this.width)
      .attr('height', this.height);
    const g = svg
      .append('g')
      .attr('class', 'circle')
      .attr('radius', this.radius);
    const pie = d3.pie<SUITS>()
      .value(_ => 1);
    const path = d3.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);
    const arc = g.selectAll('.arc')
      .data(pie([SUITS.hearts, SUITS.spades, SUITS.diamonds, SUITS.clubs]))
      .enter().append('g')
      .attr('class', 'arc');
    arc.append('path')
      .attr('d', <any>path)
      .attr('fill', 'none');
    /*arc.append('foreignObject')
      .attr('class', 'suit')
      .append('img')
      .attr('height', this.radius / 2)
      .attr('width', this.radius / 2)
      .attr('src', d => `/assets/${d.data}.svg`)
      .style('margin', 'auto')
      .style('position', 'relative')
      .style('top', `-${this.radius / 4}px`)
      .style('left', `-${this.radius / 4}px`);*/
    arc.append('svg:foreignObject')
      .attr('class', 'suit')
      .html(d => `<img style="position:relative;" src="/assets/${d.data}.svg">`);
    this.rotate();
    this.subs.push(this.store.select(s => s.nav.games % 4)
      .subscribe(d => {
        this.dealer = d;
        this.rotate();
      }));
    annyang.addCommands(this.cmds);
    annyang.start({ continuous: false });
  }
  ngOnDestroy() {
    annyang.removeCommands([STOP, NEXT, LAST]);
    annyang.abort();
    this.subs.forEach(s => s.unsubscribe());
  }
  constructor(
    private store: Store<IState>
  ) {
    this.players = store.select(s => s.app.players);
    this.games = store.select(s => s.app.games);
  }
}
