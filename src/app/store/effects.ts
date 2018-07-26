import { Injectable } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/Operators';

import { NavActions, NavTypes } from './nav-actions';
/**
 * App Effects
 */
@Injectable()
export class EffectsService {
    @Effect()
    navigate$ = this.actions$.ofType<NavActions.NavigateAction>(NavTypes.NAVIGATE)
        .pipe(
            map(action => action.page),
            tap(page => this.router.navigate([page])),
            switchMap(_ => of(new NavActions.ToggleSideNavAction()))
        );
    constructor(
        private router: Router,
        private actions$: Actions
    ) { }
}
