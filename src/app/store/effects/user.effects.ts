import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private usuarioService: UserService
    ) {}

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuario ),
            mergeMap(
                ( action ) => this.usuarioService.getUserById( action.id )
                    .pipe(
                        map( user => usuariosActions.cargarUsuarioSuccess({ usuario: user }) ),
                        catchError (err => of(usuariosActions.cargarUsuarioError({ payload: err})) )
                    )
            )
        )
    );
}
