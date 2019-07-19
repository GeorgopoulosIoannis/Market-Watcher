import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { debug } from 'util';

@Component({
	selector: 'mw-dashboard-watchlist',
	templateUrl: './dashboard-watchlist.component.html',
	styleUrls: ['./dashboard-watchlist.component.scss']
})
export class DashboardWatchlistComponent implements OnInit {
	watchlist = [];
	symbolToFetch: string;
	selectedName: any;
	yesterday = this.service.formatDate(this.getYesterday());
	today = new Date();
	symbolsString: string;
	@Input() price: number;
	@Input() arrow: boolean;
	@Output() messageEvent = new EventEmitter<string>();

	constructor(private service: DashboardService) {}
	highlightRow(symbol) {
		this.sendMessage(symbol);
		this.symbolToFetch = symbol.name;
		this.selectedName = symbol.id;
	}
	sendMessage(message) {
		this.messageEvent.emit(message);
	}
	getYesterday() {
		const date = new Date();
		date.setDate(date.getDate() - 1);
		return date;
	}

	getHistoryForAll(list) {
		list.forEach(symbol => {
			this.service.getHistory(symbol.name, this.yesterday, this.yesterday).subscribe(res => {
				symbol.close = res.history[this.service.formatDate(this.yesterday)].close;
			});
		});
	}
	getTodayForAll(list) {
		let i = 0;
		list.forEach(symbol => {
			this.service.getIntraday(symbol.name, 60, 1).subscribe(res => {
				symbol.price = res.intraday[Object.keys(res.intraday)[i]].open;
				i++;

				console.log(res)
			});
		});
	}
	ngOnInit() {
		this.service.getWatchlist().subscribe(list => {
			this.watchlist = list;
			this.getHistoryForAll(this.watchlist);
			this.getTodayForAll(this.watchlist);
			this.sendMessage(this.watchlist[0]);
		});
	}
}
