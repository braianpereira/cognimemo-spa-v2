import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './views/pages/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import {provideHttpClient, withInterceptors, withXsrfConfiguration} from "@angular/common/http";
import {httpXsrfInterceptor} from "./interceptors/http-xsrf.interceptor";
import {authInterceptor} from "./interceptors/auth.interceptor";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,
        provideHttpClient(
            withXsrfConfiguration({cookieName: 'XSRF-TOKEN', headerName: 'Xsrf-headers'}),
            withInterceptors([httpXsrfInterceptor, authInterceptor])
        ), provideAnimationsAsync(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
