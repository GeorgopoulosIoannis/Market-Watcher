import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Symbol } from '../symbols/symbol';
import { environment } from '../../environments/environment';
import { Series, DataItem } from '@swimlane/ngx-charts';
import { SymbolHistory } from './symbol-history';

@Injectable({
	providedIn: 'root'
})
export class DashboardService {
	constructor(private http: HttpClient) {}

	getWatchlist(): Observable<Symbol[]> {
		return this.http.get<Symbol[]>('api/watchlist');
	}

	getHistory(name, dateFrom, dateTo): Observable<any> {
		const params = new HttpParams()
			.set('symbol', name)
			.set('api_token', environment.apiToken)
			.set('date_from', dateFrom)
			.set('date_to', dateTo);
		return this.http.get<any>(environment.tradingApi + '/history', { params });
	}

	getIntraday(name, interval, range): Observable<any> {
		const params = new HttpParams()
			.set('symbol', name)
			.set('api_token', environment.apiToken)
			.set('interval', interval)
			.set('range', range);
		return this.http.get<any>(environment.intradayApi , { params });
	}

	formatDate(date) {
		let d = new Date(date);
		let month = '' + (d.getMonth() + 1);
		let day = '' + d.getDate();
		let year = d.getFullYear();

		if (month.length < 2) {
			month = '0' + month;
		}
		if (day.length < 2) {
			day = '0' + day;
		}
		return [year, month, day].join('-');
	}

	convertHistory(data: SymbolHistory): Series[] {
		const arr = Object.entries(data.history);
		arr.reverse();
		const dataItems: DataItem[] = arr.map(d => ({
			name: d[0].slice(5),
			value: Number(d[1].close)
		}));

		return [{ name: data.name, series: dataItems }];
	}
}
