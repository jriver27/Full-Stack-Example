import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['../../node_modules/primeng/resources/primeng.min.css',
        '../../node_modules/font-awesome/css/font-awesome.min.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    title = 'Samples';
    activeItem: MenuItem;

    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'Dashboard', icon: 'fa-globe', routerLink: ['dashboard'], command: (event) => {
                    this.activeItem = this.items[0];
                }
            },
            {
                label: 'Samples', icon: 'fa-bar-chart', routerLink: ['samples'], command: (event) => {
                    this.activeItem = this.items[1];
                }
            },
            {
                label: 'Users', icon: 'fa-users', routerLink: ['users'], command: (event) => {
                    this.activeItem = this.items[2];
                }
            }];

        if (this.activeItem === null) {
            this.activeItem = this.items[0];
        }
    }
}
