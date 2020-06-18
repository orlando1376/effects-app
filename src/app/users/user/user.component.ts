import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { cargarUsuario } from 'src/app/store/actions';
import { User } from '../../models/user.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  usuario: User;


  constructor( private router: ActivatedRoute,
               private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('usuario').subscribe( ({ user }) => {
        this.usuario = user;
    });

    this.router.params.subscribe( ({ id }) => {
      this.store.dispatch( cargarUsuario({ id }) );
    });
  }

}
