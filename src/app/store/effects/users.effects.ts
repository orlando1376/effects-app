import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions/users.actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {
    constructor(
        private actions$: Actions,
        private usuarioService: UserService
    ) {}

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios ),
            mergeMap(
                () => this.usuarioService.getUsers()
                    .pipe(
                        map( users => usuariosActions.cargarUsuariosSuccess({ usuarios: users }) ),
                        catchError (err => of(usuariosActions.cargarUsuariosError({ payload: err})) )
                    )
            )
        )
    );
}
