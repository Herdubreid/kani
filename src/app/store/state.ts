import { INavState, initialNavState } from './nav-state';
/**
 * Application State
 */
export enum SUITS {
    hearts = 'hearts',
    spades = 'spades',
    clubs = 'clubs',
    diamonds = 'diamonds'
}
export enum BIDS {
    _8 = 8,
    _9 = 9,
    _10 = 10,
    _11 = 11,
    _12 = 12,
    _13 = 13,
    KANI = 50
}
export interface IBid {
    bid: BIDS;
    bonus: number;
}
export interface IPlayer {
    name: string;
    bonus: IBid[];
}
export interface IGame {
    bid: IBid;
    bidder: IPlayer;
    partner: IPlayer;
    success: boolean;
}
export interface IAppState {
    games: IGame[];
    players: IPlayer[];
}
export interface IState {
    nav: INavState;
    app: IAppState;
}
export const initialBids: IBid[] = [
    { bid: BIDS._8, bonus: 0 },
    { bid: BIDS._9, bonus: 0 },
    { bid: BIDS._10, bonus: 0 },
    { bid: BIDS._11, bonus: 0 },
    { bid: BIDS._12, bonus: 0 },
    { bid: BIDS._13, bonus: 0 },
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
