import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(public auth: AuthService, public router: Router) {}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.auth.isAuthenticated()) {
			// authorised so return true
			return true;
		}
		// not logged in so redirect to login page with the return url
		this.router.navigate(['/login']);
	}
}
