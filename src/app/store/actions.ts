import { Action } from '@ngrx/store';

import { IGame } from './defs';
/**
 * App Actions
 */
export enum AppTypes {
    ADD_GAME = 'APP_ADD_GAME'
}
export namespace AppActions {
    export class AddGameAction implements Action {
        readonly type = AppTypes.ADD_GAME;
        constructor(public game:IGame) { }
    }
    export type AllActions =
        AddGameAction;
}
