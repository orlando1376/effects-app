import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit {

  usuarios: User[] = [];
  constructor( public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers()
    .subscribe( users => {
      console.log(users);
      this.usuarios = users;
    });
  }

}
