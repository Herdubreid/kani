import { Action } from '@ngrx/store';

import { IGame } from './state';
/**
 * Navigation Actions
 */
export enum NavTypes {
    START_GAME = 'NAV_START_GAME',
    STOP_GAME = 'NAV_STOP_GAME',
    TOGGLE_SIDENAV = 'NAV_TOGGLE_SIDENAV',
    BIDDER = 'NAV_BIDDER',
    PLAY_GAME = 'NAV_PLAY_GAME',
    GAME_FINISED = 'NAV_GAME_FINISHED',
    NEXT = 'NAV_NEXT',
    LAST = 'NAV_LAST'
}
export namespace NavActions {
    export class StartGameAction implements Action {
        readonly type = NavTypes.START_GAME;
    }
    export class StopGameAction implements Action {
        readonly type = NavTypes.STOP_GAME;
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
    export class NextAction implements Action {
        readonly type = NavTypes.NEXT;
        constructor() { }
    }
    export class LastAction implements Action {
        readonly type = NavTypes.LAST;
        constructor() { }
    }
    export type AllActions =
        StartGameAction |
        StopGameAction |
        ToggleSideNavAction |
        PlayGameAction |
        GameFinishedAction |
        NextAction |
        LastAction;
}
