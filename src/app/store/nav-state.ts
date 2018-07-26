import { IPlayer, IBid, SUITS, BIDS } from './defs';
/**
 * Navigation
 */
export interface INavState {
    sideNav: boolean;
    bidder: IPlayer;
    partner: IPlayer;
    bids: IBid[];
    bid: BIDS,
    suit: SUITS;
}
export const initialNavState: INavState = {
    sideNav: false,
    bidder: null,
    partner: null,
    bids: [],
    bid: BIDS.eight,
    suit: SUITS.hearts
};
