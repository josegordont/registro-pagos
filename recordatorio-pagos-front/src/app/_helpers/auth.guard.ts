import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Usuario } from '../model/usuario';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUserEncode = sessionStorage.getItem(btoa('currentUser'));
        if (currentUserEncode) {
            const currentUser: Usuario = JSON.parse(atob(currentUserEncode));
            if (route.data['roles'] && route.data['roles'].indexOf(currentUser.rol) === -1) {
                this.router.navigate(['/']);
                return false;
            }
            return true;
        }
        this.router.navigateByUrl('/login');
        return false;
    }
}