import { Component, OnInit, HostListener } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/home', title: 'Home', icon: 'dashboard', class: '' },
  { path: '/entities', title: 'Entities', icon: 'person', class: '' },
  { path: '/bots', title: 'Bots', icon: 'smart_toy', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[] = [];
  isMobile = false;

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES;
    this.updateMobileStatus();
  }

 

  @HostListener('window:resize')
  updateMobileStatus(): void {
    this.isMobile = window.innerWidth <= 991;
  }

  isMobileMenu(): boolean {
    return this.isMobile;
  }
}
