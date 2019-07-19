import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(
		private storage: StorageService,
		private http: HttpClient,
		private router: Router,
		private jwtHelper: JwtHelperService
	) {}

	login(credentials): Observable<string> {
		return this.http.post<string>(`api/user/login`, credentials);
	}

	register(credentials): Observable<string> {
		return this.http.post<string>('api/user/register', credentials);
	}
	getToken(data): Observable<string> {
		return this.http.post<string>(`api/user/ConfirmEmail`, data);
	}
	authenticate(jwt) {
		if (!this.jwtHelper.isTokenExpired(jwt)) {
			this.storage.set('token', jwt);
			this.router.navigate(['/symbols']);
		}
	}
	sendEmail(credentials): Observable<string> {
		return this.http.post<any>('api/user/ForgotPassword', credentials);
	}
	resetPassword(resetPasswordCredentials): Observable<string> {
		return this.http.post<any>('api/user/ResetPassword', resetPasswordCredentials);
	}
	isAuthenticated(): boolean {
		const token = this.storage.get('token');
		if (this.jwtHelper.isTokenExpired(token) || token == null) {
			return false;
		}
		return true;
	}

	// register(credentials) {
	// 	this.http.post<any>(`https://localhost:44388/api/user/register`, credentials).subscribe();

	// 	this.router.navigate(['/']);
	// }

	logout() {
		this.storage.clear();
	}
}
