import {Component, inject, OnInit, Output} from '@angular/core';
import {DefaultClass} from "../../../classes/default.class";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormModalComponent} from "../reminders/components/form-modal/form-modal.component";
import {ConfirmationService, MessageService} from "primeng/api";
import {DropdownChangeEvent} from "primeng/dropdown";

@Component({
    selector: 'app-advisors',
    templateUrl: './advisors.component.html',
    styleUrl: './advisors.component.scss',
    providers: [MessageService, DialogService, DynamicDialogRef, ConfirmationService]
})
export class AdvisorsComponent extends DefaultClass implements OnInit {
    @Output() indexChanged: number | number[] = 0
    lastIndex: number | number[] = 0

    dialogRef: DynamicDialogRef | undefined
    dialogService = inject(DialogService)

    //Coleção de orientados
    advisees = []
    //Orientado selecionado
    advisee: number = -1;

    remindersLength = {
        today: '0',
        week: '0',
        month: '0'
    }

    ngOnInit() {
        this.advisorService.get().subscribe({
            next: users => {
                this.advisees = users

                if (this.advisees.length > 0) {
                    this.advisee = this.advisees[0]
                    this.advisorService.setLocalAdvisee(this.advisees[0])
                }
            }
        })
    }

    openNew() {
        this.lastIndex = this.indexChanged
        this.indexChanged = -1

        this.dialogRef = this.dialogService.open(FormModalComponent, {
            header: 'Novo Lembrete',
            contentStyle: { overflow: 'auto' },
            width: '50vw',
            closable: false,
            height: '90vh',
            transitionOptions: '150ms cubic-bezier(0, 0, 0.2, 1)',
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            }
        })

        this.dialogRef.onClose.subscribe((data: any) => {
            if (data) {
                this.messageService.add({ severity: data?.severity ?? 'info', detail: data?.summary, life: 3000 });
                this.indexChanged = this.lastIndex
            }
        });
    }

    setRemindersIndex($event: number | number[]) {
        this.indexChanged  = $event
    }


    setUser($event: DropdownChangeEvent) {
        this.advisorService.setLocalAdvisee($event.value)
    }
}
