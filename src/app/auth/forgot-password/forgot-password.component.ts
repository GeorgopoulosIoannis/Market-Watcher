import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
	selector: 'mw-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	form;
	constructor(private auth: AuthService, private fb: FormBuilder) {
		this.form = fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
	}
	sendEmail(email) {
		this.auth.sendEmail(email).subscribe();
	}

	ngOnInit() {}
}
