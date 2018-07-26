/**
 * Definitions
 */
export enum SUITS {
    hearts,
    spades,
    diamonds,
    clubs,
}
export enum BIDS {
    eight = 8,
    nine,
    ten,
    eleven,
    twelve,
    thirteen,
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
