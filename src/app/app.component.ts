import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {ptBr} from "../assets/data/lang/pt-br";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;

        this.primengConfig.setTranslation(ptBr);
    }
}
