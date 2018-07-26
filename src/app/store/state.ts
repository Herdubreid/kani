import { IGame, IPlayer, IBid, BIDS } from './defs';
import { INavState, initialNavState } from './nav-state';
/**
 * Application State
 */
export interface IAppState {
    games: IGame[];
    players: IPlayer[];
}
export interface IState {
    nav: INavState;
    app: IAppState;
}
export const initialBids: IBid[] = [
    { bid: BIDS.eight, bonus: 0 },
    { bid: BIDS.nine, bonus: 0 },
    { bid: BIDS.ten, bonus: 0 },
    { bid: BIDS.eleven, bonus: 0 },
    { bid: BIDS.twelve, bonus: 0 },
    { bid: BIDS.thirteen, bonus: 0 },
    { bid: BIDS.KANI, bonus: 0 }
];
export const initialAppState: IAppState = {
    games: [],
    players: [
        { name: '1st', bonus: initialBids },
        { name: '2nd', bonus: initialBids },
        { name: '3rd', bonus: initialBids },
        { name: '4th', bonus: initialBids }
    ]
};
export const initialState: IState = {
    nav: initialNavState,
    app: initialAppState
};
