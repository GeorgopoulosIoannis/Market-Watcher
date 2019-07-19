import { Component, OnInit, Input } from '@angular/core';
import { SymbolsService } from '../symbols.service';

@Component({
	selector: 'mw-symbols-watchlist',
	templateUrl: './symbols-watchlist.component.html',
	styleUrls: ['./symbols-watchlist.component.scss']
})

export class SymbolsWatchlistComponent implements OnInit {
	@Input() selectedFromSymbol: Symbol;

	watchlist = [];
	selectedFromWatchlist: any;
	watchlistName: any;

	constructor(private service: SymbolsService) {}

	ngOnInit() {
		this.getWatchlist();
	}
	getWatchlist() {
		this.service.getWatchlist().subscribe(data => {
			this.watchlist = data;
		});
	}
	saveWatchlist() {
		debugger
		this.service.saveWatchlist(this.watchlist).subscribe(res => {
			console.log(res);
		});
	}
	selectWatchlist(item) {
		this.selectedFromWatchlist = item;
		this.watchlistName = item.id;
	}
	removeFromWatchlist() {
		const index = this.watchlist.indexOf(this.selectedFromWatchlist);
		if (index !== -1) {
			this.watchlist.splice(index, 1);
		}
		this.watchlistName = null;
	}
	addToWatchlist() {
		if (
		  !(this.watchlist.indexOf(this.selectedFromSymbol) > -1) &&
		  this.watchlist.length <= 5
		) {
		  this.watchlist.push(this.selectedFromSymbol);
		}
	  }
}
