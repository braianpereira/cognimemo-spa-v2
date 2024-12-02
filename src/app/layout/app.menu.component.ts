import {inject, OnInit} from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {environment} from "../../environments/environment";
import {UserService} from "../services/user.service";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    userService = inject(UserService);
    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        let items = [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
            { label: 'Lembretes', icon: 'pi pi-fw pi-check-square', routerLink: ['/reminders'] },
        ]

        this.userService.user$.subscribe({
            next: (user) => {
                if (user && user.user_type !== 'user'){
                    items.push({ label: 'Orientados', icon: 'pi pi-fw pi-users', routerLink: ['/advisees'] })
                }
            }
        })


        this.model = [
            {
                label: 'Home',
                items: items
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline']
                    },
                ]
            },
        ];
    }
}
