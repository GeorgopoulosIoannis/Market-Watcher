import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
	selector: 'mw-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	form;
	showAlert = false;
	constructor(private auth: AuthService, private fb: FormBuilder, private storageService: StorageService) {
		this.form = fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
	}
	login(credentials) {
		this.auth.login(credentials).subscribe(
			jwt => {
				this.auth.authenticate(jwt);
			},
			error => {
				this.showAlert = true;
			}
		);
	}

	register(credentials) {
		this.auth.register(credentials);
	}
	ngOnInit() {}
}
