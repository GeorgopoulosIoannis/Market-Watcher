import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	selector: 'mw-dashboard-layout',
	templateUrl: './dashboard-layout.component.html',
	styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
	constructor() {}
	parentSubject: Subject<any> = new Subject();

	notifyChildren(symbol) {
		this.parentSubject.next(symbol);
	}

	receiveMessage($event) {
		this.notifyChildren($event);
	}
	ngOnInit() {}
}
