import {Component, inject, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-option-dialog',
  standalone: true,
    imports: [
        ButtonDirective,
        NgForOf
    ],
  templateUrl: './option-dialog.component.html',
  styleUrl: './option-dialog.component.scss'
})
export class OptionDialogComponent implements OnInit {
    config = inject(DynamicDialogConfig)

    ngOnInit(): void {
    }

}
