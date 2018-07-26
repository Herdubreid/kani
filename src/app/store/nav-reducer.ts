import { NavTypes, NavActions } from './nav-actions';
import { INavState, initialNavState } from './nav-state';
/**
 * Navigation Reducer
 */
export function navReducer(state = initialNavState, action: NavActions.AllActions): INavState {
    switch (action.type) {
        case NavTypes.TOGGLE_SIDENAV:
            return {
                ...state,
                sideNav: !state.sideNav
            };
        case NavTypes.SUIT:
            return {
                ...state,
                suit: action.suit
            };
        case NavTypes.NEXT_SUIT:
            return {
                ...state,
                suit: (state.suit + 1) % 4
            };
        case NavTypes.LAST_SUIT:
            return {
                ...state,
                suit: state.suit ? state.suit - 1 : (state.suit + 3) % 4
            };
        case NavTypes.BID:
            return {
                ...state,
                bid: action.bid
            };
        case NavTypes.NEXT_BID:
            return {
                ...state,
                bid: state.bid < 13 ? state.bid + 1 : 50
            };
        case NavTypes.LAST_BID:
            return {
                ...state,
                bid: state.bid === 50 ? 13 : state.bid ? state.bid - 1 : state.bid
            };
        default:
            return state;
    }
}
