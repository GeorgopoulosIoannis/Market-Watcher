import { Component, OnInit, Input } from '@angular/core';
import { Series } from '@swimlane/ngx-charts';
import { DashboardService } from '../../dashboard.service';
import { getLocaleDateTimeFormat } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
	selector: 'mw-history-chart',
	templateUrl: './history-chart.component.html',
	styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit {
	@Input() parentSubject: Subject<any>;

	//// history chart configs
	view: any[] = [600, 400];
	historyStats: Series[];
	showXAxis = true;
	showYAxis = true;
	gradient = false;
	showLegend = true;
	legendTitle = 'Symbol';
	showXAxisLabel = false;
	xAxisLabel = 'Day of the Week';
	showYAxisLabel = true;
	yAxisLabel = 'Rate';
	autoScale = true;

	colorScheme = {
		domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
	};
	/// history chart connfigs end
	dateTo = this.service.formatDate(new Date());
	dateFrom = this.service.formatDate(this.dateMinusOneMonth());

	constructor(private service: DashboardService) {}

	getHistory(symbolToFetch) {
		this.service
			.getHistory(symbolToFetch, this.service.formatDate(this.dateFrom), this.service.formatDate(this.dateTo))
			.subscribe(data => {
				this.historyStats = this.service.convertHistory(data);
			});
	}
	dateMinusOneMonth() {
		let newDate = new Date();
		let month = newDate.getMonth();
		newDate.setMonth(month - 1);
		return newDate;
	}
	ngOnInit() {
		this.parentSubject.subscribe(event => {
			this.getHistory(event.name);
		});
	}
}
