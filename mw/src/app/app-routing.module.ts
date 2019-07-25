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
import { AuthGuard } from './auth/auth.guard';
import { AuthGuard2 } from './auth/auth2.guard';

const routes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [AuthGuard2] },
	{ path: 'register', component: RegisterComponent, canActivate: [AuthGuard2] },
	{ path: 'authenticate', component: AuthenticateComponent, canActivate: [AuthGuard2] },
	{ path: 'resetPassword', component: ResetPasswordComponent, canActivate: [AuthGuard2] },
	{ path: 'forgotPassword', component: ForgotPasswordComponent, canActivate: [AuthGuard2] },
	{ path: 'symbols', component: SymbolsLayoutComponent, canActivate: [AuthGuard] },
	{ path: 'dashboard', component: DashboardLayoutComponent, canActivate: [AuthGuard] },
	{ path: '**', component: LoginComponent, canActivate: [AuthGuard2] },
	{ path: '', component: LoginComponent, canActivate: [AuthGuard2] },

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
