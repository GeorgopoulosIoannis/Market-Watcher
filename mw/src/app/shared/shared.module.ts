import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import {RouterModule} from '@angular/router'

@NgModule({
	declarations: [HeaderComponent, SideMenuComponent],
	imports: [CommonModule,RouterModule],
	exports:[SideMenuComponent,HeaderComponent]
})
export class SharedModule {}
