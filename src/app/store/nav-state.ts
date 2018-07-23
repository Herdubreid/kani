import { IPlayer, IBid } from './state';
/**
 * Navigation
 */
export interface INavState {
    sideNav: boolean;
    bidder: IPlayer;
    bid: IBid,
    partner: IPlayer;
    bids: IBid[];
    games: number;
}
export const initialNavState: INavState = {
    sideNav: false,
    bidder: null,
    bid: null,
    partner: null,
    bids: [],
    games: 0
};
