import {Component, inject, OnInit, Output} from '@angular/core';
import {DefaultClass} from "../../../classes/default.class";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormModalComponent} from "./components/form-modal/form-modal.component";

@Component({
    selector: 'app-reminders',
    templateUrl: './reminders.component.html',
    styleUrl: './reminders.component.scss',
    providers: [MessageService, DialogService, DynamicDialogRef, ConfirmationService]
})
export class RemindersComponent extends DefaultClass implements OnInit {
    @Output() indexChanged: number | number[] = 0
    lastIndex: number | number[] = 0

    dialogRef: DynamicDialogRef | undefined
    dialogService = inject(DialogService)

    remindersLength = {
        today: '0',
        week: '0',
        month: '0'
    }

    ngOnInit() {

    }

    openNew() {
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
                this.lastIndex = this.indexChanged
                this.indexChanged = -1

                this.messageService.add({ severity: data?.severity ?? 'info', detail: data?.summary, life: 3000 });
                this.indexChanged = this.lastIndex
            }
        });
    }

    setRemindersIndex($event: number | number[]) {
        this.indexChanged  = $event
    }
}

export interface IReminder {
    id: number | null;
    user_id: number | null;
    reminder_type_id: string | null;
    title: string | null;
    body: string |  null;
    ends_at: string | null;
    period: string | null;
    reminder_date: string | null;
    status: boolean | null;
    repeat: boolean | null;
    reference: string | null;
    created_at: string | null;
    updated_at: string | null;
    group: IReminderGroup | null;
}

export interface IReminderGroup {
    id: number;
    starts_at: string;
    ends_at: string;
    created_at: string;
    updated_at: string;
    period: string | null;

}

export interface IReminders {
    label: string;
    data: IReminder[]
}
