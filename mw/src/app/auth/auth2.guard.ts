import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard2 implements CanActivate {
	constructor(public auth: AuthService, public router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (!this.auth.isAuthenticated()) {
			return true;
		}
		this.router.navigate(['/symbols']);
		return false;
	}
}
