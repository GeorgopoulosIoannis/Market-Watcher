import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DashboardWatchlistComponent } from './dashboard-watchlist/dashboard-watchlist.component';
import { HistoryChartComponent } from './dashboard-charts/history-chart/history-chart.component';
import { IntradayChartComponent } from './dashboard-charts/intraday-chart/intraday-chart.component';
import { LineChartModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		DashboardLayoutComponent,
		DashboardWatchlistComponent,
		HistoryChartComponent,
		IntradayChartComponent
	],
	imports: [CommonModule, LineChartModule, BrowserAnimationsModule]
})
export class DashboardModule {}
