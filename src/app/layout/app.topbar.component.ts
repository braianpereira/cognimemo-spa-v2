import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {environment} from "../../environments/environment";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];

    authService: AuthService = inject(AuthService);
    userService = inject(UserService);
    router: Router = inject(Router);

    user: any

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    perfilItems: MenuItem[] = [
        {
            separator: true,
            escape: true,
        },
        {
            label: 'Logout',
            icon: 'pi pi-logout',
            command: () => {
                this.logout();
            }
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

    ngOnInit(): void {
        this.userService.get().subscribe({
            next: (user) => {
                this.user = user
                this.userService.setLocalUser(user)
            }
        })
    }
}
