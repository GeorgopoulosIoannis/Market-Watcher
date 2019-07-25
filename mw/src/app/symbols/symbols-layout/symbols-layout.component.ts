import { Component, OnInit, Output, HostListener } from '@angular/core';
import { EventEmitter } from 'events';
import { SymbolsService } from '../symbols.service';
import { SymbolsListComponent } from '../symbols-list/symbols-list.component';

@Component({
	selector: 'mw-symbols-layout',
	templateUrl: './symbols-layout.component.html',
	styleUrls: ['./symbols-layout.component.scss']
})
export class SymbolsLayoutComponent implements OnInit {
	selectedFromSymbol: Symbol;
	receiveMessage($event) {
		this.selectedFromSymbol = $event;
	}

	ngOnInit() {}
}
