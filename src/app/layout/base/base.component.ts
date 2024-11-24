import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";
import {LoadingService} from "../../services/loading.service";
import {LoadingComponent} from "../../components/loading/loading.component";

@Component({
  selector: 'app-base',
  standalone: true,
    imports: [
        RouterOutlet,
        LoadingComponent,
        NgIf,
    ],
    providers: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent implements OnInit{
  loadingService = inject(LoadingService);
  isLoading: boolean = false;

  ngOnInit() {
    this.loadingService.isLoading$.subscribe((isLoading) => {
      setTimeout(() => {
        this.isLoading = isLoading;
      });
    });
  }

}
