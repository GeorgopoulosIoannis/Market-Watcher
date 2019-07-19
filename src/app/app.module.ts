import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { SymbolsModule } from './symbols/symbols.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, SharedModule, AuthModule, SymbolsModule, DashboardModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
