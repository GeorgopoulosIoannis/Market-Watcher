import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
		AuthenticateComponent,
		ForgotPasswordComponent,
		ResetPasswordComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		RouterModule,
		JwtModule.forRoot({
			config: {
				tokenGetter() {
					return localStorage.getItem('token');
				}
			}
		})
	],
	providers: [AuthService, JwtHelperService],
	exports: [LoginComponent]
})
export class AuthModule {}
