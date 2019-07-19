import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Symbol } from './symbol';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SymbolsService {
	constructor(private http: HttpClient) {}

	getSymbols(searchString, pageToGet): Observable<Symbol[]> {
		const params = new HttpParams().set('currentPage', pageToGet).set('searchString', searchString);
		return this.http.get<Symbol[]>('api/symbol', { params });
	}
	getWatchlist(): Observable<Symbol[]> {
		return this.http.get<Symbol[]>('api/watchList');
	}
	saveWatchlist(watchlist): Observable<Symbol[]> {
		return this.http.post<any>('api/watchlist/save', watchlist);
	}
}
