import { createReducer, on } from '@ngrx/store';
import { cargarUsuarios, cargarUsuariosSuccess, cargarUsuariosError } from '../actions';
import { User } from '../../models/user.model';

export interface UsersState {
    users: User[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

export const usersInitialState: UsersState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
};

const _usuariosReducer = createReducer(usersInitialState,

    on(cargarUsuarios, state => ({ ...state, loading: true })),

    on(cargarUsuariosSuccess, (state, { usuarios } ) => ({
        ...state,
        loading: false,
        loaded: true,
        users: [ ...usuarios ]
    })),

    on(cargarUsuariosError, (state, { payload }) => ({
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

export function usuariosReducer(state, action) {
    return _usuariosReducer(state, action);
}
