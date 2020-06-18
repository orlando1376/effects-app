import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { cargarUsuarios } from '../../store/actions/users.actions';
import { logging } from 'protractor';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit {

  usuarios: User[] = [];
  loading = false;
  error: any;

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('usuarios').subscribe( ({ users, loading, error }) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    });

    this.store.dispatch( cargarUsuarios() );
  }

}
