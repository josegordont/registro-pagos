import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  rol: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const currentUserEncode = sessionStorage.getItem(btoa('currentUser'));
    if (currentUserEncode) {
      const currentUser: Usuario = JSON.parse(atob(currentUserEncode))
      this.rol = currentUser.rol;
    }
  }

  navegar(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

}
