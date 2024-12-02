import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Table} from "primeng/table";
import {IReminder, IReminders} from "../../reminders.component";
import {HttpErrorResponse} from "@angular/common/http";
import {DefaultClass} from "../../../../../classes/default.class";
import {RemindersService} from "../../../../../services/reminders.service";
import {FormModalComponent} from "../form-modal/form-modal.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AuthService} from "../../../../../auth/auth.service";
import {OptionDialogComponent} from "../option-dialog/option-dialog.component";
import {ReminderTypesService} from "../../../../../services/reminder_types.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends DefaultClass implements OnInit, OnChanges {
    @Input('section') section: string;
    @Input('opened') opened: boolean = false;
    @Output() length = new EventEmitter<string>();

    reminders: IReminders = { label: '', data: [] };
    remindersService = inject(RemindersService)

    remiderTypes = []
    reminderTypesService = inject(ReminderTypesService)

    dialogRef: DynamicDialogRef | undefined
    dialogService = inject(DialogService)
    authService = inject(AuthService);

    remindersIndex = 0

    cols: any[] = ['title', 'reminder_date', 'reminder_type_desc', 'repeat_desc'];
    @Input() advisee!: number;

    updateIndex(operation: 'reset' | 'increment' | 'decrement') {
        switch (operation) {
            case 'reset':
                this.remindersIndex = 0;
                break;
            case 'increment':
                this.remindersIndex++;
                break;
            case 'decrement':
                this.remindersIndex--;
                break;
        }
        this.loadItems();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    editReminder(reminder: IReminder) {
        this.dialogRef = this.dialogService.open(FormModalComponent, {
            header: 'Editar Lembrete',
            contentStyle: { overflow: 'auto' },
            width: '50vw',
            closable: false,
            height: '90vh',
            transitionOptions: '150ms cubic-bezier(0, 0, 0.2, 1)',
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            data: reminder
        })

        this.dialogRef.onClose.subscribe((data: any) => {
            if (data) {
                this.messageService.add({ severity: data?.severity ?? 'info', detail: data?.summary, life: 3000 });

                if (data.severity == 'success') { this.loadItems() }

            }
        });
    }

    deleteReminder(reminder: IReminder) {
        let buttons = [
            {
                label: "Cancelar",
                class: 'p-button-text btn-sm w-8rem',
                function: (action) => {
                    this.dialogRef.close({ severity: 'info', summary: 'Cancelada' });
                }
            },
            {
                label: reminder.repeat ? "Esse" : "Remover",
                class: 'p-button-help w-8rem',
                function: (action) => {
                    this.deleteReminderAction(reminder, 'maintain')
                }
            },
        ]

        if(reminder.repeat)
            buttons.push({
                label: "Todos",
                class: 'w-8rem',
                function: (action) => {
                    this.deleteReminderAction(reminder, 'removeAll')
                }
            })

        this.dialogRef = this.dialogService.open(OptionDialogComponent, {
            contentStyle: { overflow: 'auto' },
            showHeader: false,
            width: '30vw',
            closable: false,
            transitionOptions: '150ms cubic-bezier(0, 0, 0.2, 1)',
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            data: {
                header: "Confirmar",
                message: reminder.repeat ? "Remover apenas esse ou todos repetidos?" : "Tem certeza que quer remover?" ,
                buttons: buttons
            }
        })

        this.dialogRef.onClose.subscribe((data: any) => {
            if (data) this.messageService.add({ severity: data?.severity ?? 'info', detail: data?.summary, life: 3000 });
        });
    }

    private deleteReminderAction(reminder: IReminder, deleteAction: string) {
        this.authService.getCsrfToken().subscribe(token => {
            this.advisorService.advisee$.subscribe({
                next: (advisee) => {
                    if (advisee) {
                        this.remindersService.deleteAdvisee(reminder, deleteAction, advisee.id).subscribe({
                            next: () => {
                                this.messageService.add({severity: 'success', summary: 'Concluído', detail: 'Tarefa removida com sucesso'});
                                this.dialogRef.close();
                                this.loadItems();
                            },
                            error: () => {
                                this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao deletar o registro'});
                                this.dialogRef.close();
                            }
                        })
                    } else {
                        this.remindersService.delete(reminder, deleteAction).subscribe({
                            next: () => {
                                this.messageService.add({severity: 'success', summary: 'Concluído', detail: 'Tarefa removida com sucesso'});
                                this.dialogRef.close();
                                this.loadItems();
                            },
                            error: () => {
                                this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao deletar o registro'});
                                this.dialogRef.close();
                            }
                        })
                    }
                }
            })

        })
    }

    toggleReminder(reminder: IReminder) {
        let status = !reminder.status

        this.loadingService.show()

        this.advisorService.advisee$.subscribe({
            next: advisee => {
                if (advisee) {
                    this.remindersService.toggleStatusAdvisee({...reminder}, advisee.id).subscribe({
                        next: () => {
                            this.loadingService.hide()
                        },
                        error: (error: HttpErrorResponse) => {
                            this.messageService.add({
                                summary: "Erro ao salvar",
                                detail: "Se o erro persistir entre em contato com o suporte",
                                severity: 'error',
                            });
                            console.info(error)
                            reminder.status = status

                            this.loadingService.hide()
                        }
                    })
                } else {
                    this.remindersService.toggleStatus({...reminder}).subscribe({
                        next: () => {
                            this.loadingService.hide()
                        },
                        error: (error: HttpErrorResponse) => {
                            this.messageService.add({
                                summary: "Erro ao salvar",
                                detail: "Se o erro persistir entre em contato com o suporte",
                                severity: 'error',
                            });
                            console.info(error)
                            reminder.status = status

                            this.loadingService.hide()
                        }
                    })
                }
            }
        })
    }

    ngOnInit(): void {
        this.loadItems()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['opened'] && changes['opened'].previousValue == false && changes['opened'].currentValue == true) {
            this.opened = false;

            this.loadItems()
        }
    }

    private loadItems() {
        this.loadingService.show()

        this.advisorService.advisee$.subscribe({
            next: (user: any) => {
                if(user) {
                    this.remindersService.getAdvisee(this.remindersIndex, this.section, user.id).subscribe({
                        next: (reminders) => {
                            this.reminders = reminders
                            this.length.emit(`${reminders.data.length}`)
                        },
                        error: (error: HttpErrorResponse) => {
                            this.messageService.add({
                                detail: error.message,
                                severity: 'danger',
                            });
                            this.loadingService.hide()
                        }
                    })

                    this.reminderTypesService.getAdvisee(user.id).subscribe({
                        next: (types) => {
                            this.remiderTypes = types
                        },
                        error: (error: HttpErrorResponse) => {
                            this.messageService.add({
                                detail: error.message,
                                severity: 'danger',
                            });

                            this.loadingService.hide()
                        }
                    })
                } else {
                    this.remindersService.get(this.remindersIndex, this.section).subscribe({
                        next: (reminders) => {
                            this.reminders = reminders
                            this.length.emit(`${reminders.data.length}`)
                            this.loadingService.hide()
                        },
                        error: (error: HttpErrorResponse) => {
                            this.messageService.add({
                                detail: error.message,
                                severity: 'danger',
                            });
                            this.loadingService.hide()
                        }
                    })

                    this.reminderTypesService.get().subscribe({
                        next: (types) => {
                            this.remiderTypes = types
                        },
                        error: (error: HttpErrorResponse) => {
                            this.messageService.add({
                                detail: error.message,
                                severity: 'danger',
                            });

                            this.loadingService.hide()
                        }
                    })
                }
            }
        })
    }

}
