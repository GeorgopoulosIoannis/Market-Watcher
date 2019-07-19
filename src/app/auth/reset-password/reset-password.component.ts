import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'mw-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
	form;
	constructor(private activatedRoute: ActivatedRoute, private auth: AuthService, private fb: FormBuilder) {
		this.activatedRoute.queryParams.subscribe(params => {
			this.form = fb.group({
				password: ['', Validators.required],
				userId: [params['userId']],
				code: [params['code']]
			});
		});
	}
	resetPassword(values) {
		this.auth.resetPassword(values).subscribe(res => {
			this.auth.authenticate(res);

		});
	}
	ngOnInit() {}
}
