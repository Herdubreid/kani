import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { IState, IAppState, initialAppState } from './state';
import { AppActions, AppTypes } from './actions';
import { navReducer } from './nav-reducer';
/**
 * App Reducers
 */
export function appReducer(state = initialAppState, action: AppActions.AllActions): IAppState {
    switch (action.type) {
        case AppTypes.ADD_GAME:
            return {
                ...state,
                games: [...state.games, action.game]
            };
        default:
            return state;
    }
}
export const reducer: ActionReducerMap<IState> = {
    nav: navReducer,
    app: appReducer
};
export function localStorageSyncReducer(reducer: ActionReducer<any>) {
    return localStorageSync({ keys: ['app'], rehydrate: true, storageKeySerializer: () => 'cKani' })(reducer)
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
