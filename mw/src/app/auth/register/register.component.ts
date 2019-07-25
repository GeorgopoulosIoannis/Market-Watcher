import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
	selector: 'mw-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	form;
	code: string;
	description: string;
	showSuccess = false;
	showError = false;

	constructor(private auth: AuthService, private fb: FormBuilder, private storageService: StorageService) {
		this.form = fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	register(credentials) {
		this.auth.register(credentials).subscribe(
			res => {
				this.showSuccess = true;
				this.showError = false;
			},
			error => {
				this.code = error.error[0].code;
				this.description = error.error[0].description;
				this.showError = true;
			}
		);
	}

	ngOnInit() {}
}
