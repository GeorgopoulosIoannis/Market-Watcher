import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolsWatchlistComponent } from './symbols-watchlist.component';

describe('SymbolsWatchlistComponent', () => {
  let component: SymbolsWatchlistComponent;
  let fixture: ComponentFixture<SymbolsWatchlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolsWatchlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolsWatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
