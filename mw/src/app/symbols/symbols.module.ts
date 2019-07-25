import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolsListComponent } from './symbols-list/symbols-list.component';
import { SymbolsLayoutComponent } from './symbols-layout/symbols-layout.component';
import { SymbolsWatchlistComponent } from './symbols-watchlist/symbols-watchlist.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [SymbolsListComponent, SymbolsLayoutComponent, SymbolsWatchlistComponent],
	imports: [CommonModule,FormsModule]
})
export class SymbolsModule {}
