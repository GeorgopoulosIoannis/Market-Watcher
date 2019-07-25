import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(req, next) {
		if (req.url.indexOf('worldtradingdata') > -1) {
			return next.handle(req);
		} else {
			const token = localStorage.getItem('token');

			const authRequest = req.clone({
				headers: req.headers.set('Authorization', `Bearer ${token}`)
			});
			return next.handle(authRequest);
		}
	}
}
