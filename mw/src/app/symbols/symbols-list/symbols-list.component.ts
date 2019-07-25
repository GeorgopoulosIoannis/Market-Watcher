import { Component, OnInit, HostListener, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { Symbol } from '../symbol';
import { SymbolsService } from '../symbols.service';
import { SymbolsLayoutComponent } from '../symbols-layout/symbols-layout.component';

@Component({
	selector: 'mw-symbols-list',
	templateUrl: './symbols-list.component.html',
	styleUrls: ['./symbols-list.component.scss']
})
export class SymbolsListComponent implements OnInit {
	constructor(private service: SymbolsService) {}

	searchString = '';
	selectedFromSymbol;
	selectedName;
	symbolsArray = [];
	pageToGet = 1;

	pagesFetched: number;

	@Output() messageEvent = new EventEmitter<string>();
	sendMessage() {
		this.messageEvent.emit(this.selectedFromSymbol);
	}
	getSymbols(searchString, pageToGet) {
		this.service.getSymbols(searchString, pageToGet).subscribe(data => {
			data.forEach(element => {
				this.symbolsArray.push(element);
			});
		});
	}
	@HostListener('scroll', ['$event'])
	onScroll(event: any) {
		// visible height + pixel scrolled >= total height
		if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
			this.pageCounter();
			if (this.pageToGet !== this.pagesFetched) {
				this.service.getSymbols(this.searchString, this.pageToGet).subscribe(data => {
					data.forEach(element => {
						this.symbolsArray.push(element);
					});
				});
			}
		}
	}
	onKeyUp() {
		this.pageToGet = 1;
		this.symbolsArray.splice(0, this.symbolsArray.length);
		this.getSymbols(this.searchString, this.pageToGet);
	}
	pageCounter() {
		this.pagesFetched = Math.ceil(this.symbolsArray.length / 20);
		this.pageToGet = this.pagesFetched;
		if (this.symbolsArray.length % 20 === 0) {
			this.pageToGet = this.pagesFetched + 1;
		}
	}
	highlightRow(symbol) {
		this.selectedFromSymbol = symbol;
		this.selectedName = symbol.id;
		this.sendMessage();
	}
	ngOnInit() {
		this.getSymbols(this.searchString, this.pageToGet);
	}
}
