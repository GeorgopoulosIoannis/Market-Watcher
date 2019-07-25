import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Series } from '@swimlane/ngx-charts';
import { DashboardService } from '../../dashboard.service';

@Component({
	selector: 'mw-intraday-chart',
	templateUrl: './intraday-chart.component.html',
	styleUrls: ['./intraday-chart.component.scss']
})
export class IntradayChartComponent implements OnInit {
	@Input() parentSubject: Subject<any>;

	//// intraday chart configs
	view: any[] = [600, 400];
	intradayStats: Series[];
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
	/// intraday chart connfigs end

	getIntraday(symbolToFetch) {
		this.service.getIntraday(symbolToFetch, 60, 1).subscribe(data => {
			this.intradayStats = this.service.convertIntraday(data);
		});
	}

	constructor(private service: DashboardService) {}

	ngOnInit() {
		this.parentSubject.subscribe(event => {
			this.getIntraday(event.name);
		});
	}
}
