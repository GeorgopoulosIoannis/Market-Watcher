import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthenticateComponent } from './auth/authenticate/authenticate.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { SymbolsListComponent } from './symbols/symbols-list/symbols-list.component';
import { SymbolsWatchlistComponent } from './symbols/symbols-watchlist/symbols-watchlist.component';
import { SymbolsLayoutComponent } from './symbols/symbols-layout/symbols-layout.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'authenticate', component: AuthenticateComponent },
	{ path: 'resetPassword', component: ResetPasswordComponent },
	{ path: 'forgotPassword', component: ForgotPasswordComponent },
	{ path: 'symbols', component: SymbolsLayoutComponent },
	{ path: 'dashboard', component: DashboardLayoutComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
