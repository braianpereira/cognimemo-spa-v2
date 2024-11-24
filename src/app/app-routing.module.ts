import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './views/pages/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {BaseComponent} from "./layout/base/base.component";
import {authGuard} from "./auth/auth.guard";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: BaseComponent,
                children: [
                    {
                        path: '', component: AppLayoutComponent,
                        canActivate: [authGuard],
                        children: [
                            { path: '', loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
                            { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                            { path: 'reminders', loadChildren: () => import('./views/pages/reminders/reminders.module').then(m => m.RemindersModule),
                                data: {
                                    title: 'Lembretes'
                                }
                            },
                        ]
                    },
                    {
                        path: 'login',
                        loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
                        data: {
                            title: 'Login Page'
                        }
                    },
                    {
                        path: 'register',
                        loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
                        data: {
                            title: 'Register Page'
                        }
                    },
                    { path: 'notfound', component: NotfoundComponent },
                    { path: '**', redirectTo: '/notfound' },
                ]
            },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
