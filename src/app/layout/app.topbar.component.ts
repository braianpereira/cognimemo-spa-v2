import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    authService: AuthService = inject(AuthService);
    router: Router = inject(Router);

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    perfilItems: MenuItem[] = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Refresh',
                    icon: 'pi pi-refresh'
                },
                {
                    label: 'Export',
                    icon: 'pi pi-upload'
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-logout',
                    command: () => {
                        this.logout();
                    }
                }
            ]
        }
    ];

    constructor(public layoutService: LayoutService) { }

    private logout() {
        this.authService.logout().subscribe({
            next: () => {
                this.router.navigate(['/login']);
            }
        })
    }
}
