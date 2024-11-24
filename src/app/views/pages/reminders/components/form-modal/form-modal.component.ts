import {booleanAttribute, Component, inject, OnInit} from '@angular/core';

import {
    AbstractControl,
    FormBuilder,
    FormControl,
    Validators
} from "@angular/forms";
import {RemindersService} from "../../../../../services/reminders.service";
import {AuthService} from "../../../../../auth/auth.service";
import {ReminderTypesService} from "../../../../../services/reminder_types.service";
import {getUTC3Date} from '@utils/dateUtils'
import {DefaultClass} from "../../../../../classes/default.class";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService} from "primeng/api";

@Component({
    selector: 'app-form-modal-reminder',
    templateUrl: './form-modal.component.html',
    styleUrl: './form-modal.component.scss'
})
export class FormModalComponent extends DefaultClass implements OnInit {
    reminderService = inject(RemindersService)
    reminderTypesService = inject(ReminderTypesService)
    authService = inject(AuthService)
    ref = inject(DynamicDialogRef)
    config = inject(DynamicDialogConfig)
    confirmationService = inject(ConfirmationService)
    fb = inject(FormBuilder)

    periods = [
        {description: 'Diariamente', value: 'daily'},
        {description: 'Semanalmente', value: 'weekly'},
        {description: 'Mensalmente', value: 'monthly'},
    ]

    types: IReminderType[] | undefined

    today = getUTC3Date()

    protected form = this.fb.group({
        title: new FormControl('', [Validators.required]),
        reminder_date: new FormControl(this.today, [Validators.required]),
        ends_at: new FormControl(this.today, [Validators.required]),
        reminder_type_id: new FormControl(1, [Validators.required]),
        body: new FormControl('', []),
        repeat: new FormControl(booleanAttribute(false), []),
        period: new FormControl('', []),
        city: new FormControl('', []),
    }, { validators: this.requiredWhenRepeatTrue })

    requiredWhenRepeatTrue(control: AbstractControl) {
        const repeat = control.get('repeat')?.value;
        const period = control.get('period');
        const endsAt = control.get('ends_at');

        if (repeat === true) {
            if (!period?.value) {
                period?.setErrors({ required: true });
            } else {
                period?.setErrors(null);
            }

            if (!endsAt?.value) {
                endsAt?.setErrors({ required: true });
            } else {
                endsAt?.setErrors(null);
            }
        } else {
            period?.setErrors(null);
            endsAt?.setErrors(null);
        }

        return null; // Retorna null para validar o FormGroup em si
    }

    ngOnInit() {
        this.form = this.fb.group({
            title: new FormControl('', [Validators.required]),
            reminder_date: new FormControl(this.today, [Validators.required]),
            ends_at: new FormControl(this.today, [Validators.required]),
            reminder_type_id: new FormControl(1, [Validators.required]),
            body: new FormControl('', []),
            repeat: new FormControl(booleanAttribute(false), []),
            period: new FormControl('', []),
            city: new FormControl('', []),
        }, { validators: this.requiredWhenRepeatTrue })

        if (this.config.data) {
            this.form.get('title')?.setValue(this.config.data?.title)
            this.form.get('reminder_date')?.setValue(new Date(this.config.data?.reminder_date))
            this.form.get('reminder_type_id')?.setValue(this.config.data?.reminder_type_id)
            this.form.get('body')?.setValue(this.config.data?.body)
            if(this.config.data.group) {
                this.form.get('period')?.setValue(this.config.data?.group?.period)
                this.form.get('ends_at')?.setValue(new Date(this.config.data?.group.ends_at.slice(0,10)))
                this.form.get('repeat')?.setValue(this.config.data?.repeat)
            }
        }

        this.reminderTypesService.get().subscribe({
            next: data => {
                this.types = data
            },
            error: err => {
                console.error('Error fetching reminder types:', err);
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to load reminder types'});
            }
        })
    }

    onSubmit() {
        this.loadingService.show()
        this.form?.markAllAsTouched()
        this.form?.markAsDirty()

        if (this.form?.valid) {
            let reminder = this.form.value;

            reminder.reminder_date = this.form.value.reminder_date.toISOString().split('T')[0]
            if(reminder.ends_at) this.form.value.ends_at = this.form.value.ends_at.toISOString().split('T')[0]

            this.authService.getCsrfToken().subscribe({
                next: () => {
                    if(this.config.data) {
                        reminder.id = this.config.data?.id;

                        this.reminderService.put(reminder).subscribe({
                            next: () => {
                                this.ref.close({severity: 'success', summary: 'Tarefa atualizada'})
                            },
                            error: error => {
                                this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao salvar o registro'});
                                // Optionally log to a monitoring service
                                // monitoringService.log(error);
                                this.loadingService.hide()
                            },
                            complete: () => {
                                this.loadingService.hide()
                            }
                        })
                    } else {
                        this.reminderService.post(reminder).subscribe({
                            next: () => {
                                this.ref.close({ severity: 'success', summary: 'Tarefa criada' })
                                this.loadingService.hide()
                            },
                            error: error => {
                                this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao salvar o registro'});
                                // Optionally log to a monitoring service
                                // monitoringService.log(error);
                                this.loadingService.hide()
                            }
                        })
                    }
                }
            })
        } else {
            this.loadingService.hide()
        }
    }

    hideDialog(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Cancelar?',
            header: 'Confirmar o cancelamento',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",
            acceptIcon:"none",
            rejectIcon:"none",

            accept: () => {
                this.ref.close({ severity: 'info', summary: 'Cancelado' })
            },
            reject: () => {

            }
        });
    }

    isInvalid(formControl: string) {
        return this.form.get(formControl)?.invalid
            && (this.form.get(formControl)?.dirty
                || this.form.get(formControl)?.touched)
    }

}

export interface IReminderType {
    id: number;
    user_id: number;
    name: string;
}