import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
	selector: 'mw-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	constructor(private auth: AuthService) {}
	logout() {
		this.auth.logout();
	}
	Authenticated() {

		return this.auth.isAuthenticated();
	}
	ngOnInit() {}
}
