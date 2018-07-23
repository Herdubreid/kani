import { NavTypes, NavActions } from './nav-actions';
import { INavState, initialNavState } from './nav-state';
/**
 * Navigation Reducer
 */
export function navReducer(state = initialNavState, action: NavActions.AllActions): INavState {
    switch (action.type) {
        case NavTypes.START_GAME:
            return initialNavState;
        case NavTypes.TOGGLE_SIDENAV:
            return {
                ...state,
                sideNav: !state.sideNav
            };
        case NavTypes.NEXT:
            return {
                ...state,
                games: state.games + 1
            };
        case NavTypes.LAST:
            return {
                ...state,
                games: state.games ? state.games - 1 : state.games
            };
        default:
            return state;
    }
}
