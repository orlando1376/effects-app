import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { cargarUsuario, cargarUsuarioSuccess, cargarUsuarioError } from '../actions/user.actions';

export interface UserState {
    id: string;
    user: User;
    loaded: boolean;
    loading: boolean;
    error: any;
}

export const userInitialState: UserState = {
    id: null,
    user: null,
    loaded: false,
    loading: false,
    error: null
};

const _usuarioReducer = createReducer(userInitialState,

    on(cargarUsuario, (state, { id }) => ({
        ...state,
        loading: true,
        id
     })),

    on(cargarUsuarioSuccess, (state, { usuario } ) => ({
        ...state,
        loading: false,
        loaded: true,
        user: { ...usuario }
    })),

    on(cargarUsuarioError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        erro: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),

);

export function usuarioReducer(state, action) {
    return _usuarioReducer(state, action);
}
