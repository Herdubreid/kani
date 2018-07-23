import { Injectable } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/Operators';

import { NavActions, NavTypes } from './nav-actions';
/**
 * App Effects
 */
@Injectable()
export class EffectsService {
    @Effect({ dispatch: false })
    startGame$ = this.actions$.ofType<NavActions.StartGameAction>(NavTypes.START_GAME)
        .pipe(
            tap(_ => this.nav.navigate(['game']))
        );
    @Effect({ dispatch: false })
    stopGame$ = this.actions$.ofType<NavActions.StopGameAction>(NavTypes.STOP_GAME)
        .pipe(
            tap(_ => this.nav.navigate(['home']))
        );
    constructor(
        private nav: Router,
        private actions$: Actions
    ) { }
}
