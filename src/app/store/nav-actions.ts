import { Action } from '@ngrx/store';

import { IGame, BIDS, SUITS } from './defs';
/**
 * Navigation Actions
 */
export enum NavTypes {
    NAVIGATE = 'NAV_NAVIGATE',
    TOGGLE_SIDENAV = 'NAV_TOGGLE_SIDENAV',
    BIDDER = 'NAV_BIDDER',
    PLAY_GAME = 'NAV_PLAY_GAME',
    GAME_FINISED = 'NAV_GAME_FINISHED',
    SUIT = 'NAV_SUIT',
    NEXT_SUIT = 'NAV_NEXT_SUIT',
    LAST_SUIT = 'NAV_LAST_SUIT',
    BID = 'NAV_BID',
    NEXT_BID = 'NAV_NEXT_BID',
    LAST_BID = 'NAV_LAST_BID'
}
export namespace NavActions {
    export class NavigateAction implements Action {
        readonly type = NavTypes.NAVIGATE;
        constructor(public page: string) {}
    }
    export class ToggleSideNavAction implements Action {
        readonly type = NavTypes.TOGGLE_SIDENAV;
        constructor() { }
    }
    export class BidderAction implements Action {
        readonly type = NavTypes.BIDDER;
        constructor(public bidder: number) { }
    }
    export class PlayGameAction implements Action {
        readonly type = NavTypes.PLAY_GAME;
        constructor(public game: IGame) { }
    }
    export class GameFinishedAction implements Action {
        readonly type = NavTypes.GAME_FINISED;
        constructor(public success: boolean) { }
    }
    export class SuitAction implements Action {
        readonly type = NavTypes.SUIT;
        constructor(public suit: SUITS) { }
    }
    export class NextSuitAction implements Action {
        readonly type = NavTypes.NEXT_SUIT;
        constructor() { }
    }
    export class LastSuitAction implements Action {
        readonly type = NavTypes.LAST_SUIT;
        constructor() { }
    }
    export class BidAction implements Action {
        readonly type = NavTypes.BID;
        constructor(public bid: BIDS) { }
    }
    export class NextBidAction implements Action {
        readonly type = NavTypes.NEXT_BID;
        constructor() { }
    }
    export class LastBidAction implements Action {
        readonly type = NavTypes.LAST_BID;
        constructor() { }
    }
    export type AllActions =
        NavigateAction |
        ToggleSideNavAction |
        PlayGameAction |
        GameFinishedAction |
        SuitAction |
        NextSuitAction |
        LastSuitAction |
        BidAction |
        NextBidAction |
        LastBidAction;
}
