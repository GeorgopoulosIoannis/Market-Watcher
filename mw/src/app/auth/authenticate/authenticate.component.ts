import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
	selector: 'mw-authenticate',
	template: ''
})
export class AuthenticateComponent implements OnInit {
	constructor(private activatedRoute: ActivatedRoute, private auth: AuthService) {}

	ngOnInit() {
		// Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
		this.activatedRoute.queryParams.subscribe(params => {
			const userId = params['userId'];
			const code = params['code'];
			const data = { userId: userId, code: code };
			this.auth.getToken(data).subscribe(jwt => {
				this.auth.authenticate(jwt);
			});
		});
	}
}
