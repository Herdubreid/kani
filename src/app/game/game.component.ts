import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Annyang, CommandOption } from 'annyang';
import * as d3 from 'd3';

declare const annyang: Annyang;
const YES = 'yes';
const NO = 'no';
const HEARTS = 'hearts';
const SPADES = 'spades';
const DIAMONDS = 'diamonds';
const CLUBS = 'clubs';
const NEXT = 'next';
const LAST = 'last';
const HIGH = 'high';
const LOW = 'low';
const EIGHT = '8';
const NINE = '9';
const TEN = '10';
const ELEVEN = '11';
const TWELVE = '12';
const THIRTEEN = '13';
const FIFTY = '50';

import { SUITS, BIDS } from '../store/defs';
import { IState } from '../store/state';
import { NavActions } from '../store/nav-actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild('game', { static: true }) gameElement: ElementRef;
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
    HEARTS: () => this.store.dispatch(new NavActions.SuitAction(SUITS.hearts)),
    SPADES: () => this.store.dispatch(new NavActions.SuitAction(SUITS.spades)),
    DIAMONDS: () => this.store.dispatch(new NavActions.SuitAction(SUITS.diamonds)),
    CLUBS: () => this.store.dispatch(new NavActions.SuitAction(SUITS.clubs)),
    NEXT: () => this.store.dispatch(new NavActions.NextSuitAction()),
    LAST: () => this.store.dispatch(new NavActions.LastSuitAction()),
    HIGH: () => this.store.dispatch(new NavActions.NextBidAction()),
    LOW: () => this.store.dispatch(new NavActions.LastBidAction()),
    EIGHT: () => this.store.dispatch(new NavActions.BidAction(BIDS.eight)),
    NINE: () => this.store.dispatch(new NavActions.BidAction(BIDS.nine)),
    TEN: () => this.store.dispatch(new NavActions.BidAction(BIDS.ten)),
    ELEVEN: () => this.store.dispatch(new NavActions.BidAction(BIDS.eleven)),
    TWELVE: () => this.store.dispatch(new NavActions.BidAction(BIDS.twelve)),
    THIRTEEN: () => this.store.dispatch(new NavActions.BidAction(BIDS.thirteen)),
    FIFTY: () => this.store.dispatch(new NavActions.BidAction(BIDS.KANI)),
    YES: () => this.sb.open('Ok', '', { duration: 3000 }),
    NO: () => this.sb.open('Try again then', '', { duration: 3000 })
  };
  suit = SUITS.hearts;
  bid = BIDS.eight;
  subs: Subscription[] = [];
  rotate() {
    d3.select('.circle')
      .transition(d3.transition().duration(400))
      .attr('transform', `translate(${this.width / 2},${this.height / 2}) rotate(${this.suit * -90 - 45})`);
    const suit = d3.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);
    d3.selectAll<d3.BaseType, any>('.suit')
      .transition(d3.transition().duration(300))
      .attr('transform', d => `translate(${suit.centroid(d)}) rotate(${this.suit * 90 % 360 + 45})`)
      .select('img')
      .attr('margin', 'auto')
      .attr('height', this.radius / 2)
      .style('top', `-${this.radius / 4}px`)
      .style('left', `-${this.radius / 4}px`);
    d3.selectAll('.label')
      .transition(d3.transition().duration(300))
      .attr('transform', `rotate(${this.suit * 90 % 360 + 45})`)
      .attr('font-size', `${this.radius / 2}px`);
  }
  label() {
    d3.selectAll('.label')
      .text(this.bid.toString());
  }
  ngOnInit() {
    setTimeout(() => this.sb.open('Lets go...', '', { duration: 3000 }));
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
    arc.append('svg:foreignObject')
      .attr('class', 'suit')
      .html(d => `<img style="position:relative;" src="assets/${SUITS[d.data]}.svg">`);
    g.selectAll('.label')
      .data([this.bid])
      .enter().append('text')
      .attr('class', 'label')
      .attr('text-anchor', 'middle')
      .text(d => d.toString());
    this.rotate();
    this.subs.push(this.store.select(s => s.nav.suit)
      .subscribe(s => {
        this.suit = s;
        this.rotate();
      }));
    this.subs.push(this.store.select(s => s.nav.bid)
      .subscribe(b => {
        this.bid = b;
        this.label();
      }));
    annyang.addCallback('resultNoMatch', result => {
      console.log(result);
      setTimeout(() => this.sb.open(`Did you say ${result[0]}?`, '', {
        duration: 3000
      }));
    });
    annyang.addCommands(this.cmds);
    annyang.start({ continuous: false });
  }
  ngOnDestroy() {
    annyang.removeCommands([
      YES,
      NO,
      HEARTS,
      SPADES,
      DIAMONDS,
      CLUBS,
      NEXT,
      LAST,
      HIGH,
      LOW,
      EIGHT,
      NINE,
      TEN,
      ELEVEN,
      TWELVE,
      THIRTEEN,
      FIFTY
    ]);
    annyang.abort();
    this.subs.forEach(s => s.unsubscribe());
  }
  constructor(
    private router: Router,
    private sb: MatSnackBar,
    private store: Store<IState>
  ) {
  }
}
